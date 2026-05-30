import mongoose, { Schema } from 'mongoose';

const productSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  unit: { type: String, required: true }, // e.g., 'kg', 'lb', 'piece', 'bunch'
  category: { 
    type: String, 
    required: true, 
    enum: ['Fruits', 'Vegetables', 'Dairy', 'Bakery', 'Meat', 'Beverages', 'Snacks', 'Frozen'] 
  },
  imageUrl: { type: String },
  stock: { type: Number, required: true, default: 0 },
  isActive: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Product', productSchema);
