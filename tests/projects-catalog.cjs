const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");

function readCatalog(path) {
  const { outputText } = ts.transpileModule(fs.readFileSync(path, "utf8"), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  const exports = {};
  vm.runInNewContext(outputText, { exports });
  return exports;
}
const catalog = readCatalog("src/data/projects.ts");
const { projects, projectSectors } = catalog;
const { serviceFamilies, serviceIds } = readCatalog("src/data/services.ts");
const families = new Set(serviceFamilies.map(f => f.id));
const services = new Set(serviceIds);
assert.equal(new Set(projects.map(p => p.id)).size, projects.length, "Duplicate IDs");
assert.equal(new Set(projects.map(p => p.slug)).size, projects.length, "Duplicate slugs");
function publicUrl(value) {
  const url = new URL(value);
  assert.equal(url.protocol, "https:");
  assert(url.hostname.includes("."));
  assert(!url.username && !url.password);
}
function localMedia(value) {
  assert(value.startsWith("/") && !value.startsWith("//"));
  assert(!value.includes(".."));
  assert(fs.existsSync(`public${value}`), `Missing media: ${value}`);
}
const required = ["id", "slug", "name", "publicUrl", "sector", "projectType", "serviceFamilies", "services", "summary", "context", "objectives", "workCompleted", "features", "stack", "visualStyle", "screenshots", "videos", "logo", "coverImage", "verifiedResults", "testimonial", "testimonialAuthor", "location", "year", "featured", "caseStudyReady", "status", "relatedServices", "relatedArticles", "relatedVideos", "seoTitle", "seoDescription"];
for (const p of projects) {
  for (const field of required) assert(Object.hasOwn(p, field), `${p.id}: missing ${field}`);
  assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(p.slug));
  assert(p.id.trim() && p.name.trim() && p.summary.trim());
  assert(["draft", "published"].includes(p.status));
  assert(p.sector === null || projectSectors.includes(p.sector));
  if (p.publicUrl) publicUrl(p.publicUrl);
  for (const f of p.serviceFamilies) assert(families.has(f), `Unknown family: ${f}`);
  for (const id of [...p.services, ...p.relatedServices]) assert(services.has(id), `Unknown service: ${id}`);
  for (const list of [p.serviceFamilies, p.services, p.relatedServices, p.relatedArticles, p.relatedVideos]) assert.equal(new Set(list).size, list.length);
  // Compatibility aliases must remain consistent with the canonical fields.
  assert.equal(p.projectType, p.format);
  assert.deepEqual(p.serviceFamilies, p.families);
  assert.deepEqual(p.stack, p.technologies);
  assert.deepEqual(p.screenshots, p.visuals);
  assert.equal(p.videos[0] ?? null, p.video);
  if (p.featured) {
    assert.equal(p.status, "published");
    assert(p.sector && p.summary && p.sourceRefs.length && (p.workCompleted.length || p.features.length));
    assert(p.publicUrl || p.coverImage || p.videos.length, "Featured reference needs a visitable site or real media");
  }
  if (p.caseStudyReady) assert(p.context.trim() && p.objectives.length && p.workCompleted.length && p.sourceRefs.length && (p.screenshots.length || p.videos.length));
  if (p.status === "published" && p.kind === "client") assert(p.clientName && p.publicationApprovalRef);
  for (const result of p.verifiedResults) {
    assert(result.label.trim() && result.value.trim() && result.methodology.trim() && result.publicationApprovalRef.trim());
    assert(p.sourceRefs.includes(result.sourceRef), "Result needs a catalogued source");
  }
  if (p.testimonial) assert(p.testimonial.quote.trim() && p.testimonial.author.trim() && p.testimonial.publicationApprovalRef.trim());
  assert.equal(p.testimonialAuthor, p.testimonial?.author ?? null);
  for (const image of [...p.screenshots, ...[p.logo, p.coverImage].filter(Boolean)]) {
    localMedia(image.src); assert(image.alt.trim() && image.width > 0 && image.height > 0);
  }
  for (const video of p.videos) { localMedia(video.src); localMedia(video.poster); assert(video.title.trim() && video.description.trim()); }
  for (const path of p.relatedVideos) { localMedia(path); assert(projects.some(other => other.videos.some(v => v.src === path))); }
  for (const slug of p.relatedArticles) {
    assert(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug));
    assert(fs.existsSync(`src/app/articles/${slug}/page.tsx`), "Article must have a real route");
  }
  if (p.observations) {
    assert(/^\d{4}-\d{2}-\d{2}$/.test(p.observations.checkedAt));
    assert(p.observations.sourceUrls.length);
    for (const url of p.observations.sourceUrls) { publicUrl(url); assert(p.sourceRefs.includes(url)); }
    assert(p.observations.publicTitle.trim() && p.observations.notes.length);
  }
  for (const ref of p.sourceRefs) {
    if (ref.startsWith("https:")) publicUrl(ref);
    else assert(fs.existsSync(ref), `Missing local evidence: ${ref}`);
  }
}
const clients = ["chateau-de-projan", "le-parc-de-gouts", "buffalo-snack", "antiquite-canetoise", "peinture-occitane", "express-nuisibles", "narbonne-toiture"];
for (const slug of clients) {
  const p = catalog.getProjectBySlug(slug);
  assert(p && p.kind === "client" && p.status === "published");
  assert.equal(p.verifiedResults.length, 0);
  assert.equal(p.services.length, 0, "Visible functionality must not become a delivered service claim");
  assert.equal(p.workCompleted.length, 0);
  assert.equal(p.objectives.length, 0);
  assert.equal(p.screenshots.length, slug === "chateau-de-projan" ? 2 : 1);
  assert.equal(p.coverImage.src, `/projects/${slug}/home.webp`);
  for (const image of p.screenshots) assert(fs.statSync(`public${image.src}`).size < 180000, "Capture exceeds the image budget");
  assert.equal(p.videos.length, 0);
  assert.equal(p.testimonial, null);
  assert.equal(p.caseStudyReady, false);
}
assert.equal(projects.length, 11);
assert.equal(catalog.getProjectBySlug("les-delices-de-saleilles"), undefined);
assert.equal(catalog.getProjectBySlug("buffalo-snack").publicUrl, "https://buffalo-snack.vercel.app/");
assert.deepEqual(Array.from(catalog.getPublishedProjects(), p => p.id), ["protection-nuisibles", "nuisibles-toulon", "code-v-site", "code-v-motion", ...clients], "Published selection incomplete");
assert.deepEqual(Array.from(catalog.getFeaturedProjects(), p => p.id), ["chateau-de-projan"]);
assert.equal(catalog.getProjectBySlug("missing"), undefined);
assert.equal(catalog.getProjectsByServiceFamily("web").length, 10);
assert.equal(catalog.getProjectsByServiceFamily("acquisition").length, 2);
assert.equal(catalog.getProjectsBySector("hospitality").length, 2);
console.log(`Projects catalog: ${projects.length} projects validated; public selection preserved.`);


for (const slug of ['protection-nuisibles','nuisibles-toulon']) { const p = catalog.getProjectBySlug(slug); assert(p.caseStudyReady); assert.equal(p.verifiedResults.length, 1); assert.equal(p.screenshots.length, 3); assert(p.sourceRefs.includes(p.verifiedResults[0].sourceRef)); assert(fs.existsSync('src/app/realisations/'+slug+'/page.tsx')); }
