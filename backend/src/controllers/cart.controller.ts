import { Response } from 'express';
import Cart from '../models/cart.model';
import Product from '../models/product.model';
import { AuthRequest } from '../middlewares/auth.middleware';

export const getCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    let cart = await Cart.findOne({ user: req.user._id }).populate('items.product');
    
    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], totalPrice: 0 });
    }
    
    res.json(cart);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const addToCart = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, quantity } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ message: 'Product not found' });
      return;
    }

    if (product.stock < quantity) {
      res.status(400).json({ message: 'Insufficient stock' });
      return;
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({ user: req.user._id, items: [], totalPrice: 0 });
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        priceAtAddition: product.price
      });
    }

    cart.totalPrice = await calculateCartTotal(cart.items);
    await cart.save();

    res.status(200).json(cart);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCartItem = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      res.status(404).json({ message: 'Cart not found' });
      return;
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex > -1) {
      if (quantity <= 0) {
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
      
      cart.totalPrice = await calculateCartTotal(cart.items);
      await cart.save();
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: 'Item not found in cart' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

const calculateCartTotal = async (items: any[]) => {
  let total = 0;
  for (const item of items) {
    const product = await Product.findById(item.product);
    if (product) {
      total += product.price * item.quantity;
    }
  }
  return total;
};
