import mongoose, { Schema } from 'mongoose';

const orderItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  name: { type: String, required: true }, // Snapshot of name
  quantity: { type: Number, required: true },
  price: { type: Number, required: true } // Snapshot of price
}, { _id: false });

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [orderItemSchema],
  totalAmount: { type: Number, required: true },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
    country: String
  },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'completed', 'failed', 'refunded'], 
    default: 'pending' 
  },
  stripeSessionId: { type: String },
  orderStatus: { 
    type: String, 
    enum: ['processing', 'shipped', 'delivered', 'cancelled'], 
    default: 'processing' 
  }
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
