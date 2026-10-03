import "server-only";

export type FacebookPost = { id: string; message: string; date: string; permalink: string; media?: { src: string; width: number; height: number; type: string } };
export type FacebookFeedResult = { status: "available" | "empty" | "unavailable"; posts: FacebookPost[] };
const unavailable: FacebookFeedResult = { status: "unavailable", posts: [] };
const record = (value: unknown): Record<string, unknown> => value !== null && typeof value === "object" && !Array.isArray(value) ? value as Record<string, unknown> : {};
const string = (value: unknown) => typeof value === "string" ? value : "";
const onHost = (host: string, domain: string) => host === domain || host.endsWith(`.${domain}`);

function publicUrl(value: unknown, image = false): string | undefined {
  try {
    const url = new URL(string(value));
    if (url.protocol !== "https:" || url.username || url.password) return;
    const domains = image ? ["fbcdn.net", "fbsbx.com"] : ["facebook.com", "fb.com"];
    if (!domains.some(domain => onHost(url.hostname, domain))) return;
    if ([...url.searchParams.keys()].some(key => /token|secret|authorization/i.test(key))) return;
    return url.href;
  } catch { return; }
}

/** Only public fields leave this server module. Never return Graph errors or paging URLs. */
export async function getFacebookFeed(): Promise<FacebookFeedResult> {
  const pageId = process.env.FACEBOOK_ID?.trim();
  const token = process.env.FACEBOOK_TOKEN?.trim();
  if (!pageId || !/^\d+$/.test(pageId) || !token) return unavailable;
  try {
    const url = new URL(`https://graph.facebook.com/v21.0/${pageId}/posts`);
    url.searchParams.set("fields", "id,message,created_time,permalink_url,attachments{type,media,subattachments{type,media}}");
    url.searchParams.set("limit", "8");
    const response = await fetch(url.href, { headers: { Authorization: `Bearer ${token}` }, next: { revalidate: 300 }, signal: AbortSignal.timeout(8000) });
    if (!response.ok) return unavailable;
    const body = record(await response.json());
    if (body.error || !Array.isArray(body.data)) return unavailable;
    const posts: FacebookPost[] = [];
    for (const value of body.data.slice(0, 8)) {
      const post = record(value);
      const id = string(post.id);
      const permalink = publicUrl(post.permalink_url);
      const timestamp = Date.parse(string(post.created_time));
      if (!/^[\d_]+$/.test(id) || !permalink || !Number.isFinite(timestamp)) continue;
      const attachments = record(post.attachments).data;
      const first = record(Array.isArray(attachments) ? attachments[0] : undefined);
      const children = record(first.subattachments).data;
      const candidates = [first, ...(Array.isArray(children) ? children.map(record) : [])];
      let media: FacebookPost["media"];
      for (const candidate of candidates) {
        const image = record(record(candidate.media).image);
        const src = publicUrl(image.src, true);
        if (!src) continue;
        const width = typeof image.width === "number" && image.width > 0 && image.width <= 20000 ? Math.round(image.width) : 1200;
        const height = typeof image.height === "number" && image.height > 0 && image.height <= 20000 ? Math.round(image.height) : 900;
        media = { src, width, height, type: string(candidate.type).startsWith("video") ? "video" : "image" };
        break;
      }
      const message = string(post.message).slice(0, 20000);
      if (!message && !media) continue;
      posts.push({ id, message, date: new Date(timestamp).toISOString(), permalink, ...(media ? { media } : {}) });
    }
    posts.sort((a,b) => Date.parse(b.date) - Date.parse(a.date));
    const result: FacebookFeedResult = { status: posts.length ? "available" : "empty", posts };
    return JSON.stringify(result).includes(token) ? unavailable : result;
  } catch {
    // Never log upstream payloads, headers, URLs or exception messages.
    return unavailable;
  }
}
