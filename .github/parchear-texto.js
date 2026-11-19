const fs = require("fs");

if (!fs.existsSync("game-index.js")) {
  console.log("No se encontró game-index.js");
  process.exit(0);
}

let code = fs.readFileSync("game-index.js", "utf8");

// 1. Extraer textSize() o tamanioDeLetra en get visuals()
const s1 = 'i=t(n,o,"textColor")';
const r1 =
  'i=t(n,o,"textColor"),ts=(()=>{try{const r=n.send("textSize",o);return r?.innerNumber??o.get("tamanioDeLetra")?.innerNumber}catch(e){return o.get("tamanioDeLetra")?.innerNumber}})()';

const s2 = "textColor:i,message:p,messageTime:a";
const r2 = "textColor:i,textSize:ts,message:p,messageTime:a";

// 2. Desestructurar textSize:f en el loop de visuals
const s3 = "text:p,textColor:a}=i";
const r3 = "text:p,textColor:a,textSize:f}=i";

// 3. Aplicar tamaño en T(...) para visuales con text()
const s4 = "p&&T(o,p,l,b,S,a)";
const r4 = "p&&T(o,p,l,b,Number(f)>0?Number(f)*2:S,a)";

// 4. Adjuntar textSize al globo de game.say(...) y aplicarlo al dibujarlo en c.forEach
const s5 = "c.push(v(r,l,b,_(e,t)?.height))";
const r5 = "c.push(Object.assign(v(r,l,b,_(e,t)?.height),{textSize:Number(f)>0?Number(f):40}))";

const s6 = "c.forEach((i=o,n=>{";
const r6 =
  "c.forEach((i=o,n=>{if(i&&i.textSize){const prev=n.textSize.bind(n);prev(i.textSize);n.textSize=()=>{};setTimeout(()=>{n.textSize=prev},0);}";

code = code
  .replaceAll(s1, r1)
  .replaceAll(s2, r2)
  .replaceAll(s3, r3)
  .replaceAll(s4, r4)
  .replaceAll(s5, r5)
  .replaceAll(s6, r6);

fs.writeFileSync("game-index.js", code, "utf8");
console.log("Parche v9 (text + game.say) aplicado");