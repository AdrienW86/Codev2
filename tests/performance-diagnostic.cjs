const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");
const ts = require("typescript");
const moduleExports = {};
const code = ts.transpileModule(fs.readFileSync("src/lib/performance/diagnostic.ts", "utf8"), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
}).outputText;
vm.runInNewContext(code, { exports: moduleExports, require() { throw new Error("Unexpected runtime dependency"); } });
const build = moduleExports.buildPerformanceDiagnostic;
const base = {
  url: "https://example.fr/", strategy: "mobile", scores: { performance: 42, seo: 58, accessibility: 95, bestPractices: 93 },
  lab: { lcp: { value: 4800, display: "4.8 s" }, cls: { value: 0.17, display: "0.17" },
    tbt: { value: 750, display: "750 ms" }, fcp: { value: 1100, display: "1.1 s" },
    speedIndex: { value: 2000, display: "2 s" } },
  field: { lcpMs: null, inpMs: null, cls: null, scope: "unavailable" },
  opportunities: [{ id: "uses-optimized-images", title: "Optimiser les images", description: "Images", display: "", savingsMs: 1800 }],
};
const result = build(base);
assert(result.recommendations.length >= 4);
assert(result.recommendations.some(item => item.id === "lcp" && item.priority === "haute"));
assert(result.recommendations.some(item => item.id === "score:seo" && item.service.href === "/referencement"));
assert(result.recommendations.some(item => item.id === "psi:uses-optimized-images" && item.service.href === "/creation-site"));
assert(result.strengths.some(value => value.includes("Accessibilité")));
assert(result.methodology.some(value => value.includes("CrUX")));
assert(result.recommendations.every(item => item.evidence && item.action && item.service.href.startsWith("/")));
const empty = build({
  ...base, scores: { performance: null, seo: null, accessibility: null, bestPractices: null },
  lab: Object.fromEntries(Object.entries(base.lab).map(([key]) => [key, { value: null, display: "Indisponible" }])),
  opportunities: [],
});
assert.equal(empty.recommendations.length, 0);
assert.equal(empty.primaryService, null);
assert(!empty.summary.includes("0/100"));
console.log("Performance diagnostics: metrics, real offers, null handling and evidence OK");
