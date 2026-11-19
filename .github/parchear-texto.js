const fs = require("fs");

if (!fs.existsSync("game-index.js")) {
  console.log("No se encontró game-index.js");
  process.exit(0);
}

let code = fs.readFileSync("game-index.js", "utf8");

// 1. Inyectar lectura de textSize() en get visuals()
code = code.replaceAll(
  'i=t(n,o,"textColor")',
  'i=t(n,o,"textColor"),ts=Number(t(n,o,"textSize"))||null'
);
code = code.replaceAll(
  "textColor:i,message:p,messageTime:a",
  "textColor:i,textSize:ts,message:p,messageTime:a"
);

// 2. Aplicar o.textSize(i.textSize) antes de dibujar el texto T(o,p,l,b,S,a)
code = code.replace(
  "p&&T(o,p,l,b,S,a)",
  "p&&(i.textSize&&o.textSize(i.textSize),T(o,p,l,b,S,a))"
);

fs.writeFileSync("game-index.js", code, "utf8");
console.log("Parche aplicado correctamente en game-index.js");