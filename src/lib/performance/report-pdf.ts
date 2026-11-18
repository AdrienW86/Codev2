import type { AuditResult } from "./audit";
import { buildActionPlan, buildInsights } from "./insights";
import { factStatusLabels, type FactSection } from "./facts";
import type { PDFFont, PDFPage, RGB } from "pdf-lib";

export type PdfAssets = { regular: Uint8Array; bold: Uint8Array; logo: Uint8Array };
const categories = { performance: "Performance", seo: "SEO technique", accessibility: "Accessibilité", "best-practices": "Bonnes pratiques" };
const statuses = { passed: "Conforme au contrôle", failed: "Action à prévoir", manual: "À vérifier manuellement", unavailable: "Non mesuré", notApplicable: "Non applicable" };
let assetPromise: Promise<PdfAssets> | undefined;
function loadAssets(): Promise<PdfAssets> {
  assetPromise ??= Promise.all(["/report-assets/NotoSans-Regular.ttf", "/report-assets/NotoSans-Bold.ttf", "/brand/code-v-logo-email.png"].map(async url => {
    const response = await fetch(url);
    if (!response.ok) throw Error("Ressource du PDF indisponible.");
    return new Uint8Array(await response.arrayBuffer());
  })).then(([regular, bold, logo]) => ({ regular, bold, logo })).catch(error => { assetPromise = undefined; throw error; });
  return assetPromise;
}

