const fs = require("fs");

if (!fs.existsSync("game-index.js")) {
  console.log("No se encontró game-index.js");
  process.exit(0);
}

let code = fs.readFileSync("game-index.js", "utf8");

const extractor = `i=t(n,o,"textColor"),ts=(()=>{try{const v=t(n,o,"textSize");return v==null?null:(typeof v==="object"&&"innerNumber"in v?v.innerNumber:Number(v))||null}catch(e){return null}})()`;

const c1 = code.replaceAll('i=t(n,o,"textColor")', extractor);
const c2 = c1.replaceAll(
  "textColor:i,message:p,messageTime:a",
  "textColor:i,textSize:ts,message:p,messageTime:a"
);
const c3 = c2.replace(
  "p&&T(o,p,l,b,S,a)",
  `p&&(()=>{if(i.textSize){const orig=o.textSize.bind(o);orig(i.textSize);o.textSize=()=>{};T(o,p,l,b,S,a);o.textSize=orig;}else{T(o,p,l,b,S,a);}})()`
);

console.log("Cambió extractor textColor?:", c1 !== code);
console.log("Cambió objeto visual?:", c2 !== c1);
console.log("Cambió llamada a T(...)?:", c3 !== c2);

const idx = c3.indexOf("textSize:ts");
if (idx !== -1) {
  console.log("Fragmento final:", c3.slice(Math.max(0, idx - 120), idx + 320));
}

fs.writeFileSync("game-index.js", c3, "utf8");