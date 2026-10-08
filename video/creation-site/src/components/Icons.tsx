// Pictogrammes au trait, dessinés pour le film (24 × 24, trait 1.8).
const base = { fill: "none", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" } as const;

export type IconName = "site" | "contact" | "crm" | "suivi" | "auto" | "search" | "mail" | "check";

export const Icon = ({ name, size, color }: { name: IconName; size: number; color: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" stroke={color} {...base}>
    {name === "site" && <><rect x="3" y="4.5" width="18" height="15" rx="2.5" /><path d="M3 9h18M7 13h6M7 16h4" /></>}
    {(name === "contact" || name === "mail") && <><rect x="3" y="5.5" width="18" height="13" rx="2.5" /><path d="m4 7 8 6 8-6" /></>}
    {name === "crm" && <><ellipse cx="12" cy="6" rx="7.5" ry="2.8" /><path d="M4.5 6v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V6M4.5 12v6c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8v-6" /></>}
    {name === "suivi" && <><rect x="4" y="3.5" width="16" height="17" rx="2.5" /><path d="m8 9 1.6 1.6L12.5 7.7M8 15l1.6 1.6 2.9-2.9M15 9.5h1.5M15 15.5h1.5" /></>}
    {name === "auto" && <><path d="M19.5 9A7.5 7.5 0 0 0 6 6.6L4.5 8M4.5 15A7.5 7.5 0 0 0 18 17.4l1.5-1.4" /><path d="M4.5 4v4h4M19.5 20v-4h-4" /></>}
    {name === "search" && <><circle cx="10.5" cy="10.5" r="6" /><path d="m15 15 5 5" /></>}
    {name === "check" && <path d="m5 12.5 4.5 4.5L19 7.5" />}
  </svg>
);
