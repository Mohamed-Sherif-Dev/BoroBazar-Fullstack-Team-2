import mongoose, { Schema, Document } from 'mongoose';

export interface IAddress extends Document {
  userId: mongoose.Types.ObjectId;
  title: string;
  address: string;
  city: string;
  state?: string;
  zipCode: string;
  country: string;
  phone: string;
  isDefault: boolean;
}

const AddressSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true }, // e.g., Home, Work, Office
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String },
  zipCode: { type: String, required: true },
  country: { type: String, required: true },
  phone: { type: String, required: true },
  isDefault: { type: Boolean, default: false }
}, { timestamps: true });

export default mongoose.model<IAddress>('Address', AddressSchema);
