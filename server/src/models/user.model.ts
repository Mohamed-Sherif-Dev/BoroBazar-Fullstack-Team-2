import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    phone?: string;
    avatar?: string;
    otp?: string;
    otpExpires?: Date;
}




const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
    },
    avatar: {
        type: String,
    },
    otp:{
        type: String,
    },
    otpExpires:{
        type: Date,
    }
}, {
    timestamps: true,
});


export default mongoose.model<IUser>('User', userSchema);