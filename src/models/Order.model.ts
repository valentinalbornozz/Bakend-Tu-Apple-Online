import { model, Schema, Document } from 'mongoose';

interface Product {
    name: string;
    image?: string;
    description: string;
    quantity: number;
}

interface Order extends Document {
    firstName: string;
    lastName: string;
    email: string;
    shippingAddress: string;
    phone: string;
    totalAmount: number;
    stripeTokenId: string;
    paymentStatus: 'Pending' | 'Paid' | 'Failed';
    products: Product[];
}

const productSchema = new Schema<Product>({
    name: { type: String, required: true },
    image: { type: String },
    description: { type: String, required: true },
    quantity: { type: Number, required: true },
});

const orderSchema = new Schema<Order>(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        shippingAddress: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        totalAmount: {
            type: Number,
            required: true,
        },
        stripeTokenId: {
            type: String,
            required: true,
        },
        paymentStatus: {
            type: String,
            enum: ['Pending', 'Paid', 'Failed'],
            default: 'Pending',
        },
        products: [productSchema], // Asociamos la propiedad products con el esquema de productos
    },
    {
        timestamps: true,
    }
);

const OrderModel = model<Order>('Order', orderSchema);

export default OrderModel;
