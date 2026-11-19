const fs = require("fs");

const code = fs.readFileSync("game-index.js", "utf8");

const idxVisuals = code.indexOf('t(n,o,"textColor")');
console.log("=== ALREDEDOR DE get visuals ===");
console.log(code.slice(Math.max(0, idxVisuals - 400), idxVisuals + 300));

const idxCallT = code.indexOf("T(o,p,l,b,S,a)");
console.log("=== ALREDEDOR DE T(o,p,l,b,S,a) ===");
console.log(code.slice(Math.max(0, idxCallT - 600), idxCallT + 200));