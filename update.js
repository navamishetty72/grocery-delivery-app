const fs = require('fs');

let content = fs.readFileSync('./src/data/products.ts', 'utf8');

// Update prices (add 100)
content = content.replace(/price:\s*([\d\.]+)/g, (match, p1) => {
    return `price: ${(parseFloat(p1) + 100).toFixed(2)}`;
});

content = content.replace(/originalPrice:\s*([\d\.]+)/g, (match, p1) => {
    return `originalPrice: ${(parseFloat(p1) + 100).toFixed(2)}`;
});

// Update product images
content = content.replace(/name:\s*'([^']+)'([\s\S]*?)emoji:\s*'[^']+'/g, (match, name, middle) => {
    let query = name.replace(/\s+/g, ',').toLowerCase();
    return `name: '${name}'${middle}emoji: 'https://loremflickr.com/400/400/${query},food/all'`;
});

// Update category emojis
const categories = ['All','Fruits','Vegetables','Dairy','Beverages','Snacks','Bakery','Meat','Frozen'];
categories.forEach(cat => {
    let query = cat.toLowerCase();
    const regex = new RegExp(`(${cat}:\\s*)'[^']+'`, 'g');
    content = content.replace(regex, `$1'https://loremflickr.com/100/100/${query},grocery/all'`);
});

// Update deals emojis
content = content.replace(/title:\s*'([^']+)'([\s\S]*?)emoji:\s*'[^']+'/g, (match, title, middle) => {
    return `title: '${title}'${middle}emoji: 'https://loremflickr.com/100/100/sale,offer/all'`;
});

fs.writeFileSync('./src/data/products.ts', content);
console.log("Updated prices and images.");
