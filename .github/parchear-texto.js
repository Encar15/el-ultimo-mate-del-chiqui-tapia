const fs = require("fs");

if (!fs.existsSync("game-index.js")) {
  console.log("No se encontró game-index.js");
  process.exit(0);
}

let code = fs.readFileSync("game-index.js", "utf8");

// Ver definición de x( para saber qué toca la fuente
const idxX = code.indexOf("function x(");
if (idxX !== -1) {
  console.log("=== FUNCION x ===");
  console.log(code.slice(idxX, idxX + 450));
}

const s1 = 'i=t(n,o,"textColor")';
const r1 = 'i=t(n,o,"textColor"),ts=t(n,o,"textSize")';

const s2 = "textColor:i,message:p,messageTime:a";
const r2 = "textColor:i,textSize:ts,message:p,messageTime:a";

const s3 = "text:p,textColor:a}=i";
const r3 = "text:p,textColor:a,textSize:f}=i";

const s4 = "p&&T(o,p,l,b,S,a)";
const r4 = "p&&T(o,p,l,b,Number(f)>0?Number(f):S,a)";

console.log("Matches:", {
  m1: code.includes(s1),
  m2: code.includes(s2),
  m3: code.includes(s3),
  m4: code.includes(s4),
});

code = code
  .replaceAll(s1, r1)
  .replaceAll(s2, r2)
  .replaceAll(s3, r3)
  .replaceAll(s4, r4);

fs.writeFileSync("game-index.js", code, "utf8");