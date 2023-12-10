import { model, Schema, Document } from 'mongoose';

interface PurchasedProduct extends Document {
    name: string;
    description: string;
    quantity: number;
    image?: string;
    createdAt: Date;
}

const purchasedProductSchema = new Schema<PurchasedProduct>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        required: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const PurchasedProductModel = model<PurchasedProduct>('PurchasedProduct', purchasedProductSchema);

export default PurchasedProductModel;
