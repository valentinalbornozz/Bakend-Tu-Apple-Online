import { Document, model, Schema } from 'mongoose';

interface IUser extends Document {
    nombre: string;
    email: string;
    password: string;
    createdAt: Date;
}

const UsuarioSchema = new Schema<IUser>({
    nombre: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const UsuarioModel = model<IUser>('Usuario', UsuarioSchema);

export default UsuarioModel;
