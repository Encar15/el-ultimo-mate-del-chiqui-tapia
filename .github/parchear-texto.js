const fs = require("fs");

if (!fs.existsSync("game-index.js")) {
  console.log("No se encontró game-index.js");
  process.exit(0);
}

let code = fs.readFileSync("game-index.js", "utf8");

// Mostrar un trozo más grande alrededor de T(o,p,l,b,S,a) para ver qué hace T
const idxCall = code.indexOf("T(o,p,l,b,S,a)");
if (idxCall !== -1) {
  console.log("=== ANTES DE T(o,p,l,b,S,a) ===");
  console.log(code.slice(Math.max(0, idxCall - 900), idxCall + 100));
}

// Extraer textSize intentando sacar innerNumber si es objeto, o número directo
const extractor = `i=t(n,o,"textColor"),ts=(()=>{try{const v=t(n,o,"textSize");if(v==null)return null;if(typeof v==="object"&&"innerNumber"in v)return Number(v.innerNumber)||null;return Number(v)||null}catch(e){return null}})()`;

code = code.replaceAll('i=t(n,o,"textColor")', extractor);
code = code.replaceAll(
  "textColor:i,message:p,messageTime:a",
  "textColor:i,textSize:ts,message:p,messageTime:a"
);

// Aplicar tamaño antes de T y bloquear o.textSize mientras corre T
code = code.replaceAll(
  "p&&T(o,p,l,b,S,a)",
  `p&&(()=>{const sz=Number(i.textSize);if(sz>0){const prev=o.textSize.bind(o);prev(sz);o.textSize=()=>{};T(o,p,l,b,S,a);o.textSize=prev;}else{T(o,p,l,b,S,a);}})()`
);

fs.writeFileSync("game-index.js", code, "utf8");
console.log("Parche v5 aplicado");