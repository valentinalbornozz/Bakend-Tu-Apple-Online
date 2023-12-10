import { Request, Response } from 'express';
import stripe from 'stripe';
import OrderModel from '../models/Order.model';
import PurchasedProductModel from '../models/PurchaseProduct.model';


const stripeSecretKey: string = 'sk_test_51Npt3zEFfNI88I7oKK84Qedyin7u16QIjjq8XaYPrCmax7d9hhHCwW2RX2a1Eqez2oUnSWktSNXY5q6yHUmZ3Ij200x0cPOZft';
const stripeClient = new stripe(stripeSecretKey);

interface CartItem {
    name: string;
    description: string;
    quantity: number;
    image?: string;
}

export const processPayment = async (req: Request, res: Response): Promise<void> => {
    try {
        const {
            firstName,
            lastName,
            email,
            shippingAddress,
            phone,
            stripeTokenId,
            totalAmount,
            cart,
        } = req.body;

        // Crear una orden en la base de datos
        const order = new OrderModel({
            firstName,
            lastName,
            email,
            shippingAddress,
            phone,
            stripeTokenId,
            totalAmount,
        });

        // Crear un array para almacenar los productos comprados
        const purchasedProducts = [];

        // Iterar a través del carrito del cliente y guardar los detalles de los productos
        for (const cartItem of cart as CartItem[]) {
            const { name, description, quantity, image } = cartItem;
            const purchasedProduct = new PurchasedProductModel({
                name,
                image,
                description,
                quantity,
            });
            purchasedProducts.push(purchasedProduct);
        }

        // Asignar los productos comprados a la orden
        order.products = purchasedProducts;

        // Guardar la orden y los productos comprados en la base de datos
        await Promise.all([order.save(), ...purchasedProducts.map((product) => product.save())]);

        // Realizar el cargo en Stripe
        const charge = await stripeClient.charges.create({
            amount: totalAmount * 100,
            currency: 'USD',
            source: stripeTokenId,
            description: 'Descripción del cargo',
            metadata: {
                orderId: order._id.toString(),
            },
        });

        // Verificar si el pago se realizó con éxito
        if (charge.status === 'succeeded') {
            // Redirige al usuario a la página de confirmación
            res.json({ success: true, confirmationUrl: '/confirmacion' });
        } else {
            // Si el pago falla, puedes manejarlo de acuerdo a tus necesidades
            res.json({ error: 'Error en el pago.' });
        }
    } catch (error) {
        console.error('Error al procesar el pago:', error);
        res.json({ error: 'Error al procesar el pago.' });
    }
};

export default processPayment;