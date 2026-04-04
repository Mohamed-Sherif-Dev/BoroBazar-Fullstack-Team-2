import mongoose, { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  items: any[];
  totalPrice: number;
  shippingAddress: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  paymentMethod: 'Cash' | 'Card';
}

const OrderSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true } 
    }
  ],
  totalPrice: { type: Number, required: true },
  shippingAddress: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Pending' 
  },
  paymentMethod: { type: String, enum: ['Cash', 'Card'], default: 'Cash' }
}, { timestamps: true });

export default mongoose.model<IOrder>('Order', OrderSchema);