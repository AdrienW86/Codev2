// Anti-spam protections of the contact form. Resend and analytics are mocked: nothing is sent.
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path'),vm=require('node:vm'),ts=require('typescript');
const env={RESEND_API_KEY:'test-key-private',CONTACT_EMAIL:'contact@example.test',RESEND_FROM:'CODE-V <hello@example.test>'};
const cache={},logs=[];let resendCalls=0;
function load(file){file=path.resolve(file);if(cache[file])return cache[file].exports;const m={exports:{}};cache[file]=m;const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2020}}).outputText;
  vm.runInNewContext(code,{exports:m.exports,require:n=>{
    if(n==='next/server')return {NextResponse:{json:(data,init)=>({data,status:init?.status||200})}};
    if(n==='resend')return {Resend:function(){this.batch={send:async items=>{resendCalls++;return {data:{data:items.map((_,i)=>({id:String(i)}))}}}}}};
    return load(n.startsWith('@/')?'src/'+n.slice(2)+'.ts':path.join(path.dirname(file),n+'.ts'));
  },process:{env},URL,Intl,Date,TextEncoder,Headers,console:{warn:line=>logs.push(line)}});return m.exports}
const route=load('src/app/api/contact/route.ts'),security=load('src/lib/contact-security.ts'),form=load('src/lib/contact-form.ts');
const legit={name:'Camille Martin',company:'Boulangerie Martin',email:'camille@boulangerie-martin.fr',project:'Création ou refonte de site',message:'Bonjour, nous souhaitons refaire notre site vitrine avant le printemps.',service:'website',source:'/contact',reference:'',elapsed:24000};
let ip=0;
const request=(body,headers={})=>({headers:new Headers({'content-type':'application/json','x-forwarded-for':'198.51.100.'+(++ip%250),host:'www.code-v.fr',origin:'https://www.code-v.fr',...headers}),text:async()=>typeof body==='string'?body:JSON.stringify(body)});
async function post(body,headers){const before=resendCalls;logs.length=0;const res=await route.POST(request(body,headers));return {...res,resend:resendCalls-before,log:logs.join('|')};}
const fresh=()=>security.resetContactSecurityState();
const delivered=r=>r.status===200&&r.data.success===true&&r.data.delivered===true;
const silent=(r,code)=>{assert.equal(r.status,200);assert.equal(JSON.stringify(r.data),JSON.stringify({success:true}));assert.equal(r.resend,0,'Resend must not be called on spam');assert.equal(r.log,'[contact] '+code);};

