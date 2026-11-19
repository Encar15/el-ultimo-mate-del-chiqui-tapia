const fs = require("fs");

if (!fs.existsSync("game-index.js")) {
  console.log("No se encontró game-index.js");
  process.exit(0);
}

let code = fs.readFileSync("game-index.js", "utf8");

const s1 = 'i=t(n,o,"textColor")';
const r1 = 'i=t(n,o,"textColor"),ts=t(n,o,"textSize")';

const s2 = "textColor:i,message:p,messageTime:a";
const r2 = "textColor:i,textSize:ts,message:p,messageTime:a";

const s3 = "text:p,textColor:a}=i";
const r3 = "text:p,textColor:a,textSize:f}=i";

const s4 = "p&&T(o,p,l,b,S,a)";
const r4 =
  "p&&(()=>{const sz=Number(f)>0?Number(f):S;if(!window.__tsDebug){window.__tsDebug={f,S,sz,canvasW:o.width,canvasH:o.height};console.log('DEBUG textSize:',window.__tsDebug);}T(o,p,l,b,sz,a);})()";

code = code
  .replaceAll(s1, r1)
  .replaceAll(s2, r2)
  .replaceAll(s3, r3)
  .replaceAll(s4, r4);

fs.writeFileSync("game-index.js", code, "utf8");
console.log("Parche v7 con debug en consola aplicado");