import type { AuditResult } from "./audit";
import { buildActionPlan, buildInsights } from "./insights";

/** The PDF attachment and standalone export use the same complete source. */
export function auditExportJson(report:AuditResult):string {
  return JSON.stringify({...report,actionPlan:buildActionPlan(report),insights:buildInsights(report)},null,2);
}
export function auditExportName(report:AuditResult,extension:"pdf"|"json") {
  return `rapport-code-v-${new URL(report.url).hostname}-${report.strategy}.${extension}`;
}
export function downloadFile(blob:Blob,filename:string) {
  const url=URL.createObjectURL(blob);
  try {
    const a=document.createElement("a");a.href=url;a.download=filename;
    document.body.appendChild(a);a.click();a.remove();
  } finally {setTimeout(()=>URL.revokeObjectURL(url),10000);}
}
export function downloadAuditData(report:AuditResult) {
  downloadFile(new Blob([auditExportJson(report)],{type:"application/json;charset=utf-8"}),auditExportName(report,"json"));
}
