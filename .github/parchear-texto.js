const fs = require("fs");

if (!fs.existsSync("game-index.js")) {
  console.log("No se encontró game-index.js");
  process.exit(0);
}

let code = fs.readFileSync("game-index.js", "utf8");

// 1. Extraer textSize() en get visuals()
code = code.replaceAll(
  'i=t(n,o,"textColor")',
  'i=t(n,o,"textColor"),ts=t(n,o,"textSize")'
);
code = code.replaceAll(
  "textColor:i,message:p,messageTime:a",
  "textColor:i,textSize:ts,message:p,messageTime:a"
);

// 2. Desestructurar textSize:f en el loop de visuals
code = code.replaceAll(
  "text:p,textColor:a}=i",
  "text:p,textColor:a,textSize:f}=i"
);

// 3. Pasar f (si existe y es > 0) como 5to argumento de T (tamaño de fuente) en vez de S
code = code.replaceAll(
  "p&&T(o,p,l,b,S,a)",
  "p&&T(o,p,l,b,Number(f)>0?Number(f):S,a)"
);

fs.writeFileSync("game-index.js", code, "utf8");
console.log("Parche v6 aplicado (argumento de tamaño en T)");