/** Complete, selectable text; page breaks never discard an overflow row. */
export async function createAuditPdf(report: AuditResult, suppliedAssets?: PdfAssets): Promise<Uint8Array> {
  const { PDFDocument, rgb, PDFName, PDFString } = await import("pdf-lib");
  const { default: fontkit } = await import("@pdf-lib/fontkit");
  const assets = suppliedAssets || await loadAssets();
  const pdf = await PDFDocument.create();
  pdf.registerFontkit(fontkit);
  pdf.setTitle("Audit SEO et performances - " + new URL(report.url).hostname + " - CODE-V");
  pdf.setAuthor("CODE-V"); pdf.setSubject("Rapport technique complet et plan d’action"); pdf.setLanguage("fr-FR");
  const regular = await pdf.embedFont(assets.regular, { subset: true });
  const bold = await pdf.embedFont(assets.bold, { subset: true });
  const logo = await pdf.embedPng(assets.logo);
  const C = { ink: rgb(.07,.13,.21), muted: rgb(.32,.39,.47), navy: rgb(.027,.067,.12), blue: rgb(.09,.26,.45), mint: rgb(.31,.89,.76), pale: rgb(.95,.97,.99), line: rgb(.84,.88,.93), red: rgb(.69,.13,.09), orange: rgb(.66,.31,.035), green: rgb(.08,.43,.22), gray: rgb(.34,.41,.50), white: rgb(1,1,1) };
  const W = 595.28, H = 841.89, left = 46, width = W - 92;
  const glyphs = new Set(regular.getCharacterSet());
  const widthCache=new Map<PDFFont,Map<string,number>>();
  function measure(font:PDFFont,size:number,value:string){let cache=widthCache.get(font);if(!cache){cache=new Map();widthCache.set(font,cache);}const key=size+":"+value;let n=cache.get(key);if(n===undefined){n=font.widthOfTextAtSize(value,size);cache.set(key,n);}return n;}
  // A codepoint label preserves unsupported characters reversibly, instead of
  // silently replacing them with '?' or dropping them from a URL/snippet.
  const safe = (input: string) => Array.from(String(input).normalize("NFC")).map(c => c === "\n" || c === "\t" || glyphs.has(c.codePointAt(0)!) ? c : `[U+${c.codePointAt(0)!.toString(16).toUpperCase()}]`).join("").replace(/\t/g, "    ");
  function wrap(input: string, font: PDFFont, size: number, available = width) {
    const lines: string[] = [];
    for (const paragraph of safe(input).split(/\r?\n/)) {
      let current = "";
      for (const word of paragraph.split(/\s+/).filter(Boolean)) {
        const candidate = current ? current + " " + word : word;
        if (measure(font, size, candidate) <= available) { current = candidate; continue; }
        if (current) { lines.push(current); current = ""; }
        if(measure(font,size,word)<=available){current=word;continue;}
        for (const char of word) {
          if (current && measure(font,size,current+char) > available) { lines.push(current); current = ""; }
          current += char;
        }
      }
      lines.push(current);
    }
    return lines;
  }
  const cover = pdf.addPage([W,H]);
  const contents = pdf.addPage([W,H]);
  const pageIndex=report.crawl?.pages.length?pdf.addPage([W,H]):undefined;
  const pageReferences:{title:string;url:string;page:PDFPage;number:number;y:number}[]=[];
  let page: PDFPage = contents, y = 748;
  const toc: { title: string; page: PDFPage; number: number; y: number }[] = [];
  let chapter = "Rapport technique";
  function header(p: PDFPage, label: string) {
    p.drawRectangle({ x: 0, y: H-65, width: W, height: 65, color: C.navy });
    p.drawText("CODE-V  /  AUDIT SEO & PERFORMANCE", {x:left,y:H-29,size:9,font:bold,color:C.white});
    p.drawText(safe(new URL(report.url).hostname + "  /  " + label), {x:left,y:H-47,size:8,font:regular,color:rgb(.72,.79,.87)});
    p.drawImage(logo,{x:W-78,y:H-58,width:32,height:40});
  }
  function nextPage() { page=pdf.addPage([W,H]); y=748; header(page,chapter); }
  function ensure(height: number) { if (y-height<64) nextPage(); }
  function space(amount=9) { y-=amount; }
  function paragraph(value: string, options: {size?:number; color?:RGB; bold?:boolean; inset?:number; gap?:number}={}) {
    if (!value) return;
    const size=options.size||9.3, leading=size*1.5, inset=options.inset||0, font=options.bold?bold:regular;
    for (const line of wrap(value,font,size,width-inset)) {
      ensure(leading); page.drawText(line,{x:left+inset,y,size,font,color:options.color||C.ink}); y-=leading;
    }
    space(options.gap??7);
  }
  function heading(value:string, color=C.blue, major=false) {
    const lines=wrap(value,bold,major?18:11.5,width-18), size=major?18:11.5;
    ensure(lines.length*(size*1.45)+43);
    if(major) {
      space(7); toc.push({title:value,page,number:pdf.getPageCount(),y});
      page.drawRectangle({x:left,y:y-5,width:4,height:23,color:C.mint});
    }
    for(const line of lines){page.drawText(line,{x:left+(major?15:0),y,size,font:bold,color});y-=size*1.45;}
    space(major?13:7);
  }
  function major(title:string) { chapter=title; nextPage(); heading(title,C.blue,true); }
  function rule() { ensure(9);page.drawLine({start:{x:left,y},end:{x:W-left,y},thickness:.5,color:C.line});space(11); }
  async function factSections(sections:FactSection[]) {
    for(const section of sections) {
      const color=section.status==="critical"?C.red:section.status==="warning"?C.orange:section.status==="good"?C.green:C.blue;
      heading(section.title,color);paragraph(factStatusLabels[section.status],{size:8,bold:true,color});paragraph(section.note,{size:8.5,color:C.muted});
      if(!section.rows.length)paragraph("Aucun élément détecté dans le périmètre de ce contrôle.",{color:C.muted});
      if(section.rows.length && section.columns.length<=5 && section.rows.every(row=>row.every(cell=>cell.length<=100&&!cell.includes("\n")))) {
        const weights=section.columns.map((label,i)=>Math.max(9,Math.min(40,Math.max(label.length,...section.rows.map(row=>(row[i]||"").length)))));
        const total=weights.reduce((sum,value)=>sum+value,0), widths=weights.map(value=>width*value/total), offsets=widths.map((_,i)=>widths.slice(0,i).reduce((sum,value)=>sum+value,0));
        const headerLines=section.columns.map((label,i)=>wrap(label,bold,7.3,widths[i]-10));
        const headerHeight=Math.max(...headerLines.map(lines=>lines.length))*10+12;
        const tableHeader=()=>{
          ensure(headerHeight+20);page.drawRectangle({x:left,y:y-headerHeight+10,width,height:headerHeight,color:C.pale});
          headerLines.forEach((lines,i)=>lines.forEach((line,j)=>page.drawText(line,{x:left+offsets[i]+5,y:y-j*10,size:7.3,font:bold,color:C.blue})));y-=headerHeight+4;
        };
        tableHeader();
        for(const [rowIndex,row] of section.rows.entries()) {
          if(rowIndex%100===0)await new Promise(resolve=>setTimeout(resolve,0));
          const lines=row.map((cell,i)=>wrap(cell||"Non déclaré",regular,7.8,widths[i]-10));
          const height=Math.max(...lines.map(value=>value.length))*10.5+6;
          if(y-height<64){nextPage();paragraph(section.title+" (suite)",{size:9,bold:true});tableHeader();}
          lines.forEach((value,i)=>value.forEach((line,j)=>page.drawText(line,{x:left+offsets[i]+5,y:y-j*10.5,size:7.8,font:regular,color:C.ink})));
          y-=height;page.drawLine({start:{x:left,y:y+7},end:{x:W-left,y:y+7},thickness:.4,color:C.line});
        }
        space(14);rule();continue;
      }
      // Wide inventories become numbered record cards, rather than unreadably
      // small 7-column tables. Every field and row is printed in source order.
      for(const [index,row] of section.rows.entries()) {
        if(index%100===0)await new Promise(resolve=>setTimeout(resolve,0));
        const value=row.map((cell,i)=>`${section.columns[i] || "Valeur"} : ${cell || "Non déclaré"}`).join("  |  ");
        ensure(32);
        paragraph(`${index+1}. ${value}`,{size:8.4,inset:5,gap:7});
        page.drawLine({start:{x:left,y:y+3},end:{x:W-left,y:y+3},thickness:.3,color:C.line});space(4);
      }
      rule();
    }
  }
  const plan=buildActionPlan(report), checks=report.checks||[];
  const date=new Date(report.analyzedAt).toLocaleString("fr-FR",{timeZone:"Europe/Paris"});
  // Cover: a separate reading level, never a replacement for the full appendix.
  cover.drawRectangle({x:0,y:0,width:W,height:H,color:C.navy});
  cover.drawRectangle({x:left,y:728,width:45,height:4,color:C.mint});
  cover.drawImage(logo,{x:W-122,y:690,width:76,height:95});
  cover.drawText("CODE-V / OBSERVER. COMPRENDRE. AGIR.",{x:left,y:752,size:9,font:bold,color:C.mint});
  cover.drawText("Votre site,",{x:left,y:647,size:38,font:bold,color:C.white});
  cover.drawText("en détail.",{x:left,y:596,size:38,font:bold,color:C.mint});
  let cy=553;
  for(const line of wrap(new URL(report.url).hostname,regular,11,width)){cover.drawText(line,{x:left,y:cy,size:11,font:regular,color:C.white});cy-=16;}
  cover.drawText("URL complète et détails dans le rapport",{x:left,y:cy,size:8,font:regular,color:rgb(.73,.81,.88)});cy-=16;
  cover.drawText(safe((report.strategy==="mobile"?"Mobile":"Ordinateur")+"  /  "+date+" (Paris)"),{x:left,y:cy-12,size:9,font:regular,color:rgb(.73,.81,.88)});
  const scoreEntries=Object.entries(categories);
  scoreEntries.forEach(([key,label],i)=>{
    const scoreKey=key==="best-practices"?"bestPractices":key as keyof AuditResult["scores"],score=report.scores[scoreKey];
    const x=left+i*129, cardW=116, color=score===null?C.gray:score>=90?C.green:score>=50?C.orange:C.red;
    cover.drawRectangle({x,y:351,width:cardW,height:104,color:C.white});
    cover.drawRectangle({x,y:351,width:cardW,height:4,color});
    cover.drawText(score===null?"N/M":String(score),{x:x+13,y:404,size:30,font:bold,color});
    cover.drawText(safe(label),{x:x+13,y:376,size:9,font:bold,color:C.ink});
  });
  cover.drawText(`${plan.filter(a=>a.priority==="high").length} urgences  /  ${plan.filter(a=>a.priority!=="high").length} actions à prévoir`,{x:left,y:310,size:13,font:bold,color:C.white});
  cover.drawText(`${checks.filter(c=>c.status==="passed").length} contrôles réussis  /  ${report.crawl?.scanned||0} pages explorées`,{x:left,y:286,size:10,font:regular,color:rgb(.73,.81,.88)});
  let ny=234;
  for(const line of wrap("Les scores Lighthouse sont des mesures de laboratoire. Les observations HTML, leurs limites et les données non disponibles sont détaillées dans le rapport. Tous les constats collectés sont conservés.",regular,9,width)) {cover.drawText(line,{x:left,y:ny,size:9,font:regular,color:rgb(.73,.81,.88)});ny-=14;}
  cover.drawText("AUDIT SEO / EXPÉRIENCE / PERFORMANCE / INVENTAIRES",{x:left,y:85,size:8,font:bold,color:C.mint});
  header(contents,"Sommaire et mode de lecture");

  major("01 / Synthèse et méthode");
  paragraph(report.url,{bold:true});paragraph(`${report.strategy==="mobile"?"Mobile":"Ordinateur"} - ${date} (Paris) - ${report.source}`);
  heading("Comment lire les couleurs");
  paragraph("URGENT - Problème prioritaire détecté : accès au contenu, indexation ou autre point à fort impact.",{color:C.red,bold:true});
  paragraph("ACTION À PRÉVOIR - Amélioration modérée ou de priorité plus faible ; suivre les observations et leur contexte.",{color:C.orange,bold:true});
  paragraph("CONFORME AU CONTRÔLE - Vérification mesurée et réussie. Cela ne garantit pas que tout le site est exempt de problème.",{color:C.green,bold:true});
  paragraph("INFORMATION / NON MESURÉ - Constat descriptif, contrôle manuel ou donnée indisponible. Une absence de mesure n’est jamais un résultat égal à zéro.",{color:C.gray});
  heading("Périmètre et limites");
  paragraph("Les mesures Lighthouse portent sur l’URL indiquée. L’exploration HTML complémentaire porte sur un échantillon limité et n’exécute pas JavaScript. Les tableaux reprennent toutes les données collectées sans couper descriptions, listes d’actions ou exemples. La collecte elle-même reste bornée en durée, taille et nombre de pages : ses limites sont signalées.");
  paragraph("Les scores varient selon les conditions du test. Cet audit ne mesure ni positions Google, ni backlinks, ni citations par les IA, ni efficacité commerciale. Aucun classement ni gain n’est garanti. Les recommandations dépendent du contexte de la page.");
  paragraph("Les caractères hors de la police sont conservés sous forme de codepoint [U+XXXX]. Les captures binaires internes à Lighthouse ne sont pas des tableaux de diagnostic et ne sont pas incluses dans les annexes textuelles.",{size:8.5,color:C.muted});
  for(const [key,label] of scoreEntries){const k=key==="best-practices"?"bestPractices":key as keyof AuditResult["scores"];paragraph(`${label} : ${report.scores[k]===null?"Non mesuré":report.scores[k]+" / 100"}`,{bold:true});}
  paragraph(`${checks.filter(c=>c.status==="failed").length} contrôles à améliorer ; ${checks.filter(c=>c.status==="manual").length} vérifications manuelles. Un même contrôle peut concerner plusieurs catégories.`);
  major("02 / Plan d’action complet");
  paragraph("Traiter d’abord les urgences, puis les actions modérées et les améliorations plus faibles. Vérifier les contrôles manuels. Relancer sur mobile et ordinateur après correction.");
  if(!plan.length)paragraph("Aucune correction prioritaire détectée par les contrôles disponibles. Une vérification manuelle reste utile.");
  plan.forEach((action,index)=>{const color=action.priority==="high"?C.red:C.orange;heading(`${index+1}. ${action.title}`,color);paragraph(action.priority==="high"?"URGENT / priorité élevée":action.priority==="medium"?"ACTION À PRÉVOIR / priorité modérée":"ACTION À PRÉVOIR / priorité faible",{color,bold:true,size:8});paragraph(action.detail||"Examiner le contrôle correspondant.");rule();});
  major("03 / Diagnostic SEO, GEO et expérience");
  const insightLabels={seo:"Référencement sur la page",geo:"GEO et moteurs IA",links:"Liens et popularité",ux:"Convivialité et accessibilité",performance:"Performance et ressources"};
  for(const [category,label] of Object.entries(insightLabels)){heading(label);for(const item of buildInsights(report).filter(i=>i.category===category)){const color=item.status==="good"?C.green:item.status==="warning"?C.orange:C.gray;heading(`${item.status==="good"?"Conforme":item.status==="warning"?"À améliorer":"Non mesuré"} - ${item.title}`,color);paragraph(item.evidence);paragraph("Conseil : "+item.recommendation,{color:C.muted});}}
  major("04 / Exploration SEO des pages");
  if(!report.crawl)paragraph("Exploration HTML non disponible pour cette analyse.");
  else {
    paragraph(`Statut : ${report.crawl.status} ; ${report.crawl.scanned} pages analysées sur ${report.crawl.limit} maximum ; ${report.crawl.discovered} URL découvertes ou demandées.`);
    for(const note of report.crawl.notes)paragraph(note,{color:C.muted});
    heading("Tous les constats de l’exploration");
    if(!report.crawl.issues.length)paragraph("Aucune anomalie détectée dans l’échantillon. Vérifier son état de complétude.");
    for(const item of report.crawl.issues){heading(item.message,item.severity==="high"?C.red:C.orange);paragraph(`[${item.severity}] ${item.url}`);}
    if(report.crawl.siteChecks)await factSections(report.crawl.siteChecks);
    for(const [index,item] of report.crawl.pages.entries()){
      chapter="04 / Page "+(index+1)+" - Inventaires SEO";nextPage();
      pageReferences.push({title:item.title||"Sans titre",url:item.url,page,number:pdf.getPageCount(),y});
      heading(`PAGE ${index+1} / ${item.title||"Sans titre"}`);paragraph(item.url,{bold:true});
      paragraph("Title : "+(item.title||"Absent"));paragraph("Méta description : "+(item.description||"Absente"));paragraph("Canonical : "+(item.canonical||"Absente"));paragraph("H1 : "+(item.h1.join(" | ")||"Absent"));
      paragraph(`Mots : ${item.words} ; images : ${item.images} ; images sans ALT : ${item.missingAlt} ; destinations internes : ${item.internal} ; externes : ${item.external} ; entrants dans l’échantillon : ${item.incoming} ; noindex : ${item.noindex?"présent (peut être volontaire)":"non détecté"}.`);
      if(item.facts)await factSections(item.facts.sections);
    }
  }
  major("05 / Mesures et opportunités");
  heading("Mesures de laboratoire");for(const [key,metric] of Object.entries(report.lab))paragraph(`${key.toUpperCase()} : ${metric.display}`);
  heading("Données utilisateurs réels (CrUX)");
  if(report.field.scope==="unavailable")paragraph("Données indisponibles : cela ne signifie pas que les indicateurs valent zéro.");
  else {paragraph(`75e percentile - périmètre : ${report.field.scope==="url"?"page":"domaine"}`);paragraph(`LCP : ${report.field.lcpMs===null?"indisponible":report.field.lcpMs+" ms"} ; INP : ${report.field.inpMs===null?"indisponible":report.field.inpMs+" ms"} ; CLS : ${report.field.cls??"indisponible"}`);}
  heading("Toutes les opportunités de performance");if(!report.opportunities.length)paragraph("Aucune opportunité chiffrée disponible. D’autres corrections peuvent rester nécessaires.");
  for(const item of report.opportunities){heading(item.title,C.orange);paragraph(item.description);paragraph(item.display);if(item.savingsMs!==null)paragraph(`Gain estimé : ${item.savingsMs} ms (estimations non cumulables et non garanties).`);}
  major("06 / Tous les contrôles Lighthouse");
  for(const [category,label] of scoreEntries){heading(label);const group=checks.filter(c=>c.category===category);if(!group.length)paragraph("Détails indisponibles pour cette catégorie.");for(const item of group){const urgent=item.status==="failed"&&/crawlable|robots|document-title|canonical/.test(item.id);const color=urgent?C.red:item.status==="failed"?C.orange:item.status==="passed"?C.green:C.gray;heading(`${urgent?"Urgent":statuses[item.status]} - ${item.title}`,color);paragraph(item.description);paragraph(item.display);if(item.examples.length){paragraph(`Éléments concernés (${item.examples.length}) :`,{bold:true});for(const example of item.examples)paragraph(example,{size:8.5,inset:10});}rule();}}
  major("07 / Données techniques Lighthouse");
  paragraph("Tous les tableaux collectés sont reproduits ci-dessous, avec leur structure et leurs unités d’origine. Les lignes d’un tableau long se poursuivent sur les pages suivantes.");
  if(report.technical?.length)await factSections(report.technical);else paragraph("Données techniques non disponibles pour cette analyse.");
  heading("Besoin d’aide pour appliquer les corrections ?");paragraph("CODE-V - https://www.code-v.fr/contact - contact@code-v.fr");
  // Populate the contents after pagination so the references remain exact.
  let ty=735;
  contents.drawText("Sommaire",{x:left,y:ty,size:26,font:bold,color:C.blue});ty-=40;
  for(const item of toc){const label=item.title;contents.drawText(safe(label),{x:left,y:ty,size:11,font:bold,color:C.ink});contents.drawText(String(item.number),{x:W-left-16,y:ty,size:11,font:bold,color:C.blue});
    const annotation=pdf.context.register(pdf.context.obj({Type:"Annot",Subtype:"Link",Rect:[left,ty-5,W-left,ty+14],Border:[0,0,0],Dest:[item.page.ref,PDFName.of("XYZ"),null,item.y+22,null]}));contents.node.addAnnot(annotation);ty-=35;}
  contents.drawText("Un rapport à deux niveaux de lecture",{x:left,y:ty-18,size:12,font:bold,color:C.blue});ty-=48;
  for(const line of wrap("Commencez par la synthèse et le plan d’action. Consultez ensuite les inventaires par page et les annexes pour retrouver chaque valeur, URL, exemple et diagnostic collectés. Aucun détail textuel n’est supprimé pour raccourcir la mise en page.",regular,10,width)){contents.drawText(line,{x:left,y:ty,size:10,font:regular,color:C.muted});ty-=16;}
  if(pageIndex){header(pageIndex,"Index des pages analysées");let py=735;pageIndex.drawText("Vos pages, une par une",{x:left,y:py,size:24,font:bold,color:C.blue});py-=43;
    pageIndex.drawText("Cliquez sur une page pour accéder à tous ses inventaires.",{x:left,y:py,size:9,font:regular,color:C.muted});py-=34;
    for(const [i,item] of pageReferences.entries()){
      const top=py;for(const line of wrap(`${i+1}. ${item.title}`,bold,10,width-40)){pageIndex.drawText(line,{x:left,y:py,size:10,font:bold,color:C.ink});py-=15;}
      pageIndex.drawText(String(item.number),{x:W-left-19,y:top,size:10,font:bold,color:C.blue});
      for(const line of wrap(item.url,regular,8.2,width-40)){pageIndex.drawText(line,{x:left,y:py,size:8.2,font:regular,color:C.muted});py-=12;}
      pageIndex.node.addAnnot(pdf.context.register(pdf.context.obj({Type:"Annot",Subtype:"Link",Rect:[left,py-3,W-left,top+14],Border:[0,0,0],Dest:[item.page.ref,PDFName.of("XYZ"),null,item.y+22,null]})));py-=19;
    }
  }
  const pages=pdf.getPages();pages.forEach((p,index)=>{const color=index===0?rgb(.73,.81,.88):C.muted;p.drawText(`CODE-V  /  ${index+1} / ${pages.length}`,{x:left,y:29,size:8,font:regular,color});if(index>0)p.drawText("www.code-v.fr",{x:W-left-67,y:29,size:8,font:regular,color});});
  // Add a real, selectable source URL on the cover in addition to visual text.
  cover.node.addAnnot(pdf.context.register(pdf.context.obj({Type:"Annot",Subtype:"Link",Rect:[left,cy-7,W-left,565],Border:[0,0,0],A:{Type:"Action",S:"URI",URI:PDFString.of(report.url)}})));
  return pdf.save();
}

export async function downloadAuditPdf(report:AuditResult) {
  const bytes=await createAuditPdf(report);
  const url=URL.createObjectURL(new Blob([new Uint8Array(bytes)],{type:"application/pdf"}));
  const a=document.createElement("a");a.href=url;a.download=`rapport-code-v-${new URL(report.url).hostname}-${report.strategy}.pdf`;
  document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
}
