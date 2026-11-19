const fs = require("fs");

if (!fs.existsSync("game-index.js")) {
  console.log("No se encontró game-index.js");
  process.exit(0);
}

let code = fs.readFileSync("game-index.js", "utf8");

// Ver definición de la función t( que lee propiedades/métodos del objeto Wollok
const idxTfn = code.indexOf('t(n,o,"text")');
if (idxTfn !== -1) {
  console.log("Contexto t(n,o,prop):", code.slice(Math.max(0, idxTfn - 500), idxTfn + 120));
}

// 1. Leer textSize igual que text / textColor
code = code.replaceAll(
  'i=t(n,o,"textColor")',
  'i=t(n,o,"textColor"),ts=t(n,o,"textSize")'
);
code = code.replaceAll(
  "textColor:i,message:p,messageTime:a",
  "textColor:i,textSize:ts,message:p,messageTime:a"
);

// 2. Forzar el tamaño en la instancia p5 (o) justo antes de T(o,p,l,b,S,a)
// y bloquear o.textSize temporalmente para que T no lo pise
code = code.replaceAll(
  "p&&T(o,p,l,b,S,a)",
  `p&&(()=>{const sz=Number(i.textSize);if(sz>0){const prev=o.textSize.bind(o);prev(sz);o.textSize=()=>{};T(o,p,l,b,S,a);o.textSize=prev;}else{T(o,p,l,b,S,a);}})()`
);

fs.writeFileSync("game-index.js", code, "utf8");
console.log("Parche v4 aplicado");