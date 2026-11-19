const fs = require("fs");

if (!fs.existsSync("game-index.js")) {
  console.log("No se encontró game-index.js");
  process.exit(0);
}

let code = fs.readFileSync("game-index.js", "utf8");

// Diagnóstico: ver qué hace la función T( que dibuja el texto
const idxT = code.indexOf("function T(");
if (idxT !== -1) {
  console.log("=== FUNCION T ===");
  console.log(code.slice(idxT, idxT + 600));
}

// 1. Leer textSize() de forma segura (soporta tanto string/number JS como RuntimeObject de Wollok)
const extractor = `
  i=t(n,o,"textColor"),
  ts=(()=>{const v=t(n,o,"textSize");return v&&typeof v==="object"?v.innerNumber:Number(v)||null})()
`.replace(/\n\s*/g, "");

code = code.replaceAll('i=t(n,o,"textColor")', extractor);
code = code.replaceAll(
  "textColor:i,message:p,messageTime:a",
  "textColor:i,textSize:ts,message:p,messageTime:a"
);

// 2. Pasar i.textSize como 7mo parámetro a T(...) y aplicarlo DENTRO de T después de su textSize por defecto
code = code.replace(
  "p&&T(o,p,l,b,S,a)",
  "p&&T(o,p,l,b,S,a,i.textSize)"
);

code = code.replace(
  /function T\(([^)]+)\)\{/,
  "function T($1,customSize){"
);

// Si adentro de T llama a e.textSize(...) o similar antes de .text(, lo pisamos justo antes de .text(
if (idxT !== -1) {
  const cuerpoT = code.slice(idxT, idxT + 600);
  const matchTextCall = cuerpoT.match(/([a-zA-Z0-9_$]+)\.text\(/);
  if (matchTextCall) {
    const p5var = matchTextCall[1];
    const cuerpoParcheado = cuerpoT.replace(
      `${p5var}.text(`,
      `customSize&&${p5var}.textSize(customSize),${p5var}.text(`
    );
    code = code.slice(0, idxT) + cuerpoParcheado + code.slice(idxT + 600);
  }
}

fs.writeFileSync("game-index.js", code, "utf8");
console.log("Parche v2 aplicado");