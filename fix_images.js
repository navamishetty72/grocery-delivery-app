const fs = require('fs');

// Read the products file
let content = fs.readFileSync('./src/data/products.ts', 'utf8');

// Replace product images with Unsplash source URLs
content = content.replace(/name:\s*'([^']+)'([\s\S]*?)emoji:\s*'[^']+'/g, (match, name, middle) => {
  const query = encodeURIComponent(name + ' food');
  return `name: '${name}'${middle}emoji: 'https://source.unsplash.com/400x400/?${query}'`;
});

// Replace category emojis
const categories = ['All','Fruits','Vegetables','Dairy','Beverages','Snacks','Bakery','Meat','Frozen'];
categories.forEach(cat => {
  const query = encodeURIComponent(cat + ' grocery');
  const regex = new RegExp(`(${cat}:\\s*)'[^']+'`, 'g');
  content = content.replace(regex, `$1'https://source.unsplash.com/100x100/?${query}'`);
});

// Replace deals emojis
content = content.replace(/title:\s*'([^']+)'([\s\S]*?)emoji:\s*'[^']+'/g, (match, title, middle) => {
  const query = encodeURIComponent(title + ' promotion');
  return `title: '${title}'${middle}emoji: 'https://source.unsplash.com/100x100/?${query}'`;
});

fs.writeFileSync('./src/data/products.ts', content);
