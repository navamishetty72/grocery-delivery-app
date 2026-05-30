import { Request, Response } from 'express';
import Product from '../models/product.model';

export const getProducts = async (req: Request, res: Response): Promise<void> => {
  try {
    const { category } = req.query;
    const filter = category ? { category, isActive: true } : { isActive: true };
    const products = await Product.find(filter);
    res.json(products);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
