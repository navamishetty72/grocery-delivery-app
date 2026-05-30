import express from 'express';
import { createCheckoutSession, getOrderHistory } from '../controllers/order.controller';
import { protect } from '../middlewares/auth.middleware';

const router = express.Router();

router.post('/checkout', protect, createCheckoutSession);
router.get('/history', protect, getOrderHistory);

export default router;
