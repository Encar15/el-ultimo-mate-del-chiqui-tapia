const fs = require("fs");

if (!fs.existsSync("game-index.js")) {
  console.log("No se encontró game-index.js");
  process.exit(0);
}

let code = fs.readFileSync("game-index.js", "utf8");

code = code.replaceAll(
  'i=t(n,o,"textColor")',
  'i=t(n,o,"textColor"),ts=t(n,o,"textSize")'
);
code = code.replaceAll(
  "textColor:i,message:p,messageTime:a",
  "textColor:i,textSize:ts,message:p,messageTime:a"
);
code = code.replaceAll(
  "p&&T(o,p,l,b,S,a)",
  `p&&(()=>{const sz=Number(i.textSize);if(sz>0){const prev=o.textSize.bind(o);prev(sz);o.textSize=()=>{};T(o,p,l,b,S,a);o.textSize=prev;}else{T(o,p,l,b,S,a);}})()`
);

fs.writeFileSync("game-index.js", code, "utf8");
console.log("Parche simple OK");