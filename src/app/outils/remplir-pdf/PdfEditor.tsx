'use client';
import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from 'react';
import type { PDFDocumentProxy } from 'pdfjs-dist';
import { clampPlacement, exportFilledPdf, inspectPdf, MAX_PDF_BYTES, type Placement, type PageGeometry } from '@/lib/pdf/document';
import styles from './pdf.module.css';

type Tool = 'text' | 'check' | 'cross' | 'date' | 'image';
function textImage(text: string, size: number, color: string) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d')!;
  ctx.font = `${size}px Arial`;
  const lines: string[] = [];
  for (const paragraph of text.split('\n')) {
    let line = '';
    for (const character of paragraph) {
      if (ctx.measureText(line + character).width > 550) { lines.push(line); line = ''; }
      line += character;
    }
    lines.push(line);
  }
  const width = Math.ceil(Math.max(1, ...lines.map(line=>ctx.measureText(line).width))+6);
  const height = Math.ceil(lines.length*size*1.35+6);
  canvas.width=width*2; canvas.height=height*2;
  ctx.scale(2,2); ctx.font=`${size}px Arial`; ctx.fillStyle=color; ctx.textBaseline='top';
  lines.forEach((line,i)=>ctx.fillText(line,3,3+i*size*1.35));
  return { image: canvas.toDataURL('image/png'), width, height };
}
function markImage(cross: boolean, size: number, color: string) {
  const canvas=document.createElement('canvas'); canvas.width=canvas.height=size*2;
  const ctx=canvas.getContext('2d')!;ctx.scale(2,2);ctx.strokeStyle=color;ctx.lineWidth=size/10;ctx.lineCap='round';ctx.lineJoin='round';ctx.beginPath();
  if(cross){ctx.moveTo(size*.2,size*.2);ctx.lineTo(size*.8,size*.8);ctx.moveTo(size*.8,size*.2);ctx.lineTo(size*.2,size*.8);}else{ctx.moveTo(size*.16,size*.52);ctx.lineTo(size*.4,size*.78);ctx.lineTo(size*.86,size*.2);}ctx.stroke();
  return {image:canvas.toDataURL('image/png'),width:size,height:size};
}
export default function PdfEditor({ account }: { account?: ReactNode }) {
  const [pdf,setPdf]=useState<PDFDocumentProxy|null>(null), [name,setName]=useState(''), [page,setPage]=useState(1);
  const [items,setItems]=useState<Placement[]>([]), [selected,setSelected]=useState<string|null>(null);
  const [history,setHistory]=useState<Placement[][]>([]),[future,setFuture]=useState<Placement[][]>([]);
  const [tool,setTool]=useState<Tool>('text'),[text,setText]=useState(''),[size,setSize]=useState(16),[color,setColor]=useState('#142337');
  const [asset,setAsset]=useState<{image:string;width:number;height:number}|null>(null),[signature,setSignature]=useState(false);
  const [error,setError]=useState(''),[busy,setBusy]=useState(false),[rendering,setRendering]=useState(false),[readyPage,setReadyPage]=useState(0),[zoom,setZoom]=useState(1);
  const [geometry,setGeometry]=useState<PageGeometry|null>(null),[containerWidth,setContainerWidth]=useState(800);
  const bytes=useRef<Uint8Array|null>(null), canvas=useRef<HTMLCanvasElement>(null), stage=useRef<HTMLDivElement>(null), container=useRef<HTMLDivElement>(null), signatureCanvas=useRef<HTMLCanvasElement>(null);
  const geometries=useRef<Record<number,PageGeometry>>({}), currentPdf=useRef<PDFDocumentProxy|null>(null), fileRef=useRef<HTMLInputElement>(null);
  const drag=useRef<{id:string;px:number;py:number;item:Placement;before:Placement[];moved:boolean}|null>(null), signing=useRef(false), hasInk=useRef(false);
  const scale=geometry?Math.min(containerWidth/geometry.width,1.2)*zoom:1;
  const active=items.find(item=>item.id===selected);
  function commit(next:Placement[]){setHistory(h=>[...h.slice(-29),items]);setFuture([]);setItems(next);}
  useEffect(()=>{const node=container.current;if(!node)return;const observer=new ResizeObserver(([entry])=>setContainerWidth(Math.max(240,entry.contentRect.width-32)));observer.observe(node);return()=>observer.disconnect();},[]);
  useEffect(()=>()=>{void currentPdf.current?.loadingTask.destroy();},[]);
  useEffect(()=>{if(!items.length)return;const handler=(e:BeforeUnloadEvent)=>{e.preventDefault();};window.addEventListener('beforeunload',handler);return()=>window.removeEventListener('beforeunload',handler);},[items.length]);
  useEffect(()=>{
    if(!pdf||!canvas.current)return;
    let cancelled=false;let task:ReturnType<Awaited<ReturnType<PDFDocumentProxy['getPage']>>['render']>|undefined;
    setRendering(true);setReadyPage(0);
    void (async()=>{try{
      const p=await pdf.getPage(page);if(cancelled)return;
      const view=p.getViewport({scale:1});const g={width:view.width,height:view.height,transform:view.transform};geometries.current[page]=g;setGeometry(g);
      const displayScale=Math.min(containerWidth/g.width,1.2)*zoom;
      const viewport=p.getViewport({scale:displayScale*Math.min(window.devicePixelRatio||1,2)});
      const target=canvas.current!;target.width=Math.ceil(viewport.width);target.height=Math.ceil(viewport.height);
      task=p.render({canvas:target,canvasContext:target.getContext('2d')!,viewport});await task.promise;
      if(!cancelled){setReadyPage(page);setRendering(false);}
    }catch(e){if(!cancelled){setError(e instanceof Error?e.message:'Impossible d’afficher cette page.');setRendering(false);}}})();
    return()=>{cancelled=true;task?.cancel();};
  },[pdf,page,containerWidth,zoom]);
  async function openFile(file:File|undefined){
    if(!file)return;if(items.length&&!window.confirm('Remplacer le document ? Les ajouts non téléchargés seront perdus.'))return;
    setBusy(true);setError('');let pending:PDFDocumentProxy|null=null;
    try{
      if(file.size>MAX_PDF_BYTES)throw new Error('Le PDF dépasse la limite de 25 Mo.');
      const data=new Uint8Array(await file.arrayBuffer());await inspectPdf(data);
      const pdfjs=await import('pdfjs-dist');pdfjs.GlobalWorkerOptions.workerSrc='/pdf-assets/pdf.worker.min.mjs';
      pending=await pdfjs.getDocument({data:data.slice(),cMapUrl:'/pdf-assets/cmaps/',cMapPacked:true,standardFontDataUrl:'/pdf-assets/standard_fonts/',wasmUrl:'/pdf-assets/wasm/'}).promise;
      const previous=currentPdf.current;currentPdf.current=pending;bytes.current=data;geometries.current={};setGeometry(null);setReadyPage(0);setPdf(pending);setPage(1);setItems([]);setHistory([]);setFuture([]);setSelected(null);setName(file.name);setAsset(null);setZoom(1);
      if(previous)void previous.loadingTask.destroy();
    }catch(e){if(pending)void pending.loadingTask.destroy();setError(e instanceof Error?e.message:'Impossible d’ouvrir ce PDF.');}finally{setBusy(false);}
  }
  function place(e:PointerEvent<HTMLDivElement>){
    if(e.target!==stage.current||!geometry||rendering||busy||readyPage!==page)return;
    const rect=e.currentTarget.getBoundingClientRect();let source;let label;
    if(tool==='image'){if(!asset){setError('Importez une image ou dessinez votre signature.');return;}source=asset;label='Signature ou tampon';}
    else if(tool==='check'||tool==='cross'){source=markImage(tool==='cross',size*1.5,color);label=tool==='check'?'Coche':'Croix';}
    else{label=tool==='date'?new Date().toLocaleDateString('fr-FR'):text.trim();if(!label){setError('Saisissez le texte à ajouter dans le panneau.');return;}source=textImage(label,size,color);}
    const item=clampPlacement({id:crypto.randomUUID(),page,x:(e.clientX-rect.left)/scale,y:(e.clientY-rect.top)/scale,...source,label},geometry);
    commit([...items,item]);setSelected(item.id);setError('');
  }
  async function importImage(file:File|undefined){
    if(!file)return;setError('');
    try{
      if(!['image/png','image/jpeg'].includes(file.type)||file.size>5*1024*1024)throw new Error('Choisissez une image PNG ou JPEG de moins de 5 Mo.');
      const bitmap=await createImageBitmap(file);const c=document.createElement('canvas');const factor=Math.min(1,1600/Math.max(bitmap.width,bitmap.height));c.width=Math.max(1,Math.round(bitmap.width*factor));c.height=Math.max(1,Math.round(bitmap.height*factor));c.getContext('2d')!.drawImage(bitmap,0,0,c.width,c.height);bitmap.close();
      setAsset({image:c.toDataURL('image/png'),width:180,height:180*c.height/c.width});setTool('image');
    }catch(e){setError(e instanceof Error?e.message:'Image illisible.');}
  }
  function sign(e:PointerEvent<HTMLCanvasElement>){const c=e.currentTarget,rect=c.getBoundingClientRect(),ctx=c.getContext('2d')!;const x=(e.clientX-rect.left)*c.width/rect.width,y=(e.clientY-rect.top)*c.height/rect.height;
    if(e.type==='pointerdown'){signing.current=true;hasInk.current=true;c.setPointerCapture(e.pointerId);ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+.1,y+.1);}else if(!signing.current)return;else ctx.lineTo(x,y);
    ctx.strokeStyle='#142337';ctx.lineWidth=3;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke();
  }
  async function download(){if(!bytes.current)return;setBusy(true);setError('');try{const result=await exportFilledPdf(bytes.current,items,geometries.current);const blob=new Blob([new Uint8Array(result)],{type:'application/pdf'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download=name.replace(/\.pdf$/i,'')+'-rempli.pdf';a.click();window.setTimeout(()=>URL.revokeObjectURL(url),30000);}catch(e){setError(e instanceof Error?e.message:'Export impossible. Vos ajouts sont conservés.');}finally{setBusy(false);}}
  return <div className={styles.editor}>
    <header className={styles.editorHeading}><div><p className={styles.eyebrow}>CODE-V PDF / VOTRE ESPACE</p><h1>Remplir. Cocher. C’est fait.</h1></div><div className={styles.actions}>{account}<button className={styles.primary} onClick={download} disabled={!pdf||busy||rendering}>Télécharger le PDF ↓</button></div></header>
    <p className={styles.privacy}>Vos documents restent sur cet appareil. Téléchargez votre copie avant de quitter la page.</p>
    {error&&<div role="alert" className={styles.error}>{error}<button onClick={()=>setError('')} aria-label="Fermer le message">×</button></div>}
    <div className={styles.workspace}>
      <aside className={styles.sidebar} aria-label="Outils de remplissage"><label className={styles.fileButton}>Ouvrir un PDF<input ref={fileRef} type="file" accept="application/pdf,.pdf" disabled={busy} onChange={e=>{void openFile(e.target.files?.[0]);e.target.value='';}} /></label><p className={styles.filename}>{name||'25 Mo maximum · 100 pages'}</p>
        <fieldset disabled={!pdf||busy}><legend>1. Choisir un outil</legend><div className={styles.tools}>{([['text','Aa','Texte'],['check','✓','Coche'],['cross','×','Croix'],['date','▦','Date'],['image','✎','Signature / tampon']] as const).map(([value,icon,label])=><button type="button" key={value} aria-pressed={tool===value} onClick={()=>{setTool(value);setSelected(null);}}><span>{icon}</span>{label}</button>)}</div>
        {tool==='text'&&<label>Texte à ajouter<textarea value={text} maxLength={2000} rows={4} placeholder="Nom, adresse, mention…" onChange={e=>setText(e.target.value)} /></label>}
        {tool!=='image'&&<div className={styles.settings}><label>Taille<input type="number" min={8} max={72} value={size} onChange={e=>setSize(Math.max(8,Math.min(72,Number(e.target.value)||8)))} /></label><label>Couleur<input type="color" value={color} onChange={e=>setColor(e.target.value)} /></label></div>}
        {tool==='image'&&<div className={styles.imageTools}><button onClick={()=>{setSignature(true);hasInk.current=false;}}>Dessiner ma signature</button><label className={styles.fileButton}>Importer une image<input type="file" accept="image/png,image/jpeg" onChange={e=>{void importImage(e.target.files?.[0]);e.target.value='';}} /></label><small>PNG / JPEG · 5 Mo maximum</small>{asset&&<img src={asset.image} alt="Image prête à placer" />}</div>}
        <p className={styles.hint}>2. Cliquez sur la page pour placer votre ajout. Faites-le glisser pour le déplacer.</p></fieldset>
        {active&&geometry&&<fieldset disabled={busy}><legend>Ajuster la sélection</legend><p className={styles.filename}>{active.label}</p><label>Largeur : {Math.round(active.width)} pt<input type="range" min={8} max={geometry.width} value={active.width} onChange={e=>{const width=Number(e.target.value);commit(items.map(i=>i.id===active.id?clampPlacement({...i,width,height:i.height*width/i.width},geometry):i));}} /></label><button className={styles.delete} onClick={()=>{commit(items.filter(i=>i.id!==selected));setSelected(null);}}>Supprimer cet ajout</button></fieldset>}
        <div className={styles.actions}><button disabled={!history.length||busy} onClick={()=>{setFuture(f=>[items,...f]);setItems(history[history.length-1]);setHistory(h=>h.slice(0,-1));setSelected(null);}}>Annuler</button><button disabled={!future.length||busy} onClick={()=>{setHistory(h=>[...h,items]);setItems(future[0]);setFuture(f=>f.slice(1));setSelected(null);}}>Rétablir</button></div>
      </aside>
      <div className={styles.documentArea} ref={container}><div className={styles.pagebar}><button aria-label="Page précédente" disabled={!pdf||page<=1||busy||rendering} onClick={()=>{setPage(p=>p-1);setSelected(null);}}>←</button><span>Page {pdf?page:0} / {pdf?.numPages??0}</span><button aria-label="Page suivante" disabled={!pdf||page>=pdf.numPages||busy||rendering} onClick={()=>{setPage(p=>p+1);setSelected(null);}}>→</button><label>Zoom <select value={zoom} onChange={e=>setZoom(Number(e.target.value))}><option value={1}>Ajusté</option><option value={1.5}>150 %</option><option value={2}>200 %</option></select></label></div>
        {!pdf&&<div className={styles.empty}><span>↥</span><h2>Votre PDF commence ici.</h2><p>Formulaire, devis, document scanné…<br />Ouvrez un fichier pour ajouter vos informations.</p><button className={styles.primary} disabled={busy} onClick={()=>fileRef.current?.click()}>{busy?'Ouverture…':'Choisir mon PDF'}</button><small>Aucun document n’est envoyé sur un serveur.</small></div>}
        <div className={styles.scrollArea} hidden={!pdf}><div ref={stage} className={styles.stage} style={{width:geometry?geometry.width*scale:0,height:geometry?geometry.height*scale:0,visibility:readyPage===page?'visible':'hidden'}} onPointerDown={place}>
          <canvas ref={canvas} aria-label={`Aperçu de la page ${page}`} />
          {items.filter(i=>i.page===page).map(item=><button key={item.id} type="button" className={styles.placement} aria-label={`${item.label}. Flèches pour déplacer, Supprimer pour retirer.`} aria-pressed={selected===item.id} style={{left:item.x*scale,top:item.y*scale,width:item.width*scale,height:item.height*scale}}
            onPointerDown={e=>{if(busy||rendering)return;e.stopPropagation();setSelected(item.id);drag.current={id:item.id,px:e.clientX,py:e.clientY,item,before:items,moved:false};e.currentTarget.setPointerCapture(e.pointerId);}}
            onPointerMove={e=>{const d=drag.current;if(!d||d.id!==item.id||!geometry)return;const dx=(e.clientX-d.px)/scale,dy=(e.clientY-d.py)/scale;if(Math.abs(dx)+Math.abs(dy)>1)d.moved=true;setItems(all=>all.map(i=>i.id===d.id?clampPlacement({...d.item,x:d.item.x+dx,y:d.item.y+dy},geometry):i));}}
            onPointerUp={()=>{const d=drag.current;if(d?.moved){setHistory(h=>[...h.slice(-29),d.before]);setFuture([]);}drag.current=null;}}
            onPointerCancel={()=>{if(drag.current)setItems(drag.current.before);drag.current=null;}}
            onKeyDown={e=>{if(!geometry||busy)return;if(e.key==='Delete'||e.key==='Backspace'){e.preventDefault();commit(items.filter(i=>i.id!==item.id));return;}const delta:Record<string,[number,number]>={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]};if(delta[e.key]){e.preventDefault();const [x,y]=delta[e.key],step=e.shiftKey?10:1;commit(items.map(i=>i.id===item.id?clampPlacement({...i,x:i.x+x*step,y:i.y+y*step},geometry):i));}}}
          ><img draggable={false} src={item.image} alt="" /></button>)}
        </div></div>{(rendering||busy)&&<p role="status" className={styles.status}>Traitement sur votre appareil…</p>}
      </div>
    </div>
    <p className={styles.fineprint}>La signature ajoutée est une image, sans certificat numérique. Ne complétez que les documents pour lesquels vous êtes autorisé.</p>
    {signature&&<div className={styles.modalBackdrop}><section role="dialog" aria-modal="true" aria-labelledby="signature-title" className={styles.modal} onKeyDown={e=>{if(e.key==='Escape')setSignature(false);if(e.key==='Tab'){const nodes=Array.from(e.currentTarget.querySelectorAll<HTMLElement>('button,canvas'));const index=nodes.indexOf(document.activeElement as HTMLElement);e.preventDefault();nodes[(index+(e.shiftKey?-1:1)+nodes.length)%nodes.length]?.focus();}}}><h2 id="signature-title">Votre signature</h2><p>Dessinez à la souris ou au doigt.</p><canvas tabIndex={0} aria-label="Zone de dessin de signature" ref={signatureCanvas} width={640} height={240} onPointerDown={sign} onPointerMove={sign} onPointerUp={()=>{signing.current=false;}} onPointerCancel={()=>{signing.current=false;}} /><div className={styles.actions}><button autoFocus onClick={()=>{signatureCanvas.current?.getContext('2d')?.clearRect(0,0,640,240);hasInk.current=false;}}>Effacer</button><button onClick={()=>setSignature(false)}>Fermer</button><button className={styles.primary} onClick={()=>{if(!hasInk.current)return;setAsset({image:signatureCanvas.current!.toDataURL('image/png'),width:200,height:75});setTool('image');setSignature(false);}}>Utiliser cette signature</button></div></section></div>}
  </div>;
}
