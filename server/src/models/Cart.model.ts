import mongoose, { Schema, Document } from 'mongoose';

interface ICartItem {
  productId: mongoose.Types.ObjectId;
  quantity: number;
  price: number; 
}
export interface ICart extends Document {
  userId: mongoose.Types.ObjectId;
  items: ICartItem[];
  totalPrice: number;
}

const CartSchema: Schema = new Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true, default: 1 },
      price: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true, default: 0 }
}, { timestamps: true });

export default mongoose.model<ICart>('Cart', CartSchema);