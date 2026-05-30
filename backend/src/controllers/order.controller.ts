import { Request, Response } from 'express';
import Stripe from 'stripe';
import Order from '../models/order.model';
import Cart from '../models/cart.model';
import Product from '../models/product.model';
import { AuthRequest } from '../middlewares/auth.middleware';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder', {
  apiVersion: '2025-02-24.acacia',
});

export const createCheckoutSession = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const { shippingAddress } = req.body;
    const cart = await Cart.findOne({ user: req.user._id }).populate('items.product');

    if (!cart || cart.items.length === 0) {
      res.status(400).json({ message: 'Cart is empty' });
      return;
    }

    const lineItems = cart.items.map((item: any) => {
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.product.name,
          },
          unit_amount: Math.round(item.product.price * 100), // Stripe expects amounts in cents
        },
        quantity: item.quantity,
      };
    });

    const orderItems = cart.items.map((item: any) => ({
      product: item.product._id,
      name: item.product.name,
      quantity: item.quantity,
      price: item.product.price,
    }));

    const order = await Order.create({
      user: req.user._id,
      items: orderItems,
      totalAmount: cart.totalPrice,
      shippingAddress,
      paymentStatus: 'pending'
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/cart`,
      metadata: {
        orderId: order._id.toString(),
      }
    });

    order.stripeSessionId = session.id;
    await order.save();

    res.json({ url: session.url, sessionId: session.id });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

export const handleStripeWebhook = async (req: Request, res: Response): Promise<void> => {
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig as string,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as any;
    const orderId = session.metadata.orderId;

    const order = await Order.findById(orderId);

    if (order) {
      order.paymentStatus = 'completed';
      order.orderStatus = 'processing';
      await order.save();

      // Decrement stock
      for (const item of order.items) {
        await Product.findByIdAndUpdate(item.product, {
          $inc: { stock: -item.quantity }
        });
      }

      // Clear user cart
      await Cart.findOneAndUpdate({ user: order.user }, { items: [], totalPrice: 0 });
    }
  }

  res.json({ received: true });
};

export const getOrderHistory = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};
