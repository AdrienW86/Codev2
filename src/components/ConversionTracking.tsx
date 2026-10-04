"use client";

import { useEffect, useState } from "react";
import { Analytics } from "@vercel/analytics/next";
import { configureTracking, knownCtaLabel, knownPath, knownService, sanitizeAnalyticsEvent, trackContactCta, trackConversion, type TrackingConfig } from "@/lib/analytics";

function locationOf(link: HTMLAnchorElement) {
  if (link.closest("header:not(main header)")) return "header";
  if (link.closest("footer")) return "footer";
  if (link.closest("article")) return "article";
  const section = link.closest("section");
  if (section?.querySelector("h1")) return "hero";
  if (section && section === [...document.querySelectorAll("main section")].at(-1)) return "final";
  return "content";
}

export default function ConversionTracking({ config }: { config: TrackingConfig }) {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    configureTracking(config);
    setReady(true);
    const onClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0) return;
      const link = event.target instanceof Element ? event.target.closest<HTMLAnchorElement>("a[href]") : null;
      if (!link) return;
      const source_path = knownPath(window.location.pathname);
      if (!source_path) return;
      const location = locationOf(link);
      const sourceService = config.moneyPages[source_path] ?? (source_path === "/contact" ? knownService(new URLSearchParams(window.location.search).get("service")) : undefined);
      const common = { source_path, location, service: sourceService };
      // Never transmit the phone number, mailbox, free-form link text or form fields.
      if (link.protocol === "tel:") { trackConversion("phone_click", common); return; }
      if (link.protocol === "mailto:") { trackConversion("email_click", common); return; }
      const url = new URL(link.href);
      if (url.origin !== window.location.origin) {
        const project = config.projects?.[`${url.origin}${url.pathname}`];
        if (source_path === "/realisations" && project && link.closest("main")) trackConversion("external_project_click", { ...common, project_slug: project });
        return;
      }
      if (url.pathname === "/contact" && link.closest("main")) {
        trackContactCta({ ...common, cta_label: knownCtaLabel(link.textContent ?? ""), service: knownService(url.searchParams.get("service")) ?? sourceService, destination_path: "/contact" });
      } else if (url.pathname === "/realisations" && link.closest("main") && (sourceService || ["/", "/solutions", "/ressources"].includes(source_path) || Object.hasOwn(config.articles, source_path))) {
        trackConversion("realization_click", { ...common, project_slug: config.projectAnchors?.[url.hash.slice(1)], destination_path: "/realisations" });
      } else if (Object.hasOwn(config.articles, source_path)) {
        const service = config.moneyPages[url.pathname];
        if (service && config.articles[source_path].includes(url.pathname)) trackConversion("article_to_service_click", { ...common, service, destination_service: service, article_slug: source_path.slice("/ressources/".length), destination_path: url.pathname });
      }
    };
    // Capture runs before Next Link changes route; no preventDefault, no delayed navigation.
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [config]);
  return ready ? <Analytics beforeSend={sanitizeAnalyticsEvent} /> : null;
}
