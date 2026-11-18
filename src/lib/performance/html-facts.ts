import { load } from "cheerio";
import type { PageFacts, FactSection } from "./facts";

const absolute = (value: string, base: string) => { if(!value)return ""; try { return new URL(value, base).toString(); } catch { return value; } };
const text = (value: string) => value.replace(/\s+/g, " ").trim();
const yes = (value: boolean) => value ? "Oui" : "Non";
const socials = /(?:^|\.)(facebook\.com|instagram\.com|linkedin\.com|youtube\.com|youtu\.be|twitter\.com|x\.com|tiktok\.com|pinterest\.com)$/i;

export function inspectHtml(html: string, url: string): PageFacts {
  const $ = load(html);
  // Retain source metadata before removing non-content elements for text analysis.
  const sections: FactSection[] = [];
  const section = (id: string, title: string, columns: string[], rows: string[][], note: string, status: FactSection["status"] = "unknown") =>
    sections.push({ id, title, columns, rows, note, status });
  const title = text($("title").first().text());
  const description = $("meta[name='description' i]").attr("content") || "";
  section("serp", "Identité de la page et aperçu de recherche", ["Élément", "Valeur"], [
    ["URL analysée", url], ["Titre", title || "Absent"], ["Longueur du titre", String(Array.from(title).length) + " caractères"],
    ["Méta description", description || "Absente"], ["Longueur de la description", String(Array.from(description).length) + " caractères"],
    ["Langue déclarée", $("html").attr("lang") || "Non déclarée"], ["Viewport", $("meta[name='viewport' i]").attr("content") || "Absent"],
    ["Encodage déclaré", $("meta[charset]").attr("charset") || $("meta[http-equiv='content-type' i]").attr("content") || "Non déclaré"],
  ], "L’aperçu est indicatif : Google peut réécrire le titre et l’extrait. Les longueurs sont des observations, sans seuil de classement garanti.", !title ? "critical" : !description ? "warning" : "good");
  const headings = $("h1,h2,h3,h4,h5,h6").toArray().map((el, i) => [String(i + 1), el.tagName.toUpperCase(), text($(el).text())]);
  let previous = 0;
  const jumps = headings.some(row => { const level = Number(row[1][1]); const jump = previous > 0 && level > previous + 1; previous = level; return jump; });
  section("headings", "Structure complète des titres H1 à H6", ["Ordre", "Niveau", "Texte"], headings,
    Array.from({ length: 6 }, (_, i) => `H${i + 1} : ${headings.filter(row => row[1] === `H${i + 1}`).length}`).join(" · ") + ". " + (jumps ? "Des niveaux sont sautés : vérifier la hiérarchie." : "Aucun saut de niveau détecté.") + " Les titres vides sont conservés dans l’inventaire.", !headings.some(row => row[1] === "H1") || jumps || headings.some(row => !row[2]) ? "warning" : "good");
  section("metadata", "Métadonnées et directives déclarées", ["Attribut / nom", "Contenu"], $("meta").toArray().map(el => [$(el).attr("name") || $(el).attr("property") || $(el).attr("http-equiv") || "charset", $(el).attr("content") || $(el).attr("charset") || ""]), "Inventaire complet des balises meta présentes dans le HTML initial. Une déclaration n’est pas une validation de son effet.");
  section("alternates", "Canonical, langues et liens de document", ["Relation", "Langue", "URL / valeur", "Type"], $("link").toArray().map(el => [$(el).attr("rel") || "", $(el).attr("hreflang") || "", absolute($(el).attr("href") || "", url), $(el).attr("type") || ""]), "Inclut canonical, hreflang, icônes, feuilles de style, préchargements et autres liens de document. Hreflang n’est utile que si des versions linguistiques correspondantes existent.");
  const images = $("img").toArray().map(el => [absolute($(el).attr("src") || "", url), $(el).attr("alt") === undefined ? "ABSENT" : $(el).attr("alt") === "" ? "Vide (peut être décoratif)" : $(el).attr("alt")!, $(el).attr("width") || "Non déclaré", $(el).attr("height") || "Non déclaré", $(el).attr("loading") || "Défaut navigateur", $(el).attr("srcset") || ""]);
  section("images", "Inventaire des images et textes alternatifs", ["Source", "ALT", "Largeur", "Hauteur", "Chargement", "Srcset"], images, `${images.length} images ; ${images.filter(row => row[1] === "ABSENT").length} sans attribut ALT. Un ALT vide peut être adapté à une image décorative. Dimensions déclarées, pas dimensions mesurées.`, images.some(row => row[1] === "ABSENT") ? "warning" : "good");
  const linkRows = $("a[href]").toArray().map(el => {
    const href = absolute($(el).attr("href") || "", url), rel = ($(el).attr("rel") || "").toLowerCase();
    let kind = "Autre protocole";
    try { const u = new URL(href); if (/^https?:$/.test(u.protocol)) kind = u.hostname.replace(/^www\./, "") === new URL(url).hostname.replace(/^www\./, "") ? "Interne" : "Externe"; } catch { /* keep malformed destinations visible */ }
    return [href, text($(el).text()) || $(el).attr("aria-label") || $(el).find("img").attr("alt") || "Sans libellé détecté", kind, rel || "Non déclaré", yes(/\bnofollow\b/.test(rel)), yes(/\bsponsored\b/.test(rel)), $(el).attr("target") || "Même fenêtre"];
  });
  section("links", "Tous les liens de la page", ["Destination", "Libellé", "Type", "Rel", "Nofollow", "Sponsored", "Cible"], linkRows,
    `${linkRows.length} liens (occurrences) ; ${new Set(linkRows.map(row => row[0])).size} destinations distinctes ; ${linkRows.filter(row => row[2] === "Interne").length} internes ; ${linkRows.filter(row => row[2] === "Externe").length} externes. Les paramètres d’URL sont conservés. Cet inventaire ne vérifie pas le statut HTTP des destinations.`);
  section("social", "Profils sociaux liés et partage", ["Profil", "Libellé"], linkRows.filter(row => { try { return socials.test(new URL(row[0]).hostname); } catch { return false; } }).map(row => row.slice(0, 2)), "Profils détectés dans les liens du HTML. Open Graph et cartes Twitter/X figurent dans les métadonnées. Un profil absent ne constitue pas automatiquement un problème SEO.");
  const schemaRows = $("script[type='application/ld+json' i]").toArray().map((el, i) => {
    const source = $(el).text();
    try { const parsed: unknown = JSON.parse(source); const types = new Set<string>(); const walk = (v: unknown) => { if (!v || typeof v !== "object") return; for (const [k, value] of Object.entries(v)) { if (k === "@type") for (const type of Array.isArray(value) ? value : [value]) if (typeof type === "string") types.add(type); walk(value); } }; walk(parsed); return [String(i + 1), [...types].join(", ") || "Type non déclaré", "JSON lisible", JSON.stringify(parsed, null, 2)]; }
    catch { return [String(i + 1), "Non déterminé", "JSON invalide", source]; }
  });
  section("schema", "Données structurées JSON-LD et identité", ["Bloc", "Types", "Syntaxe", "Contenu complet"], schemaRows, "Tous les blocs sont conservés. Une syntaxe JSON correcte ne garantit ni conformité Schema.org, ni résultat enrichi, ni citation par une IA.", schemaRows.some(row => row[2] === "JSON invalide") ? "warning" : "unknown");
  const scripts = $("script").toArray().filter(el => $(el).attr("type") !== "application/ld+json");
  const trackers: [string, RegExp][] = [["Google Analytics / balise Google", /googletagmanager\.com\/gtag|google-analytics\.com|gtag\(/i], ["Google Tag Manager", /googletagmanager\.com\/gtm|GTM-[A-Z0-9]+/], ["Vercel Analytics", /_vercel\/insights|va\.vercel-scripts/], ["Meta Pixel", /connect\.facebook\.net|fbq\(/], ["Microsoft Clarity", /clarity\.ms\/tag/], ["Matomo", /matomo\.php|matomo\.js/]];
  section("tracking", "Outils de mesure détectables", ["Outil", "Observation"], trackers.map(([label, re]) => [label, re.test(html) ? "Signature trouvée" : "Non détecté dans le HTML initial"]), "La détection ne prouve pas qu’un outil fonctionne. Consentement, chargement différé ou JavaScript peuvent masquer des outils. Aucun pixel n’est recommandé automatiquement.");
  section("scripts", "Scripts déclarés et éléments embarqués", ["Élément", "Source / type", "Chargement"], [
    ...scripts.map(el => ["Script", $(el).attr("src") ? absolute($(el).attr("src")!, url) : `Intégré (${$(el).text().length} caractères) · ${$(el).attr("type") || "JavaScript"}`, [$(el).attr("async") !== undefined ? "async" : "", $(el).attr("defer") !== undefined ? "defer" : ""].filter(Boolean).join(" ") || "Défaut"]),
    ...$("iframe,object,embed").toArray().map(el => [el.tagName, absolute($(el).attr("src") || $(el).attr("data") || "", url), $(el).attr("loading") || "Défaut"]),
    ["Styles intégrés", String($("style").length) + " blocs", ""], ["Attributs style", String($("[style]").length), ""],
  ], "Inventaire HTML uniquement : les requêtes réellement chargées sont détaillées par Lighthouse. Les styles intégrés ne sont pas, à eux seuls, une erreur.");
  const body = $("body").clone(); body.find("script,style,noscript,template,nav,header,footer").remove();
  // Minified HTML has no whitespace between adjacent block elements.
  // Restore boundaries so headings and paragraphs cannot form invented words.
  body.find("p,h1,h2,h3,h4,h5,h6,li,div,section,article,td,th,blockquote,br,hr,dt,dd,figure,figcaption").before(" ").after(" ");
  const content = text(body.text()), tokens = content.toLocaleLowerCase("fr").match(/[\p{L}\p{N}]+(?:['’-][\p{L}\p{N}]+)*/gu) || [];
  const stop = new Set("avec dans pour par une les des du de le la et ou au aux sur ce ces cette que qui en est sont un vos votre notre nous vous ses son sa se plus pas ne à il elle ils elles comme mais aussi être tout tous".split(" "));
  const frequencies = new Map<string, number>();
  for (const token of tokens) if (token.length >= 3 && !stop.has(token)) frequencies.set(token, (frequencies.get(token) || 0) + 1);
  section("terms", "Contenu textuel et vocabulaire", ["Terme", "Occurrences", "Dans le titre", "Dans la description", "Dans un titre H1–H6"], [...frequencies].sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0], "fr")).map(([term, count]) => [term, String(count), yes(title.toLocaleLowerCase("fr").includes(term)), yes(description.toLocaleLowerCase("fr").includes(term)), yes(headings.some(row => row[2].toLocaleLowerCase("fr").includes(term)))]), `${tokens.length} mots dans le contenu HTML hors navigation, en-tête et pied de page ; ${frequencies.size} termes distincts après exclusion des mots courants et termes de moins de 3 caractères. Tous les termes retenus sont listés. Fréquence descriptive, pas recherche de mots-clés ni preuve de positionnement.`);
  return { sections };
}
