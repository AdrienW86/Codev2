const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");
const ts = require("typescript");
const cache = new Map();
function load(file) {
  file = path.resolve(file);
  if (cache.has(file)) return cache.get(file);
  const exports = {}; cache.set(file, exports);
  const { outputText } = ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  vm.runInNewContext(outputText, { exports, URL, require: ref => load(path.resolve(path.dirname(file), `${ref}.ts`)) });
  return exports;
}
const catalog = load("src/data/resources.ts");
const { resources, resourceClusters } = catalog;
const { serviceFamilies, serviceIds } = load("src/data/services.ts");
const { projects } = load("src/data/projects.ts");
const { siteNavigation } = load("src/data/navigation.ts");
const seo = load("src/lib/resource-seo.ts");
const breadcrumbs = load("src/data/breadcrumbs.ts");
const families = new Set(serviceFamilies.map(f => f.id));
const ids = new Set(resources.map(r => r.id));
assert.equal(ids.size, resources.length);
assert.equal(new Set(resources.map(r => r.slug)).size, resources.length);
assert.equal(resourceClusters.length, 9);
assert.deepEqual(Array.from(resourceClusters, c => c.id).sort(), [...families].sort());
function validDate(value) { assert(/^\d{4}-\d{2}-\d{2}/.test(value) && Number.isFinite(Date.parse(value))); }
function localMedia(src) { assert(src.startsWith("/") && !src.includes("..")); assert(fs.existsSync(`public${src}`)); }
function validDestination(href) {
  const url = new URL(href, "https://www.code-v.fr");
  assert.equal(url.origin, "https://www.code-v.fr");
  assert(fs.existsSync(`src/app${url.pathname === "/" ? "" : url.pathname}/page.tsx`), `Broken destination: ${href}`);
}
for (const r of resources) {
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(r.slug));
  assert(r.title.trim() && r.description.trim());
  assert(["article", "guide", "comparison", "checklist", "tutorial", "analysis", "video", "case-study"].includes(r.format));
  assert(["informational", "commercial", "transactional", "navigational"].includes(r.searchIntent));
  assert(["discovery", "consideration", "decision"].includes(r.funnelStage));
  assert(families.has(r.topic) && r.serviceFamilies.includes(r.topic));
  for (const f of r.serviceFamilies) assert(families.has(f));
  for (const id of r.relatedServices) assert(serviceIds.includes(id));
  for (const id of r.relatedProjects) assert(projects.some(p => p.id === id));
  for (const id of r.relatedResources) assert(ids.has(id) && id !== r.id);
  for (const list of [r.serviceFamilies, r.relatedServices, r.relatedProjects, r.relatedResources]) assert.equal(new Set(list).size, list.length);
  assert.equal(r.canonical, `https://www.code-v.fr/ressources/${r.slug}`);
  const href = catalog.getResourceCtaHref(r.cta);
  if (r.cta.type === "chat") assert(["website", "acquisition", "automation", "strategy"].includes(r.cta.intent));
  else { assert(href); validDestination(href); }
  for (const solution of catalog.getRelatedSolutions(r)) validDestination(solution.href);
  if (r.coverImage) localMedia(r.coverImage.src);
  if (r.video) { localMedia(r.video.src); localMedia(r.video.poster); }
  if (r.status === "draft") {
    assert.equal(r.indexable, false); assert.equal(r.publishedAt, null);
    assert.equal(r.author, null); assert.equal(r.content, null); assert.equal(r.featured, false);
    assert.equal(catalog.getPublishedResourceBySlug(r.slug), undefined);
    assert.equal(seo.getResourceMetadata(r).robots.index, false);
    assert.equal(seo.getResourceStructuredData(r), null);
  } else {
    assert(catalog.isPublishedResource(r)); validDate(r.publishedAt);
    if (r.updatedAt) { validDate(r.updatedAt); assert(Date.parse(r.updatedAt) >= Date.parse(r.publishedAt)); }
    assert(r.content.length && r.author.name.trim() && r.sourceRefs.length);
  }
}
assert.equal(catalog.getPublishedResources().length, 11);
assert.equal(siteNavigation.find(item => item.label === "Ressources").href, "/ressources");
assert.deepEqual(Array.from(breadcrumbs.getPageBreadcrumb("/ressources").items, i => i.label), ["Accueil", "Ressources"]);
assert.deepEqual(Array.from(breadcrumbs.getResourceBreadcrumb("fixture", "Test").items, i => i.label), ["Accueil", "Ressources", "Test"]);
for (const cta of [{ type: "audit", service: "seo", label: "Test" }, { type: "project", projectId: "chateau-de-projan", label: "Test" }, { type: "explain-project", label: "Test" }, { type: "contact", label: "Test" }]) validDestination(catalog.getResourceCtaHref(cta));
assert.equal(catalog.getResourceCtaHref({ type: "project", projectId: "missing", label: "Test" }), null);

