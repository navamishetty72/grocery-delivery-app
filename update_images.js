const fs = require('fs');

let content = fs.readFileSync('./src/data/products.ts', 'utf8');

// Replace Beef Ribeye with Mutton Curry Cut
content = content.replace(
  /\{ id: 42, name: 'Beef Ribeye',[\s\S]*?bgColor: '[^']+' \},/g,
  `{ id: 42, name: 'Mutton Curry Cut', category: 'Meat', price: 124.99, emoji: 'https://loremflickr.com/400/400/mutton,meat/all', rating: 4.8, reviews: 189, weight: '500g', badge: 'hot', inStock: true, description: 'Fresh tender mutton, perfectly cut for curries.', bgColor: 'linear-gradient(135deg,#1a0000,#2d0000)' },`
);

// We need to fix the image keywords for everything to be highly specific and single-focus to avoid things like "baby"
const keywordMap = {
    'Fresh Strawberries': 'strawberry',
    'Organic Mangoes': 'mango',
    'Blueberries Pack': 'blueberries',
    'Watermelon Whole': 'watermelon',
    'Avocados': 'avocado',
    'Grapes (Green)': 'grapes',
    'Pineapple': 'pineapple',
    'Dragon Fruit': 'dragonfruit',
    'Baby Spinach': 'spinach',
    'Broccoli Head': 'broccoli',
    'Cherry Tomatoes': 'tomatoes',
    'Rainbow Peppers': 'bellpeppers',
    'Purple Carrots': 'carrots',
    'Mushroom Mix': 'mushrooms',
    'Sweet Corn': 'corn',
    'Cucumber': 'cucumber',
    'Greek Yogurt': 'yogurt',
    'Artisan Cheese': 'cheese',
    'Organic Butter': 'butter',
    'Fresh Cream': 'cream',
    'Farm Eggs': 'eggs',
    'Mozzarella': 'mozzarella',
    'Cold Brew Coffee': 'coffee',
    'Green Juice': 'juice',
    'Sparkling Water': 'water',
    'Mango Smoothie': 'smoothie',
    'Kombucha': 'kombucha',
    'Protein Shake': 'shake',
    'Dark Chocolate': 'chocolate',
    'Mixed Nuts': 'nuts',
    'Potato Chips': 'chips',
    'Granola Bars': 'granola',
    'Popcorn': 'popcorn',
    'Rice Crackers': 'crackers',
    'Sourdough Loaf': 'sourdough',
    'Croissants': 'croissant',
    'Blueberry Muffins': 'muffin',
    'Bagels': 'bagel',
    'Cinnamon Rolls': 'cinnamonroll',
    'Salmon Fillet': 'salmon',
    'Chicken Breast': 'chicken',
    'Mutton Curry Cut': 'mutton',
    'Shrimp (Large)': 'shrimp',
    'Açaí Bowls': 'acai',
    'Veggie Pizza': 'pizza',
    'Ice Cream Tub': 'icecream',
    'Frozen Waffles': 'waffles',
    'Edamame': 'edamame'
};

content = content.replace(/name:\s*'([^']+)'([\s\S]*?)emoji:\s*'[^']+'/g, (match, name, middle) => {
    let kw = keywordMap[name] || name.split(' ')[0].toLowerCase();
    return `name: '${name}'${middle}emoji: 'https://loremflickr.com/400/400/${kw},food/all'`;
});

// Update Deals
content = content.replace(
  /\{ id: 1, title: 'Buy 2 Get 1 Free', subtitle: 'On all Dairy products', emoji: '[^']+',/g,
  `{ id: 1, title: 'Buy 2 Get 1 Free', subtitle: 'On all Dairy products', emoji: 'https://loremflickr.com/400/400/dairy,milk/all',`
);
content = content.replace(
  /\{ id: 2, title: '30% Off Fruits', subtitle: 'Limited time offer', emoji: '[^']+',/g,
  `{ id: 2, title: '30% Off Fruits', subtitle: 'Limited time offer', emoji: 'https://loremflickr.com/400/400/fruits,fresh/all',`
);
content = content.replace(
  /\{ id: 3, title: 'Free Delivery', subtitle: 'On orders above ₹50', emoji: '[^']+',/g,
  `{ id: 3, title: 'Free Delivery', subtitle: 'On orders above ₹50', emoji: 'https://loremflickr.com/400/400/delivery,box/all',`
);
content = content.replace(
  /\{ id: 4, title: 'Weekend Special', subtitle: 'Extra 15% on Bakery', emoji: '[^']+',/g,
  `{ id: 4, title: 'Weekend Special', subtitle: 'Extra 15% on Bakery', emoji: 'https://loremflickr.com/400/400/bakery,bread/all',`
);

fs.writeFileSync('./src/data/products.ts', content);
console.log("Fixed images and removed beef.");
