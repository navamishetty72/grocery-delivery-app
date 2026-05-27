export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  emoji: string;
  rating: number;
  reviews: number;
  weight: string;
  badge?: 'sale' | 'new' | 'hot' | 'organic';
  inStock: boolean;
  description: string;
  bgColor: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category =
  | 'All'
  | 'Fruits'
  | 'Vegetables'
  | 'Dairy'
  | 'Beverages'
  | 'Snacks'
  | 'Bakery'
  | 'Meat'
  | 'Frozen';
