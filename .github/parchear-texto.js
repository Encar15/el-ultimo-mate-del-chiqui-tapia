const fs = require("fs");

if (!fs.existsSync("game-index.js")) {
  console.error("No se encontró game-index.js");
  process.exit(1);
}

let code = fs.readFileSync("game-index.js", "utf8");

const patches = [
  // 1. Leer textSize() / tamanioDeLetra / fontSize del objeto Wollok en get visuals()
  [
    'i=t(n,o,"textColor")',
    'i=t(n,o,"textColor"),ts=(()=>{for(const m of["textSize","tamanioDeLetra","fontSize"]){try{const r=n.send(m,o);if(r&&typeof r.innerNumber==="number")return r.innerNumber}catch(e){}const f=o.get(m);if(f&&typeof f.innerNumber==="number")return f.innerNumber}return null})()',
  ],
  // 2. Guardar textSize en cada visual
  [
    "textColor:i,message:p,messageTime:a",
    "textColor:i,textSize:ts,message:p,messageTime:a",
  ],
  // 3. Desestructurar textSize:f en el loop de dibujado
  [
    "text:p,textColor:a}=i",
    "text:p,textColor:a,textSize:f}=i",
  ],
  // 4. Pasar size a x() desde T() para los objetos con text()
  [
    "function T(n,o,e,c,i,t){const s=.5*i;x(n,{text:o,position:{x:e+s,y:c-s},color:p(t)})}",
    "function T(n,o,e,c,i,t,sz){const s=.5*i;x(n,{text:o,position:{x:e+s,y:c-s},color:p(t),size:sz})}",
  ],
  [
    "p&&T(o,p,l,b,S,a)",
    "p&&T(o,p,l,b,S,a,Number(f)>0?Number(f):void 0)",
  ],
  // 5. Pasar textSize a los globos de game.say() y escalar su burbuja y fuente
  [
    "c.push(v(r,l,b,_(e,t)?.height))",
    "c.push({...v(r,l,b,_(e,t)?.height),textSize:Number(f)>0?Number(f):void 0})",
  ],
  [
    "function g(n,o){const e=150,c=150,i=n.textWidth(o.message);return{x:Math.min(i,e)+10,y:Math.min(35*Math.ceil(i/e)/2,c)+10}}",
    "function g(n,o){const sz=o.textSize||26,k=sz/12,e=150*k,c=150*k;n.textSize(sz);const i=n.textWidth(o.message);return{x:Math.min(i,e)+10,y:Math.min(35*k*Math.ceil(i/e)/2,c)+10}}",
  ],
  [
    "e=150,c=150;i.textSize(12)",
    "sz=n.textSize||26,e=150*(sz/12),c=150*(sz/12);i.textSize(sz)",
  ],
];

let allOk = true;
for (let idx = 0; idx < patches.length; idx++) {
  const [target, replacement] = patches[idx];
  const found = code.includes(target);
  console.log(`Parche ${idx + 1}/${patches.length}: ${found ? "OK" : "NO ENCONTRADO"}`);
  if (!found) allOk = false;
  code = code.replaceAll(target, replacement);
}

if (!allOk) {
  console.error("Algún patrón no coincidió en game-index.js");
  process.exit(1);
}

fs.writeFileSync("game-index.js", code, "utf8");
console.log("Todos los parches aplicados correctamente.");