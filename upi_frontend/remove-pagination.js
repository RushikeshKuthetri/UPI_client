const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    const dirPath = path.join(dir, f);
    const isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
  });
}

walkDir('./src/pages', (filePath) => {
  if (filePath.endsWith('.jsx') || filePath.endsWith('.js')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    // Remove Pagination imports
    content = content.replace(/import\s+Pagination\s+from\s+['"].*?Pagination.*['"];?\r?\n/g, '');
    
    // Remove <Pagination /> or <Pagination></Pagination>
    content = content.replace(/<Pagination\s*\/>/g, '');
    content = content.replace(/<Pagination>\s*<\/Pagination>/g, '');

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log(`Updated ${filePath}`);
    }
  }
});
