import type { Resource, ResourceBlock } from "@/data/resources";
import type { ServiceCategory } from "@/data/services";

// Articles de l'Agent Blog (CODE-V OS) : lus depuis l'API publique en lecture seule, mis en cache 5 minutes (ISR), puis
// présentés comme les articles du registre (même page /ressources/[slug], même liste /articles, même sitemap). Toute
// panne de l'API est silencieuse : le site garde ses articles statiques.
const DEFAULT_API = "https://os.code-v.fr/api/public/blog/58cb446b-b5ac-4440-b1d0-7a989f42c7e5";
const api = () => (globalThis.process?.env?.CODEV_OS_BLOG_API || DEFAULT_API).replace(/\/$/, "");
const origin = "https://www.code-v.fr";
export const OS_BLOG_REVALIDATE = 300;

type ApiArticle = {
  slug: string; title: string; description: string; excerpt: string; service: string | null; url: string | null;
  image: { url: string; alt: string; width: number; height: number } | null; publishedAt: string; updatedAt: string; readingMinutes: number; markdown?: string;
};
const SLUG = /^[a-z0-9]+(-[a-z0-9]+)*$/;

async function read<T>(path: string): Promise<T | null> {
  try {
    const response = await fetch(`${api()}${path}`, { next: { revalidate: OS_BLOG_REVALIDATE }, signal: AbortSignal.timeout(5000), headers: { Accept: "application/json" } });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch { return null; }
}

/** Famille de services la plus proche de la prestation traitée (taxonomie existante du site). */
export function topicOf(service: string | null): ServiceCategory {
  const s = (service ?? "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  if (/seo|referencement|google business|visibilite/.test(s)) return "seo";
  if (/ads|publicite|campagne|acquisition/.test(s)) return "acquisition";
  if (/reseaux|social|community|instagram|facebook|tiktok/.test(s)) return "social";
  if (/motion|video|contenu|redaction|photo/.test(s)) return "content";
  if (/automatisation|\bia\b|intelligence artificielle|chatbot/.test(s)) return "automation";
  if (/logiciel|saas|metier|crm|erp/.test(s)) return "software";
  if (/maintenance|hebergement|securite/.test(s)) return "maintenance";
  if (/strategie|conseil|audit/.test(s)) return "strategy";
  return "web";
}

/** Markdown simple de l'agent (## / ### / listes / paragraphes) → blocs du registre ; le gras et l'italique sont lissés. */
export function blocksFromMarkdown(markdown: string): ResourceBlock[] {
  const blocks: ResourceBlock[] = [];
  let paragraph: string[] = [], list: string[] = [];
  const plain = (text: string) => text.replace(/\*\*([^*]+)\*\*/g, "$1").replace(/\*([^*\s][^*]*)\*/g, "$1").trim();
  const flush = () => {
    if (paragraph.length) { blocks.push({ type: "paragraph", text: plain(paragraph.join(" ")) }); paragraph = []; }
    if (list.length) { blocks.push({ type: "list", items: list.map(plain) }); list = []; }
  };
  for (const raw of markdown.replace(/\r\n?/g, "\n").split("\n")) {
    const line = raw.trim(); let m: RegExpMatchArray | null;
    if (!line) { flush(); continue; }
    if ((m = line.match(/^(#{2,3})\s+(.+)$/))) { flush(); blocks.push({ type: "heading", text: plain(m[2]), ...(m[1].length === 3 ? { level: 3 as const } : {}) }); continue; }
    if ((m = line.match(/^(?:[-*]|\d+[.)])\s+(.+)$/))) { if (paragraph.length) flush(); list.push(m[1]); continue; }
    if (list.length) flush();
    paragraph.push(line.replace(/^#+\s*/, ""));
  }
  flush();
  return blocks.filter(block => block.type === "list" ? block.items.length > 0 : block.type === "paragraph" || block.type === "heading" ? block.text.length > 0 : true);
}

export function resourceFromOs(article: ApiArticle): Resource | null {
  if (!SLUG.test(article.slug) || !Number.isFinite(Date.parse(article.publishedAt))) return null;
  const topic = topicOf(article.service);
  const canonical = `${origin}/ressources/${article.slug}`;
  return {
    id: `os-${article.slug}`, slug: article.slug, title: article.title, description: article.description,
    format: "article", status: "published", publishedAt: article.publishedAt,
    updatedAt: Date.parse(article.updatedAt) > Date.parse(article.publishedAt) + 60_000 ? article.updatedAt : null,
    author: { name: "CODE-V", type: "Organization", url: origin },
    topic, serviceFamilies: [topic], relatedServices: [], relatedProjects: [], relatedResources: [], keywords: article.service ? [article.service] : [],
    searchIntent: "informational", funnelStage: "discovery", featured: false,
    coverImage: article.image && /^https:\/\//.test(article.image.url) ? { src: article.image.url, alt: article.image.alt, width: article.image.width, height: article.image.height, caption: "" } : null,
    video: null, readingTime: Math.max(1, article.readingMinutes || 1),
    seoTitle: `${article.title} | CODE-V`, seoDescription: article.description, canonical, indexable: true,
    content: article.markdown ? blocksFromMarkdown(article.markdown) : null,
    cta: { type: "contact", label: "Parler de votre projet" }, sourceRefs: [canonical],
  };
}

/** Articles publiés par l'Agent Blog, sans leur corps (liste, sitemap). Vide si l'API ne répond pas. */
export async function getOsArticles(): Promise<Resource[]> {
  const body = await read<{ articles?: ApiArticle[] }>("");
  return (body?.articles ?? []).map(resourceFromOs).filter((r): r is Resource => r !== null);
}
/** Un article publié par l'Agent Blog, avec son corps ; null s'il n'existe pas (ou si l'API ne répond pas). */
export async function getOsArticle(slug: string): Promise<Resource | null> {
  if (!SLUG.test(slug)) return null;
  const body = await read<{ article?: ApiArticle }>(`/${slug}`);
  const resource = body?.article ? resourceFromOs(body.article) : null;
  return resource?.content?.length ? resource : null;
}