(async()=>{
  // 1. Legitimate submission: both e-mails sent, delivered flag returned.
  fresh();let r=await post(legit);assert(delivered(r));assert.equal(r.resend,1);assert.equal(r.log,'');
  // Missing Origin/Referer (some browsers) and Vercel preview host stay accepted.
  fresh();assert(delivered(await post({...legit,message:'Autre demande, sans en-tête Origin.'},{origin:''})));
  fresh();assert(delivered(await post({...legit,message:'Depuis une preview.'},{origin:'https://codev2-git-x.vercel.app',host:'codev2-git-x.vercel.app'})));
  // Rare but valid addresses are not blocked.
  for(const email of ['jean.o\'neil+devis@sub.example.museum','a@b.co','contact@xn--bcher-kva.example']){fresh();assert(delivered(await post({...legit,email})),email);}

  // 2. Invalid e-mail.
  for(const email of ['camille@','camille.example.fr','camille@localhost','camille@exa_mple.fr','camille..m@example.fr','camille@example.f','camille@-example.fr','a@b@c.fr','camille@example.123']){fresh();r=await post({...legit,email});assert.equal(r.status,400,email);assert.equal(r.resend,0);assert.equal(r.log,'[contact] spam_invalid_email',email);}

  // 3. Honeypot filled: generic success, nothing sent, no conversion signal.
  fresh();silent(await post({...legit,reference:'https://spam.example'}),'spam_honeypot');

  // 4. Too fast (and missing timing) are rejected without sending.
  fresh();r=await post({...legit,elapsed:800});assert.equal(r.status,400);assert.equal(r.resend,0);assert.equal(r.log,'[contact] spam_too_fast');
  fresh();r=await post({...legit,elapsed:form.minimumFillMs});assert(delivered(r),'A human at the threshold is accepted');
  fresh();const {elapsed,...noTiming}=legit;r=await post(noTiming);assert.equal(r.status,400);assert.equal(r.log,'[contact] spam_invalid_payload');

  // 5. Burst from one IP is rate limited; another IP is unaffected.
  fresh();const burst=[];for(let i=0;i<8;i++)burst.push(await post({...legit,message:'Rafale numéro '+i},{'x-forwarded-for':'192.0.2.7'}));
  assert(burst.slice(0,5).every(delivered));assert(burst.slice(5).every(x=>x.status===429&&x.resend===0&&x.log==='[contact] spam_rate_limit'));
  assert(delivered(await post({...legit,message:'Autre visiteur.'},{'x-forwarded-for':'192.0.2.8'})));

  // 6. Message too long, and body too large.
  fresh();r=await post({...legit,message:'a'.repeat(15001)});assert.equal(r.status,400);assert.equal(r.resend,0);assert.equal(r.log,'[contact] spam_invalid_payload');
  fresh();r=await post({...legit,company:'x'.repeat(40000)});assert.equal(r.status,413);assert.equal(r.resend,0);
  fresh();r=await post(legit,{'content-length':'999999'});assert.equal(r.status,413);
  fresh();assert(delivered(await post({...legit,message:'Un long message détaillé. '.repeat(500)})),'Long but plausible message accepted');

  // 7. Unexpected payloads.
  const bad=[[],'["a"]','not json',{...legit,name:''},{...legit,name:'   '},{...legit,message:' '},{...legit,name:{first:'x'}},{...legit,email:['a@b.fr']},{...legit,admin:true},{...legit,elapsed:'5000'},{...legit,elapsed:-1},{...legit,project:'Casino en ligne'},{...legit,phone:'call me now'},{...legit,name:'Camille\nBcc: x@y.z'},{...legit,name:'camille@example.fr'},{...legit,name:'12345'},{...legit,message:'Bonjour\u0000'},{...legit,service:42}];
  for(const body of bad){fresh();r=await post(body);assert.equal(r.status,400,JSON.stringify(body).slice(0,80));assert.equal(r.resend,0);assert.equal(r.log,'[contact] spam_invalid_payload');}
  fresh();r=await post(legit,{'content-type':'text/plain'});assert.equal(r.status,415);assert.equal(r.resend,0);
  fresh();r=await post(legit,{origin:'https://evil.example'});assert.equal(r.status,403);assert.equal(r.log,'[contact] spam_origin');
  fresh();r=await post(legit,{origin:'',referer:'https://evil.example/form'});assert.equal(r.status,403);
  fresh();assert(delivered(await post({...legit,phone:'+33 6 12 34 56 78'})));

  // 8. Message with a legitimate link (or a few) is accepted.
  fresh();assert(delivered(await post({...legit,message:'Notre site actuel est https://www.boulangerie-martin.fr, il date de 2015.'})));
  fresh();assert(delivered(await post({...legit,message:'Exemples aimés : https://a.example, www.b.example et https://c.example/page.'})));

  // 9. Spam with many URLs, link-only and forum markup.
  fresh();silent(await post({...legit,message:'Best offer https://a.example https://b.example https://c.example https://d.example'}),'spam_links');
  fresh();silent(await post({...legit,message:'https://cheap-pills.example'}),'spam_content');
  fresh();silent(await post({...legit,message:'Great site! [url=https://x.example]click[/url]'}),'spam_content');
  // Repeated message from the same sender after delivery.
  fresh();assert(delivered(await post(legit)));silent(await post(legit),'spam_duplicate');

  // 10. Logs never contain the e-mail, phone or message.
  fresh();await post({...legit,phone:'+33 6 98 76 54 32',reference:'x'});assert(!/camille|98 76|refaire/.test(logs.join()));

  // 11. Analytics: the client only tracks a delivered submission.
  const tracked=[];const onDelivered=service=>tracked.push(service);
  const send=r=>async()=>({ok:r.status<400,json:async()=>r.data});
  fresh();await form.submitContact(legit,send(await post(legit)),onDelivered);assert.deepEqual(tracked,['website']);
  for(const spam of [{...legit,reference:'bot'},{...legit,message:'https://a.example https://b.example https://c.example https://d.example'}]){fresh();await form.submitContact(spam,send(await post(spam)),onDelivered);}
  fresh();await form.submitContact(legit,send(await post(legit)),onDelivered);await form.submitContact(legit,send(await post(legit)),onDelivered);
  for(const spam of [{...legit,elapsed:100},{...legit,email:'nope@'}]){fresh();await assert.rejects(form.submitContact(spam,send(await post(spam)),onDelivered));}
  fresh();for(let i=0;i<5;i++)await post({...legit,message:'Rafale '+i},{'x-forwarded-for':'192.0.2.9'});
  await assert.rejects(form.submitContact(legit,async()=>{const res=await route.POST(request(legit,{'x-forwarded-for':'192.0.2.9'}));return {ok:false,json:async()=>res.data};},onDelivered));
  // Even a delivered response is not tracked when the hidden field was filled client-side.
  await form.submitContact({...legit,reference:'x'},async()=>({ok:true,json:async()=>({success:true,delivered:true})}),onDelivered);
  assert.deepEqual(tracked,['website','website'],'Only the two real deliveries were tracked');

  console.log('Contact anti-spam: legit, e-mail, honeypot, timing, rate limit, size, payload, links, duplicates, logs and analytics OK (all mocked).');
})().catch(e=>{console.error(e);process.exit(1)});
