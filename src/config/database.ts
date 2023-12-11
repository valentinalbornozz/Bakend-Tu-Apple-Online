import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
export const connectDB = async (): Promise<void> => {
    try {
        const mongodbUri = process.env.MONGODB_URI;

        if (!mongodbUri) {
            throw new Error("La variable MONGODB_URI no está definida en el archivo .env");
        }

        await mongoose.connect(mongodbUri, {
        });
        console.log('Online database')
    } catch (error) {
        console.log(error);
        throw new Error('Error starting database')
    };
}