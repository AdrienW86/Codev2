/** One presentation model shared by the browser and PDF: no hidden row limits. */
export type FactStatus = "good" | "warning" | "critical" | "unknown";
export type FactSection = {
  id: string;
  title: string;
  status: FactStatus;
  note: string;
  columns: string[];
  rows: string[][];
};
export type PageFacts = { sections: FactSection[] };
export const factStatusLabels: Record<FactStatus, string> = {
  good: "Conforme au contrôle", warning: "Action à prévoir", critical: "Urgent", unknown: "Information / non mesuré",
};
