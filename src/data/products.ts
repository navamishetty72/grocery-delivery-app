import { Product } from '../types';

export const products: Product[] = [
  // Fruits
  { id: 1, name: 'Fresh Strawberries', category: 'Fruits', price: 104.99, originalPrice: 106.99, emoji: 'https://loremflickr.com/400/400/strawberry', rating: 4.8, reviews: 234, weight: '500g', badge: 'sale', inStock: true, description: 'Sweet, juicy strawberries picked at peak ripeness.', bgColor: 'linear-gradient(135deg,#1a0010,#2d0018)' },
  { id: 2, name: 'Organic Mangoes', category: 'Fruits', price: 107.49, emoji: 'https://loremflickr.com/400/400/mango', rating: 4.9, reviews: 189, weight: '4 pcs', badge: 'organic', inStock: true, description: 'Alphonso mangoes, naturally sweet and aromatic.', bgColor: 'linear-gradient(135deg,#1a0f00,#2d1a00)' },
  { id: 3, name: 'Blueberries Pack', category: 'Fruits', price: 105.99, originalPrice: 107.99, emoji: 'https://loremflickr.com/400/400/blueberries', rating: 4.7, reviews: 312, weight: '300g', badge: 'sale', inStock: true, description: 'Antioxidant-rich blueberries, fresh and plump.', bgColor: 'linear-gradient(135deg,#000a1a,#00102d)' },
  { id: 4, name: 'Watermelon Whole', category: 'Fruits', price: 108.99, emoji: 'https://loremflickr.com/400/400/watermelon', rating: 4.6, reviews: 98, weight: '4-5 kg', inStock: true, description: 'Seedless watermelon, perfectly chilled and sweet.', bgColor: 'linear-gradient(135deg,#0a1a00,#0f2d00)' },
  { id: 5, name: 'Avocados', category: 'Fruits', price: 103.99, emoji: 'https://loremflickr.com/400/400/avocado', rating: 4.5, reviews: 421, weight: '2 pcs', badge: 'hot', inStock: true, description: 'Creamy Hass avocados, perfect for guacamole.', bgColor: 'linear-gradient(135deg,#001a0a,#002d12)' },
  { id: 6, name: 'Grapes (Green)', category: 'Fruits', price: 104.49, emoji: 'https://loremflickr.com/400/400/grapes', rating: 4.4, reviews: 176, weight: '500g', inStock: true, description: 'Seedless green grapes, crisp and refreshing.', bgColor: 'linear-gradient(135deg,#051a00,#082d00)' },
  { id: 7, name: 'Pineapple', category: 'Fruits', price: 103.49, emoji: 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=400', rating: 4.3, reviews: 143, weight: '1 piece', inStock: false, description: 'Tropical pineapple, sweet-tart flavor.', bgColor: 'linear-gradient(135deg,#1a1400,#2d2000)' },
  { id: 8, name: 'Dragon Fruit', category: 'Fruits', price: 109.99, originalPrice: 112.99, emoji: 'https://loremflickr.com/400/400/dragonfruit', rating: 4.7, reviews: 67, weight: '2 pcs', badge: 'new', inStock: true, description: 'Exotic dragon fruit with vibrant pink flesh.', bgColor: 'linear-gradient(135deg,#1a001a,#2d002d)' },

  // Vegetables
  { id: 9, name: 'Baby Spinach', category: 'Vegetables', price: 102.99, emoji: 'https://loremflickr.com/400/400/spinach', rating: 4.6, reviews: 289, weight: '200g', badge: 'organic', inStock: true, description: 'Tender baby spinach leaves, washed and ready to eat.', bgColor: 'linear-gradient(135deg,#001a0a,#002d12)' },
  { id: 10, name: 'Broccoli Head', category: 'Vegetables', price: 102.49, emoji: 'https://loremflickr.com/400/400/broccoli', rating: 4.5, reviews: 198, weight: '500g', inStock: true, description: 'Fresh broccoli, packed with vitamins and minerals.', bgColor: 'linear-gradient(135deg,#001a00,#002d00)' },
  { id: 11, name: 'Cherry Tomatoes', category: 'Vegetables', price: 103.49, originalPrice: 104.49, emoji: 'https://loremflickr.com/400/400/tomatoes', rating: 4.7, reviews: 356, weight: '400g', badge: 'sale', inStock: true, description: 'Sweet cherry tomatoes perfect for salads.', bgColor: 'linear-gradient(135deg,#1a0000,#2d0000)' },
  { id: 12, name: 'Rainbow Peppers', category: 'Vegetables', price: 104.99, emoji: 'https://loremflickr.com/400/400/bellpeppers', rating: 4.4, reviews: 134, weight: '3 pcs', badge: 'new', inStock: true, description: 'Colorful bell peppers, red, yellow & orange.', bgColor: 'linear-gradient(135deg,#1a0800,#2d1200)' },
  { id: 13, name: 'Purple Carrots', category: 'Vegetables', price: 103.29, emoji: 'https://loremflickr.com/400/400/carrots', rating: 4.3, reviews: 87, weight: '500g', inStock: true, description: 'Heirloom purple carrots, sweet and crunchy.', bgColor: 'linear-gradient(135deg,#0d001a,#180029)' },
  { id: 14, name: 'Mushroom Mix', category: 'Vegetables', price: 105.49, emoji: 'https://loremflickr.com/400/400/mushrooms', rating: 4.8, reviews: 212, weight: '300g', badge: 'hot', inStock: true, description: 'Exotic mushroom blend - shiitake, oyster, cremini.', bgColor: 'linear-gradient(135deg,#0a0a00,#1a1a00)' },
  { id: 15, name: 'Sweet Corn', category: 'Vegetables', price: 101.99, emoji: 'https://loremflickr.com/400/400/corn', rating: 4.2, reviews: 167, weight: '3 pcs', inStock: true, description: 'Golden sweet corn on the cob.', bgColor: 'linear-gradient(135deg,#1a1200,#2d1e00)' },
  { id: 16, name: 'Cucumber', category: 'Vegetables', price: 101.49, emoji: 'https://loremflickr.com/400/400/cucumber', rating: 4.1, reviews: 203, weight: '2 pcs', inStock: true, description: 'Cool and crisp English cucumbers.', bgColor: 'linear-gradient(135deg,#001a08,#002d12)' },

  // Dairy
  { id: 17, name: 'Greek Yogurt', category: 'Dairy', price: 103.99, emoji: 'https://loremflickr.com/400/400/yogurt', rating: 4.7, reviews: 445, weight: '500g', badge: 'hot', inStock: true, description: 'Thick, creamy Greek yogurt, high protein.', bgColor: 'linear-gradient(135deg,#001a1a,#00292d)' },
  { id: 18, name: 'Artisan Cheese', category: 'Dairy', price: 108.99, originalPrice: 111.99, emoji: 'https://loremflickr.com/400/400/cheese', rating: 4.9, reviews: 178, weight: '200g', badge: 'sale', inStock: true, description: 'Aged cheddar with rich, complex flavor profile.', bgColor: 'linear-gradient(135deg,#1a1000,#2d1900)' },
  { id: 19, name: 'Organic Butter', category: 'Dairy', price: 106.49, emoji: 'https://loremflickr.com/400/400/butter', rating: 4.6, reviews: 267, weight: '250g', badge: 'organic', inStock: true, description: 'Grass-fed organic butter, rich and golden.', bgColor: 'linear-gradient(135deg,#1a1200,#2d1e00)' },
  { id: 20, name: 'Fresh Cream', category: 'Dairy', price: 102.99, emoji: 'https://loremflickr.com/400/400/cream', rating: 4.4, reviews: 123, weight: '200ml', inStock: true, description: 'Fresh whipping cream, 35% fat content.', bgColor: 'linear-gradient(135deg,#0a001a,#12002d)' },
  { id: 21, name: 'Farm Eggs', category: 'Dairy', price: 104.99, emoji: 'https://images.unsplash.com/photo-1506976773554-56fc73f08960?w=400', rating: 4.8, reviews: 589, weight: '12 pcs', badge: 'new', inStock: true, description: 'Free-range farm eggs, rich orange yolk.', bgColor: 'linear-gradient(135deg,#1a0e00,#2d1800)' },
  { id: 22, name: 'Mozzarella', category: 'Dairy', price: 105.99, emoji: 'https://loremflickr.com/400/400/mozzarella', rating: 4.5, reviews: 234, weight: '250g', inStock: true, description: 'Fresh buffalo mozzarella, creamy and mild.', bgColor: 'linear-gradient(135deg,#001218,#001a24)' },

  // Beverages
  { id: 23, name: 'Cold Brew Coffee', category: 'Beverages', price: 105.99, originalPrice: 107.99, emoji: 'https://loremflickr.com/400/400/coffee', rating: 4.9, reviews: 678, weight: '500ml', badge: 'hot', inStock: true, description: 'Smooth cold brew, steeped 24 hours. No bitterness.', bgColor: 'linear-gradient(135deg,#0f0800,#1a0d00)' },
  { id: 24, name: 'Green Juice', category: 'Beverages', price: 106.49, emoji: 'https://loremflickr.com/400/400/juice', rating: 4.6, reviews: 234, weight: '330ml', badge: 'organic', inStock: true, description: 'Kale, cucumber, apple, ginger cold-pressed juice.', bgColor: 'linear-gradient(135deg,#001a08,#002d12)' },
  { id: 25, name: 'Sparkling Water', category: 'Beverages', price: 102.49, emoji: 'https://loremflickr.com/400/400/water', rating: 4.3, reviews: 345, weight: '1L', inStock: true, description: 'Natural mineral sparkling water, no additives.', bgColor: 'linear-gradient(135deg,#00101a,#001a2d)' },
  { id: 26, name: 'Mango Smoothie', category: 'Beverages', price: 104.99, originalPrice: 105.99, emoji: 'https://loremflickr.com/400/400/smoothie', rating: 4.7, reviews: 189, weight: '250ml', badge: 'sale', inStock: true, description: 'All-natural mango smoothie, no added sugar.', bgColor: 'linear-gradient(135deg,#1a0c00,#2d1500)' },
  { id: 27, name: 'Kombucha', category: 'Beverages', price: 103.99, emoji: 'https://loremflickr.com/400/400/kombucha', rating: 4.5, reviews: 156, weight: '330ml', badge: 'new', inStock: true, description: 'Raw fermented kombucha, gut-healthy probiotics.', bgColor: 'linear-gradient(135deg,#0a001a,#12002d)' },
  { id: 28, name: 'Protein Shake', category: 'Beverages', price: 107.99, emoji: 'https://loremflickr.com/400/400/shake', rating: 4.8, reviews: 423, weight: '330ml', badge: 'hot', inStock: true, description: 'Vanilla protein shake, 30g protein per serving.', bgColor: 'linear-gradient(135deg,#001a1a,#00292d)' },

  // Snacks
  { id: 29, name: 'Dark Chocolate', category: 'Snacks', price: 104.99, originalPrice: 106.49, emoji: 'https://loremflickr.com/400/400/chocolate', rating: 4.9, reviews: 892, weight: '100g', badge: 'sale', inStock: true, description: '85% dark chocolate, single origin Ecuador beans.', bgColor: 'linear-gradient(135deg,#0d0000,#1a0000)' },
  { id: 30, name: 'Mixed Nuts', category: 'Snacks', price: 108.99, emoji: 'https://loremflickr.com/400/400/nuts', rating: 4.7, reviews: 567, weight: '400g', badge: 'hot', inStock: true, description: 'Premium blend of almonds, cashews, walnuts, pecans.', bgColor: 'linear-gradient(135deg,#1a0f00,#2d1a00)' },
  { id: 31, name: 'Potato Chips', category: 'Snacks', price: 103.49, emoji: 'https://loremflickr.com/400/400/chips', rating: 4.4, reviews: 1203, weight: '150g', inStock: true, description: 'Kettle-cooked potato chips, sea salt & vinegar.', bgColor: 'linear-gradient(135deg,#1a1400,#2d2000)' },
  { id: 32, name: 'Granola Bars', category: 'Snacks', price: 105.99, emoji: 'https://loremflickr.com/400/400/granola', rating: 4.6, reviews: 345, weight: '6 bars', badge: 'organic', inStock: true, description: 'Honey oat granola bars with dark chocolate chips.', bgColor: 'linear-gradient(135deg,#0f0800,#1a1000)' },
  { id: 33, name: 'Popcorn', category: 'Snacks', price: 102.99, emoji: 'https://loremflickr.com/400/400/popcorn', rating: 4.3, reviews: 678, weight: '200g', badge: 'new', inStock: true, description: 'Artisan caramel & sea salt popcorn, light and airy.', bgColor: 'linear-gradient(135deg,#1a1000,#2d1900)' },
  { id: 34, name: 'Rice Crackers', category: 'Snacks', price: 103.29, emoji: 'https://loremflickr.com/400/400/crackers', rating: 4.2, reviews: 234, weight: '150g', inStock: true, description: 'Gluten-free rice crackers with sesame seeds.', bgColor: 'linear-gradient(135deg,#0a0a0a,#141414)' },

  // Bakery
  { id: 35, name: 'Sourdough Loaf', category: 'Bakery', price: 106.99, emoji: 'https://loremflickr.com/400/400/sourdough', rating: 4.9, reviews: 512, weight: '800g', badge: 'hot', inStock: true, description: 'Slow-fermented sourdough, crispy crust, chewy crumb.', bgColor: 'linear-gradient(135deg,#1a0c00,#2d1500)' },
  { id: 36, name: 'Croissants', category: 'Bakery', price: 105.49, originalPrice: 106.99, emoji: 'https://loremflickr.com/400/400/croissant', rating: 4.8, reviews: 389, weight: '4 pcs', badge: 'sale', inStock: true, description: 'Buttery French croissants, flaky and golden.', bgColor: 'linear-gradient(135deg,#1a1000,#2d1900)' },
  { id: 37, name: 'Blueberry Muffins', category: 'Bakery', price: 104.99, emoji: 'https://loremflickr.com/400/400/muffin', rating: 4.7, reviews: 267, weight: '6 pcs', badge: 'new', inStock: true, description: 'Jumbo blueberry muffins with streusel topping.', bgColor: 'linear-gradient(135deg,#000a1a,#00102d)' },
  { id: 38, name: 'Bagels', category: 'Bakery', price: 104.49, emoji: 'https://loremflickr.com/400/400/bagel', rating: 4.5, reviews: 198, weight: '4 pcs', inStock: true, description: 'New York-style bagels, boiled then baked.', bgColor: 'linear-gradient(135deg,#0a0500,#1a0b00)' },
  { id: 39, name: 'Cinnamon Rolls', category: 'Bakery', price: 107.99, emoji: 'https://loremflickr.com/400/400/cinnamonroll', rating: 4.9, reviews: 445, weight: '4 pcs', badge: 'hot', inStock: true, description: 'Soft cinnamon rolls with cream cheese frosting.', bgColor: 'linear-gradient(135deg,#1a0800,#2d1200)' },

  // Meat
  { id: 40, name: 'Salmon Fillet', category: 'Meat', price: 114.99, originalPrice: 118.99, emoji: 'https://loremflickr.com/400/400/salmon', rating: 4.8, reviews: 345, weight: '500g', badge: 'sale', inStock: true, description: 'Atlantic salmon fillet, skin-on, fresh caught.', bgColor: 'linear-gradient(135deg,#1a0500,#2d0900)' },
  { id: 41, name: 'Chicken Breast', category: 'Meat', price: 109.99, emoji: 'https://loremflickr.com/400/400/chicken', rating: 4.6, reviews: 678, weight: '500g', badge: 'organic', inStock: true, description: 'Free-range organic chicken breast, hormone-free.', bgColor: 'linear-gradient(135deg,#1a0f00,#2d1a00)' },
  { id: 42, name: 'Mutton Curry Cut', category: 'Meat', price: 124.99, emoji: 'https://loremflickr.com/400/400/mutton', rating: 4.8, reviews: 189, weight: '500g', badge: 'hot', inStock: true, description: 'Fresh tender mutton, perfectly cut for curries.', bgColor: 'linear-gradient(135deg,#1a0000,#2d0000)' },
  { id: 43, name: 'Shrimp (Large)', category: 'Meat', price: 112.99, originalPrice: 115.99, emoji: 'https://loremflickr.com/400/400/shrimp', rating: 4.7, reviews: 234, weight: '300g', badge: 'sale', inStock: true, description: 'Jumbo tiger shrimp, deveined and ready to cook.', bgColor: 'linear-gradient(135deg,#1a0800,#2d1000)' },

  // Frozen
  { id: 44, name: 'Açaí Bowls', category: 'Frozen', price: 105.99, emoji: 'https://loremflickr.com/400/400/acai', rating: 4.8, reviews: 312, weight: '200g', badge: 'new', inStock: true, description: 'Frozen açaí puree packs, organic and unsweetened.', bgColor: 'linear-gradient(135deg,#0d001a,#180029)' },
  { id: 45, name: 'Veggie Pizza', category: 'Frozen', price: 107.99, originalPrice: 109.99, emoji: 'https://loremflickr.com/400/400/pizza', rating: 4.5, reviews: 567, weight: '400g', badge: 'sale', inStock: true, description: 'Stone-baked thin crust veggie pizza, no preservatives.', bgColor: 'linear-gradient(135deg,#1a0500,#2d0900)' },
  { id: 46, name: 'Ice Cream Tub', category: 'Frozen', price: 106.49, emoji: 'https://loremflickr.com/400/400/icecream', rating: 4.9, reviews: 789, weight: '500ml', badge: 'hot', inStock: true, description: 'Artisan vanilla bean ice cream, French-style custard.', bgColor: 'linear-gradient(135deg,#001a1a,#002929)' },
  { id: 47, name: 'Frozen Waffles', category: 'Frozen', price: 104.49, emoji: 'https://images.unsplash.com/photo-1562376552-0d160a2f5fbf?w=400', rating: 4.4, reviews: 234, weight: '6 pcs', inStock: true, description: 'Belgian-style frozen waffles, crispy when toasted.', bgColor: 'linear-gradient(135deg,#1a0e00,#2d1800)' },
  { id: 48, name: 'Edamame', category: 'Frozen', price: 103.99, emoji: 'https://loremflickr.com/400/400/edamame', rating: 4.6, reviews: 178, weight: '400g', badge: 'organic', inStock: true, description: 'Organic frozen edamame, lightly salted.', bgColor: 'linear-gradient(135deg,#001a08,#002d12)' },
];

export const categories = ['All', 'Fruits', 'Vegetables', 'Dairy', 'Beverages', 'Snacks', 'Bakery', 'Meat', 'Frozen'];

export const categoryEmojis: Record<string, string> = {
  All: 'https://loremflickr.com/100/100/all',
  Fruits: 'https://loremflickr.com/100/100/fruits',
  Vegetables: 'https://loremflickr.com/100/100/vegetables',
  Dairy: 'https://loremflickr.com/100/100/dairy',
  Beverages: 'https://loremflickr.com/100/100/beverages',
  Snacks: 'https://loremflickr.com/100/100/snacks',
  Bakery: 'https://loremflickr.com/100/100/bakery',
  Meat: 'https://loremflickr.com/100/100/meat',
  Frozen: 'https://loremflickr.com/100/100/frozen',
};

export const deals = [
  { id: 1, title: 'Buy 2 Get 1 Free', subtitle: 'On all Dairy products', emoji: 'https://loremflickr.com/400/400/dairy', color: '#10b981' },
  { id: 2, title: '30% Off Fruits', subtitle: 'Limited time offer', emoji: 'https://loremflickr.com/400/400/fruits', color: '#f43f5e' },
  { id: 3, title: 'Free Delivery', subtitle: 'On orders above ₹50', emoji: 'https://loremflickr.com/400/400/delivery', color: '#6366f1' },
  { id: 4, title: 'Weekend Special', subtitle: 'Extra 15% on Bakery', emoji: 'https://loremflickr.com/400/400/bakery', color: '#ff9900' },
];
