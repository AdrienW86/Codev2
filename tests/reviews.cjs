const assert=require('node:assert/strict'),fs=require('fs'),vm=require('vm'),ts=require('typescript');
const mod={exports:{}};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/data/reviews.ts','utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS}}).outputText,{exports:mod.exports});
const {reviews,getReviewsByIds,getReviewsByCategory}=mod.exports;
assert.equal(reviews.length,8);assert.equal(new Set(reviews.map(r=>r.id)).size,8);
for(const r of reviews){assert(r.author.trim());assert(r.text.trim());assert(Number.isInteger(r.rating)&&r.rating>=1&&r.rating<=5);assert.equal(r.source,'Google');assert(r.category.length);assert(r.category.every(c=>['web','seo','ads','maintenance','strategy'].includes(c)));assert(/^2025-0[67]$/.test(r.visitedAt))}
assert.equal(getReviewsByIds(['gaston-barreau','pierre-louis','olivier-garnier']).length,3);
assert.equal(getReviewsByCategory('strategy').length,2);
assert.equal(getReviewsByIds(['stephane-sivan'])[0].text,'Résultat professionnel, site rapide et bien référencé.');
assert.equal(getReviewsByIds(['olivier-garnier'])[0].text,'Gestion de nos pubs Google Ads efficace et rentable.');
console.log('8 reviews: unique ids, valid fields/categories/visit months, selections OK');
