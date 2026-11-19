const fs = require("fs");

if (!fs.existsSync("game-index.js")) {
  console.log("No se encontró game-index.js");
  process.exit(0);
}

const code = fs.readFileSync("game-index.js", "utf8");

// 1. Ver el código exacto de c.forEach(...) donde se dibujan los mensajes
const idxForEach = code.indexOf("c.forEach");
console.log("=== BLOQUE c.forEach ===");
console.log(code.slice(Math.max(0, idxForEach - 100), idxForEach + 600));

// 2. Ver dónde se define function v( o function x( cerca de T(n,o,e,c,i,t)
const idxT = code.indexOf("function T(n,o,e,c,i,t)");
console.log("=== ALREDEDOR DE function T ===");
console.log(code.slice(Math.max(0, idxT - 900), idxT + 150));