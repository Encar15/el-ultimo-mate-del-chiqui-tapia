const fs = require("fs");

if (!fs.existsSync("game-index.js")) {
  console.log("No se encontró game-index.js");
  process.exit(0);
}

let code = fs.readFileSync("game-index.js", "utf8");

// 1. Invocar el método textSize() en Wollok mediante n.send("textSize", o)
const s1 = 'i=t(n,o,"textColor")';
const r1 =
  'i=t(n,o,"textColor"),ts=(()=>{try{const r=n.send("textSize",o);return r?.innerNumber??o.get("tamanioDeLetra")?.innerNumber}catch(e){return o.get("tamanioDeLetra")?.innerNumber}})()';

// 2. Incluir textSize en el objeto visual devuelto
const s2 = "textColor:i,message:p,messageTime:a";
const r2 = "textColor:i,textSize:ts,message:p,messageTime:a";

// 3. Desestructurar textSize:f en el loop de renderizado
const s3 = "text:p,textColor:a}=i";
const r3 = "text:p,textColor:a,textSize:f}=i";

// 4. Pasar f*2 a T (porque T multiplica por 0.5 internamente) cuando f > 0
const s4 = "p&&T(o,p,l,b,S,a)";
const r4 = "p&&T(o,p,l,b,Number(f)>0?Number(f)*2:S,a)";

code = code
  .replaceAll(s1, r1)
  .replaceAll(s2, r2)
  .replaceAll(s3, r3)
  .replaceAll(s4, r4);

fs.writeFileSync("game-index.js", code, "utf8");
console.log("Parche v8 (n.send textSize) aplicado");