const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

// The catalog has no runtime imports; transpile with the existing TS dependency.
const file = fs.readFileSync("src/data/services.ts", "utf8");
const { outputText } = ts.transpileModule(file, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
});
const moduleObject = { exports: {} };
vm.runInNewContext(outputText, { exports: moduleObject.exports });
const { services, serviceIds, serviceFamilies, solutionPaths, catalogPolicy } = moduleObject.exports;

const ids = new Set(services.map(service => service.id));
const slugs = new Set(services.map(service => service.slug));
const categories = new Set(serviceFamilies.map(family => family.id));
assert.equal(ids.size, services.length, "Duplicate service IDs");
assert.equal(slugs.size, services.length, "Duplicate slugs");
assert.equal(categories.size, 9);
assert.deepEqual(Array.from(serviceFamilies, family => family.name), [
  "Web & Applications", "Acquisition & Publicité", "SEO & Visibilité locale",
  "Réseaux sociaux & Community management", "Contenu & Création", "Automatisation & IA",
  "Logiciels & Solutions métier", "Stratégie digitale", "Maintenance & Accompagnement",
]);
assert.equal(services.length, 32);
const originalSlugs = {
  website: "creation-refonte-site", "landing-page": "landing-pages", "web-application": "applications-web",
  "business-tool": "outils-metier-dashboards", seo: "referencement-naturel", "local-seo": "seo-local-google-business-profile",
  "google-ads": "google-ads", "local-services": "google-local-services", "meta-ads": "facebook-instagram-ads",
  "conversion-tracking": "tracking-mesure-conversions", "editorial-social": "strategie-editoriale-reseaux-sociaux",
  "content-production": "creation-contenus", "video-motion": "video-motion-design", "business-workflows": "automatisation-processus",
  "airtable-workspace": "structuration-airtable", "api-integrations": "integrations-api", "ai-agents": "agents-ia-assistants-metier",
  "automated-reporting": "reporting-automatise",
};
for (const [id, slug] of Object.entries(originalSlugs)) {
  assert.equal(services.find(service => service.id === id)?.slug, slug, `Existing service identity changed: ${id}`);
}
assert.equal(serviceIds.length, services.length, "Missing catalog entries");
for (const id of serviceIds) assert(ids.has(id), `Missing service ${id}`);

const requiredLists = ["targetClients", "included", "excluded", "desiredOutcomes", "prerequisites", "qualificationQuestions", "commercialQuestions"];
for (const service of services) {
  assert(categories.has(service.category), `Unknown family: ${service.id}`);
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(service.slug));
  for (const key of ["name", "summary", "description", "clientProblem"]) assert(service[key]?.trim(), `${service.id}: empty ${key}`);
  for (const key of ["useCases", "subservices"]) assert(service[key]?.length > 0, `${service.id}: empty ${key}`);
  for (const key of requiredLists) assert(service[key]?.length > 0, `${service.id}: empty ${key}`);
  assert(["acquisition", "website", "automation", "strategy"].includes(service.chatIntent));
  for (const related of service.complementaryServiceIds) {
    assert(ids.has(related), `${service.id}: unknown complement ${related}`);
    assert.notEqual(related, service.id, "Self-referencing complement");
  }
  assert.equal(new Set(service.complementaryServiceIds).size, service.complementaryServiceIds.length);
  const cta = new URL(service.cta.href, "https://www.code-v.fr");
  assert.equal(cta.pathname, "/contact", "CTA must use an existing route");
  assert.equal(cta.searchParams.get("service"), service.id);
  assert.equal(service.commercialStatus, "draft", "No new commercial scope is approved yet");
  assert.equal(service.pricing.status, "pending-validation");
  assert(service.pricing.proposedModes.length > 0);
  assert(service.pricing.proposedModes.every(mode => ["fixed", "quote", "recurring", "time-materials"].includes(mode)));
  assert(service.seo.primaryKeyword.trim());
  for (const field of ["secondaryKeywords", "searchIntents", "supportingContents", "articleIdeas", "videoOpportunities", "caseStudyIdeas", "internalLinks"]) {
    assert(service.seo[field].length, `${service.id}: missing SEO ${field}`);
  }
  assert(service.seo.searchIntents.every(intent => ["commercial", "informational"].includes(intent)));
  assert(["recommended", "grouped", "conditional"].includes(service.seo.page.status));
  assert(/^\/services\/[a-z0-9-]+$/.test(service.seo.page.proposedPath));
  assert(service.seo.page.reason.trim());
  if (service.seo.page.status !== "recommended") {
    assert(ids.has(service.seo.page.groupedWith));
    assert.notEqual(service.seo.page.groupedWith, service.id);
    assert.equal(services.find(item => item.id === service.seo.page.groupedWith).seo.page.status, "recommended", "Page grouping must have a dedicated parent");
  }
  for (const id of service.seo.internalLinks) { assert(ids.has(id)); assert.notEqual(id, service.id); }
  assert(["optional", "core"].includes(service.recurrence.potential));
  assert(service.recurrence.note.trim());
  assert(service.recurrence.billingForms.length);
  assert(service.recurrence.billingForms.every(form => ["monthly-package", "subscription", "quote", "time-materials"].includes(form)));
  if (service.recurrence.potential === "core") assert(service.pricing.proposedModes.includes("recurring"));
  assert(["high", "medium"].includes(service.commercialPriority.level));
  assert.equal(service.commercialPriority.status, "proposed");
  assert(service.commercialPriority.reason.trim());
  assert(!("volume" in service.seo), "No invented SEO volumes");
  assert(!/[\p{L}]\?[\p{L}]/u.test(JSON.stringify({ ...service, cta: { label: service.cta.label } })), `${service.id}: damaged French encoding`);
  assert(service.provenance.sources.length > 0);
  assert(!("amount" in service.pricing), "No unvalidated price");
  if (service.existingPage) {
    assert(fs.existsSync(`src/app${service.existingPage}/page.tsx`), `Missing existing route: ${service.existingPage}`);
  }
}
for (const path of solutionPaths) {
  for (const id of path.serviceIds) assert(ids.has(id), `Unknown service in path: ${id}`);
  assert.equal(path.commercialStatus, "draft");
}
assert.equal(catalogPolicy.containsValidatedPrices, false);
assert.equal(catalogPolicy.performanceGuarantees, false);
assert.equal(catalogPolicy.version, 2);
assert.equal(services.filter(service => service.seo.page.status === "recommended").length, 17);
assert.equal(services.filter(service => service.seo.page.status === "grouped").length, 14);
assert.equal(services.filter(service => service.seo.page.status === "conditional").length, 1);
assert.equal(services.filter(service => service.recurrence.potential === "core").length, 7);
const byId = id => services.find(service => service.id === id);
assert.equal(byId("business-tool").category, "software");
assert.equal(byId("editorial-social").category, "social");
assert.equal(byId("seo").category, "seo");
assert.equal(byId("local-seo").category, "seo");
assert(byId("social-management").excluded.some(text => text.includes("publicitaire")));
assert(byId("content-production").excluded.some(text => text.includes("Publication")));
assert(byId("digital-strategy").description.includes("feuille de route"));
assert.equal(new Set(services.map(service => service.seo.primaryKeyword)).size, services.length, "Overlapping primary keyword targets");
console.log(`Catalog OK: ${services.length} services, ${categories.size} families, valid complements and existing destinations, no approved prices.`);
