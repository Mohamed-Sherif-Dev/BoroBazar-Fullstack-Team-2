import mongoose, { Schema, Document } from "mongoose";

export interface ICategory extends Document {
    name: string;
    image: string,
    isActive: boolean,
    createdAt: Date,
    updatedAt: Date
}


// Category Schema
const CategorySchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    image: {
        type: String,
        required: true
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})



export default mongoose.model<ICategory>("Category", CategorySchema)