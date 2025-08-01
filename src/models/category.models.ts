import mongoose, {Schema, Document } from "mongoose";

interface usuario extends Document {
    nombre: string;
    email: string;
    productos: string;
    categoria: string;
}

const userSchema = new Schema({
    nombre: {type: String},
    email: {type: String},
    productos: {type: String},
    categoria: {type: String},
    isAdmin: {type: Boolean, default: false},
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
    deletedAt: {type: Date, default: null},
    isDeleted: {type: Boolean, default: false},
    isActive: {type: Boolean, default: true},
    isBlocked: {type: Boolean, default: false},
    isVerified: {type: Boolean, default: false},    
}, { timestamps: true });

const Usuario = mongoose.model<usuario>('Usuario', userSchema);

export default Usuario;