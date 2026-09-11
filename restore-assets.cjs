const fs = require('fs');
const path = require('path');

const distDir = path.join(__dirname, 'dist', 'assets');
const srcDir = path.join(__dirname, 'src', 'assets');

if (!fs.existsSync(srcDir)) {
  fs.mkdirSync(srcDir, { recursive: true });
}

const files = fs.readdirSync(distDir);

for (const file of files) {
  // Only process images (and index.css/index.js we can skip, but regex handles it)
  if (file.match(/\.(png|jpe?g|svg)$/)) {
    // Vite hash is usually -[hash8].ext
    // e.g. argo-drive-2022-ey_mU-ta.jpg
    const newName = file.replace(/-[A-Za-z0-9_-]{8}\.(png|jpe?g|svg)$/, '.$1');
    fs.copyFileSync(path.join(distDir, file), path.join(srcDir, newName));
  }
}
console.log("Restored assets!");
