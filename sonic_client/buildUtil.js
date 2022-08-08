const fs = require("fs");
const filePath = "build/package.json";

console.log(`=== read ${filePath} ===`);
let data = JSON.parse(fs.readFileSync(filePath));
delete data.dependencies;
data.main = "main.js"
data = JSON.stringify(data, null, 4);

console.log(`=== overwrite ${filePath} ===`);
fs.writeFileSync(filePath, data);

console.log("done...");
