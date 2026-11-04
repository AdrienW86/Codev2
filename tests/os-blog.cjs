// Articles de l'Agent Blog (CODE-V OS) : conversion Markdown → blocs du registre, forme Resource, tolérance aux pannes.
const assert = require("node:assert/strict"), fs = require("node:fs"), path = require("node:path"), vm = require("node:vm"), ts = require("typescript");
function load(file, extra = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(path.resolve(file), "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText,
    { exports, URL, require: () => ({}), ...extra });
  return exports;
}
const blog = load("src/lib/os-blog.ts");
const catalog = (() => { const cache = new Map(); const l = file => { file = path.resolve(file); if (cache.has(file)) return cache.get(file); const exports = {}; cache.set(file, exports);
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, "utf8"), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, { exports, URL, require: r => l(r.startsWith("@/") ? "src/" + r.slice(2) + ".ts" : path.resolve(path.dirname(file), r + ".ts")) }); return exports; };
  return l("src/data/resources.ts"); })();

assert.deepEqual(JSON.parse(JSON.stringify(blog.blocksFromMarkdown("Intro **forte**.\nSuite.\n\n## Partie\n- un\n- *deux*\n\n### Détail\n1. premier\nTexte"))), [
  { type: "paragraph", text: "Intro forte. Suite." }, { type: "heading", text: "Partie" }, { type: "list", items: ["un", "deux"] },
  { type: "heading", text: "Détail", level: 3 }, { type: "list", items: ["premier"] }, { type: "paragraph", text: "Texte" }]);
assert.equal(blog.topicOf("Référencement naturel"), "seo");
assert.equal(blog.topicOf("Création de site web"), "web");
assert.equal(blog.topicOf("Motion design"), "content");

const article = { slug: "bien-choisir-son-site", title: "Bien choisir son site", description: "Une description assez longue pour Google.", excerpt: "Chapô.", service: "Création de site web",
  url: "https://www.code-v.fr/ressources/bien-choisir-son-site", image: { url: "https://lehlbcnpufkllcykvtlg.supabase.co/storage/v1/object/public/blog-images/c/i.jpg", alt: "Alt", width: 1600, height: 900 },
  publishedAt: "2026-11-01T08:00:00Z", updatedAt: "2026-11-01T08:00:00Z", readingMinutes: 4, markdown: "Intro.\n\n## A\nTexte." };
const r = blog.resourceFromOs(article);
assert.equal(r.canonical, "https://www.code-v.fr/ressources/bien-choisir-son-site");
assert.equal(r.updatedAt, null); assert.equal(r.format, "article"); assert.equal(r.coverImage.width, 1600);
assert.equal(catalog.isPublishedResource(r), true, "same publication gate as the registry");
assert.equal(blog.resourceFromOs({ ...article, slug: "../x" }), null);
assert.equal(blog.resourceFromOs({ ...article, image: { ...article.image, url: "http://x/y.jpg" } }).coverImage, null);
assert.equal(blog.resourceFromOs({ ...article, markdown: undefined }).content, null, "list entries carry no body");

(async () => {
  assert.equal((await blog.getOsArticles()).length, 0, "API down: no remote article, no crash");
  assert.equal(await blog.getOsArticle("x"), null);
  const ok = load("src/lib/os-blog.ts", { fetch: async (url) => ({ ok: true, json: async () => url.endsWith("/bien-choisir-son-site") ? { article } : { articles: [{ ...article, markdown: undefined }] } }), AbortSignal });
  assert.equal((await ok.getOsArticles())[0].slug, "bien-choisir-son-site");
  assert.equal((await ok.getOsArticle("bien-choisir-son-site")).content.length, 3);
  assert.equal(await ok.getOsArticle("BAD SLUG"), null);
  console.log("Agent Blog: Markdown blocks, Resource shape, publication gate and API failures OK");
})().catch(error => { console.error(error); process.exit(1); });