// Test-only fixture: never added to the real editorial catalog.
const fixture = { ...resources[0], status: "published", publishedAt: "2000-01-01", updatedAt: null, author: { name: "Test fixture", type: "Organization", url: null }, content: [{ type: "paragraph", text: "Fixture" }], sourceRefs: ["fixture"], indexable: true };
assert(catalog.isPublishedResource(fixture));
assert.equal(catalog.isPublishedResource({ ...fixture, publishedAt: "2999-01-01" }), false);
for (const status of ["draft", "scheduled", "archived"]) assert.equal(catalog.isPublishedResource({ ...fixture, status }), false);
assert.equal(catalog.getPublishedArticles().length, 11);
assert.deepEqual(Array.from(breadcrumbs.getPageBreadcrumb("/articles").items, i => i.label), ["Accueil", "Articles"]);
assert.equal(seo.getResourceMetadata(fixture).robots.index, true);
assert.equal(seo.getResourceStructuredData(fixture).datePublished, "2000-01-01");
assert(!Object.hasOwn(seo.getResourceStructuredData(fixture), "dateModified"));
assert.equal(seo.getResourceStructuredData({ ...fixture, format: "video", video: { uploadDate: null } }), null, "Incomplete video must not emit VideoObject");
assert.equal(seo.getResourceMetadata({ ...fixture, indexable: false }).robots.index, false);
assert.equal(seo.getResourceStructuredData({ ...fixture, content: null }), null);
assert.equal(catalog.isPublishedResource({ ...fixture, content: [{ type: "paragraph", text: " " }] }), false);
assert.equal(catalog.isPublishedResource({ ...fixture, publishedAt: "unknown" }), false);
assert.equal(catalog.isPublishedResource({ ...fixture, sourceRefs: [""] }), false);
assert.equal(catalog.isPublishedResource({ ...fixture, updatedAt: "1999-01-01" }), false);
assert.equal(catalog.getResourcesByProject("code-v-motion").length, 0);
assert.equal(catalog.getResourcesByServiceFamily("web").length, 4);
assert.equal(catalog.getResourcesByService("website").length, 4);
const expectedPages = {
  "gbp-optimization": ["/referencement-local"], "ads-budget": ["/publicite"], "local-services-guide": ["/publicite"], "showcase-or-ecommerce": ["/creation-site"], "redesign-for-seo": ["/creation-site", "/referencement"], "useful-ai-agents": ["/solutions/automatisation-ia"],
  "website-cost-2026": ["/creation-site"], "website-redesign": ["/creation-site"],
  "seo-or-ads": ["/referencement", "/publicite"], "local-google-visibility": ["/referencement-local"],
  "first-automations": ["/solutions/automatisation-ia"],
};
for (const r of catalog.getPublishedArticles()) {
  assert.equal(r.indexable, true); assert.equal(r.author.name, "CODE-V");
  assert.equal(seo.getResourceStructuredData(r)["@type"], "BlogPosting");
  const links = r.content.filter(b => b.type === "links").flatMap(b => b.links);
  for (const target of expectedPages[r.id]) assert(links.some(link => link.href === target));
  assert(links.some(link => link.href === "/realisations"));
  for (const link of links.filter(link => link.href.startsWith("/"))) {
    if (link.href.startsWith("/ressources/")) assert(catalog.getPublishedResourceBySlug(link.href.split("/").pop()));
    else validDestination(link.href);
  }
  const words = r.content.map(b => b.type === "list" ? b.items.join(" ") : b.type === "links" ? b.links.map(l => l.label).join(" ") : b.type === "table" ? b.rows.flat().join(" ") : b.text).join(" ").split(/\s+/).length;
  assert(words > 500, `${r.slug}: substantive content`);
}
assert.equal(catalog.isPublishedResource({ ...fixture, content: [{ type: "links", label: "Test", links: [{ href: "javascript:alert(1)", label: "Test" }] }] }), false);
assert.equal(catalog.isPublishedResource({ ...fixture, content: [{ type: "table", caption: "Test", headers: ["A", "B"], rows: [["A"]] }] }), false);
console.log("Resources: 11 real articles, 3 retained briefs, money-page links, publication gates, structured data and breadcrumbs validated.");
