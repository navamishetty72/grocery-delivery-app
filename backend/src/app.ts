import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import productRoutes from './routes/product.routes';
import cartRoutes from './routes/cart.routes';
import orderRoutes from './routes/order.routes';
import { handleStripeWebhook } from './controllers/order.controller';

dotenv.config();

const app = express();

app.use(cors());

// Webhook must be parsed as raw body
app.post('/api/orders/webhook', express.raw({ type: 'application/json' }), handleStripeWebhook);

app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Grocery App API is running...');
});

export default app;
