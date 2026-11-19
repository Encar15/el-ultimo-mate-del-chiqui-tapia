const fs = require("fs");

let code = fs.readFileSync("game-index.js", "utf8");

// 1. Ver el contexto real alrededor de p&&T(o,p,l,b,S,a) para diagnóstico
const idxRender = code.indexOf("p&&T(o,p,l,b,S,a)");
console.log("Índice de renderizado:", idxRender);

// 2. Extraer textSize() desde Wollok usando el helper t(n, o, "textSize")
const extractor = `i=t(n,o,"textColor"),ts=(()=>{try{const v=t(n,o,"textSize");return v==null?null:(typeof v==="object"&&"innerNumber"in v?v.innerNumber:Number(v))||null}catch(e){return null}})()`;

code = code.replaceAll('i=t(n,o,"textColor")', extractor);
code = code.replaceAll(
  "textColor:i,message:p,messageTime:a",
  "textColor:i,textSize:ts,message:p,messageTime:a"
);

// 3. Interceptar o.textSize en la instancia de p5.js (o) durante T(...)
// Si i.textSize existe, bloqueamos que T(...) lo pise con un tamaño fijo
code = code.replace(
  "p&&T(o,p,l,b,S,a)",
  `p&&(()=>{
    if(i.textSize){
      const orig=o.textSize.bind(o);
      orig(i.textSize);
      o.textSize=()=>{};
      T(o,p,l,b,S,a);
      o.textSize=orig;
    }else{
      T(o,p,l,b,S,a);
    }
  })()`
);

fs.writeFileSync("game-index.js", code, "utf8");
console.log("Parche v3 aplicado correctamente");