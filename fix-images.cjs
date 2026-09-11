const fs = require('fs');

let content = fs.readFileSync('src/data/vehicles.ts', 'utf-8');

const importRegex = /import\s+([a-zA-Z0-9_]+)\s+from\s+["']@\/assets\/([^"']+)["'];\n/g;

const imageMap = {};
let match;
while ((match = importRegex.exec(content)) !== null) {
  imageMap[match[1]] = match[2];
}

content = content.replace(importRegex, '');

// Insert the glob snippet right after the first non-import line
const globSnippet = `
const images = import.meta.glob('/src/assets/*.{png,jpg,jpeg,svg,webp}', { eager: true, import: 'default' });

export const getVehicleImage = (filename: string) => {
  const path = \`/src/assets/\${filename}\`;
  return (images[path] as string) || "/placeholder.svg";
};
`;

content = content.replace(/(export type VehicleStatus)/, globSnippet + '\n$1');

// Replace image: varName with image: getVehicleImage("filename")
for (const [varName, filename] of Object.entries(imageMap)) {
  const regex = new RegExp(`image:\\s*${varName}\\s*,`, 'g');
  content = content.replace(regex, `image: getVehicleImage("${filename}"),`);
}

fs.writeFileSync('src/data/vehicles.ts', content);
console.log("Fixed vehicles.ts!");
