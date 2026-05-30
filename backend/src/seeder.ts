import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './models/product.model';
import connectDB from './config/db';

dotenv.config();

connectDB();

const products = [
  // Fruits
  { name: 'Fresh Strawberries', category: 'Fruits', price: 104.99, unit: '500g', imageUrl: 'https://loremflickr.com/400/400/strawberry,food/all', stock: 50, description: 'Sweet, juicy strawberries picked at peak ripeness.' },
  { name: 'Organic Mangoes', category: 'Fruits', price: 107.49, unit: '4 pcs', imageUrl: 'https://loremflickr.com/400/400/mango,food/all', stock: 50, description: 'Alphonso mangoes, naturally sweet and aromatic.' },
  { name: 'Blueberries Pack', category: 'Fruits', price: 105.99, unit: '300g', imageUrl: 'https://loremflickr.com/400/400/blueberries,food/all', stock: 50, description: 'Antioxidant-rich blueberries, fresh and plump.' },
  { name: 'Watermelon Whole', category: 'Fruits', price: 108.99, unit: '4-5 kg', imageUrl: 'https://loremflickr.com/400/400/watermelon,food/all', stock: 50, description: 'Seedless watermelon, perfectly chilled and sweet.' },
  { name: 'Avocados', category: 'Fruits', price: 103.99, unit: '2 pcs', imageUrl: 'https://loremflickr.com/400/400/avocado,food/all', stock: 50, description: 'Creamy Hass avocados, perfect for guacamole.' },
  { name: 'Grapes (Green)', category: 'Fruits', price: 104.49, unit: '500g', imageUrl: 'https://loremflickr.com/400/400/grapes,food/all', stock: 50, description: 'Seedless green grapes, crisp and refreshing.' },
  { name: 'Pineapple', category: 'Fruits', price: 103.49, unit: '1 piece', imageUrl: 'https://loremflickr.com/400/400/pineapple,food/all', stock: 0, description: 'Tropical pineapple, sweet-tart flavor.' },
  { name: 'Dragon Fruit', category: 'Fruits', price: 109.99, unit: '2 pcs', imageUrl: 'https://loremflickr.com/400/400/dragonfruit,food/all', stock: 50, description: 'Exotic dragon fruit with vibrant pink flesh.' },

  // Vegetables
  { name: 'Baby Spinach', category: 'Vegetables', price: 102.99, unit: '200g', imageUrl: 'https://loremflickr.com/400/400/spinach,food/all', stock: 50, description: 'Tender baby spinach leaves, washed and ready to eat.' },
  { name: 'Broccoli Head', category: 'Vegetables', price: 102.49, unit: '500g', imageUrl: 'https://loremflickr.com/400/400/broccoli,food/all', stock: 50, description: 'Fresh broccoli, packed with vitamins and minerals.' },
  { name: 'Cherry Tomatoes', category: 'Vegetables', price: 103.49, unit: '400g', imageUrl: 'https://loremflickr.com/400/400/tomatoes,food/all', stock: 50, description: 'Sweet cherry tomatoes perfect for salads.' },
  { name: 'Rainbow Peppers', category: 'Vegetables', price: 104.99, unit: '3 pcs', imageUrl: 'https://loremflickr.com/400/400/bellpeppers,food/all', stock: 50, description: 'Colorful bell peppers, red, yellow & orange.' },
  { name: 'Purple Carrots', category: 'Vegetables', price: 103.29, unit: '500g', imageUrl: 'https://loremflickr.com/400/400/carrots,food/all', stock: 50, description: 'Heirloom purple carrots, sweet and crunchy.' },
  { name: 'Mushroom Mix', category: 'Vegetables', price: 105.49, unit: '300g', imageUrl: 'https://loremflickr.com/400/400/mushrooms,food/all', stock: 50, description: 'Exotic mushroom blend - shiitake, oyster, cremini.' },
  { name: 'Sweet Corn', category: 'Vegetables', price: 101.99, unit: '3 pcs', imageUrl: 'https://loremflickr.com/400/400/corn,food/all', stock: 50, description: 'Golden sweet corn on the cob.' },
  { name: 'Cucumber', category: 'Vegetables', price: 101.49, unit: '2 pcs', imageUrl: 'https://loremflickr.com/400/400/cucumber,food/all', stock: 50, description: 'Cool and crisp English cucumbers.' },

  // Dairy
  { name: 'Greek Yogurt', category: 'Dairy', price: 103.99, unit: '500g', imageUrl: 'https://loremflickr.com/400/400/yogurt,food/all', stock: 50, description: 'Thick, creamy Greek yogurt, high protein.' },
  { name: 'Artisan Cheese', category: 'Dairy', price: 108.99, unit: '200g', imageUrl: 'https://loremflickr.com/400/400/cheese,food/all', stock: 50, description: 'Aged cheddar with rich, complex flavor profile.' },
  { name: 'Organic Butter', category: 'Dairy', price: 106.49, unit: '250g', imageUrl: 'https://loremflickr.com/400/400/butter,food/all', stock: 50, description: 'Grass-fed organic butter, rich and golden.' },
  { name: 'Fresh Cream', category: 'Dairy', price: 102.99, unit: '200ml', imageUrl: 'https://loremflickr.com/400/400/cream,food/all', stock: 50, description: 'Fresh whipping cream, 35% fat content.' },
  { name: 'Farm Eggs', category: 'Dairy', price: 104.99, unit: '12 pcs', imageUrl: 'https://loremflickr.com/400/400/eggs,food/all', stock: 50, description: 'Free-range farm eggs, rich orange yolk.' },
  { name: 'Mozzarella', category: 'Dairy', price: 105.99, unit: '250g', imageUrl: 'https://loremflickr.com/400/400/mozzarella,food/all', stock: 50, description: 'Fresh buffalo mozzarella, creamy and mild.' },

  // Beverages
  { name: 'Cold Brew Coffee', category: 'Beverages', price: 105.99, unit: '500ml', imageUrl: 'https://loremflickr.com/400/400/coffee,food/all', stock: 50, description: 'Smooth cold brew, steeped 24 hours. No bitterness.' },
  { name: 'Green Juice', category: 'Beverages', price: 106.49, unit: '330ml', imageUrl: 'https://loremflickr.com/400/400/juice,food/all', stock: 50, description: 'Kale, cucumber, apple, ginger cold-pressed juice.' },
  { name: 'Sparkling Water', category: 'Beverages', price: 102.49, unit: '1L', imageUrl: 'https://loremflickr.com/400/400/water,food/all', stock: 50, description: 'Natural mineral sparkling water, no additives.' },
  { name: 'Mango Smoothie', category: 'Beverages', price: 104.99, unit: '250ml', imageUrl: 'https://loremflickr.com/400/400/smoothie,food/all', stock: 50, description: 'All-natural mango smoothie, no added sugar.' },
  { name: 'Kombucha', category: 'Beverages', price: 103.99, unit: '330ml', imageUrl: 'https://loremflickr.com/400/400/kombucha,food/all', stock: 50, description: 'Raw fermented kombucha, gut-healthy probiotics.' },
  { name: 'Protein Shake', category: 'Beverages', price: 107.99, unit: '330ml', imageUrl: 'https://loremflickr.com/400/400/shake,food/all', stock: 50, description: 'Vanilla protein shake, 30g protein per serving.' },

  // Snacks
  { name: 'Dark Chocolate', category: 'Snacks', price: 104.99, unit: '100g', imageUrl: 'https://loremflickr.com/400/400/chocolate,food/all', stock: 50, description: '85% dark chocolate, single origin Ecuador beans.' },
  { name: 'Mixed Nuts', category: 'Snacks', price: 108.99, unit: '400g', imageUrl: 'https://loremflickr.com/400/400/nuts,food/all', stock: 50, description: 'Premium blend of almonds, cashews, walnuts, pecans.' },
  { name: 'Potato Chips', category: 'Snacks', price: 103.49, unit: '150g', imageUrl: 'https://loremflickr.com/400/400/chips,food/all', stock: 50, description: 'Kettle-cooked potato chips, sea salt & vinegar.' },
  { name: 'Granola Bars', category: 'Snacks', price: 105.99, unit: '6 bars', imageUrl: 'https://loremflickr.com/400/400/granola,food/all', stock: 50, description: 'Honey oat granola bars with dark chocolate chips.' },
  { name: 'Popcorn', category: 'Snacks', price: 102.99, unit: '200g', imageUrl: 'https://loremflickr.com/400/400/popcorn,food/all', stock: 50, description: 'Artisan caramel & sea salt popcorn, light and airy.' },
  { name: 'Rice Crackers', category: 'Snacks', price: 103.29, unit: '150g', imageUrl: 'https://loremflickr.com/400/400/crackers,food/all', stock: 50, description: 'Gluten-free rice crackers with sesame seeds.' },

  // Bakery
  { name: 'Sourdough Loaf', category: 'Bakery', price: 106.99, unit: '800g', imageUrl: 'https://loremflickr.com/400/400/sourdough,food/all', stock: 50, description: 'Slow-fermented sourdough, crispy crust, chewy crumb.' },
  { name: 'Croissants', category: 'Bakery', price: 105.49, unit: '4 pcs', imageUrl: 'https://loremflickr.com/400/400/croissant,food/all', stock: 50, description: 'Buttery French croissants, flaky and golden.' },
  { name: 'Blueberry Muffins', category: 'Bakery', price: 104.99, unit: '6 pcs', imageUrl: 'https://loremflickr.com/400/400/muffin,food/all', stock: 50, description: 'Jumbo blueberry muffins with streusel topping.' },
  { name: 'Bagels', category: 'Bakery', price: 104.49, unit: '4 pcs', imageUrl: 'https://loremflickr.com/400/400/bagel,food/all', stock: 50, description: 'New York-style bagels, boiled then baked.' },
  { name: 'Cinnamon Rolls', category: 'Bakery', price: 107.99, unit: '4 pcs', imageUrl: 'https://loremflickr.com/400/400/cinnamonroll,food/all', stock: 50, description: 'Soft cinnamon rolls with cream cheese frosting.' },

  // Meat
  { name: 'Salmon Fillet', category: 'Meat', price: 114.99, unit: '500g', imageUrl: 'https://loremflickr.com/400/400/salmon,food/all', stock: 50, description: 'Atlantic salmon fillet, skin-on, fresh caught.' },
  { name: 'Chicken Breast', category: 'Meat', price: 109.99, unit: '500g', imageUrl: 'https://loremflickr.com/400/400/chicken,food/all', stock: 50, description: 'Free-range organic chicken breast, hormone-free.' },
  { name: 'Mutton Curry Cut', category: 'Meat', price: 124.99, unit: '500g', imageUrl: 'https://loremflickr.com/400/400/mutton,food/all', stock: 50, description: 'Fresh tender mutton, perfectly cut for curries.' },
  { name: 'Shrimp (Large)', category: 'Meat', price: 112.99, unit: '300g', imageUrl: 'https://loremflickr.com/400/400/shrimp,food/all', stock: 50, description: 'Jumbo tiger shrimp, deveined and ready to cook.' },

  // Frozen
  { name: 'Açaí Bowls', category: 'Frozen', price: 105.99, unit: '200g', imageUrl: 'https://loremflickr.com/400/400/acai,food/all', stock: 50, description: 'Frozen açaí puree packs, organic and unsweetened.' },
  { name: 'Veggie Pizza', category: 'Frozen', price: 107.99, unit: '400g', imageUrl: 'https://loremflickr.com/400/400/pizza,food/all', stock: 50, description: 'Stone-baked thin crust veggie pizza, no preservatives.' },
  { name: 'Ice Cream Tub', category: 'Frozen', price: 106.49, unit: '500ml', imageUrl: 'https://loremflickr.com/400/400/icecream,food/all', stock: 50, description: 'Artisan vanilla bean ice cream, French-style custard.' },
  { name: 'Frozen Waffles', category: 'Frozen', price: 104.49, unit: '6 pcs', imageUrl: 'https://loremflickr.com/400/400/waffles,food/all', stock: 50, description: 'Belgian-style frozen waffles, crispy when toasted.' },
  { name: 'Edamame', category: 'Frozen', price: 103.99, unit: '400g', imageUrl: 'https://loremflickr.com/400/400/edamame,food/all', stock: 50, description: 'Organic frozen edamame, lightly salted.' },
];

const importData = async () => {
  try {
    await connectDB();
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Data Imported!');
    process.exit();
  } catch (error) {
    console.error(`${error}`);
    process.exit(1);
  }
};

importData();
