import express, { Express } from "express";
import { connectDB } from "../config/database";
import controllers from "../controllers/Index.controller";
import verifyToken from '../middleware/veryfyToken.middleware'; // Corregir el nombre del middleware
import profileRoutes from "../routes/Profile.routes";
import cors from "cors";
import * as dotenv from 'dotenv';
dotenv.config();


export class Server {
    app: Express;

    constructor() {
        this.app = express();
        this.setupMiddleware();
        this.setupRoutes();
        this.connectionDB();
    }

    setupMiddleware(): void {
        this.app.use(cors());
        this.app.use(express.json());
    }

    setupRoutes(): void {
        // Rutas públicas, sin autenticación
        // Ruta para registro de usuarios
        this.app.post("/register", express.json(), controllers.register);
        // Ruta para inicio de sesión de usuarios
        this.app.post("/login", express.json(), controllers.login);

        // Rutas protegidas, requieren autenticación
        // Ruta que obtiene el token
        this.app.get("/user/:id", verifyToken, express.json(), controllers.getUserById);

        // Rutas para cambiar contraseña, nombre y correo electrónico
        // Se incluye middleware verifyToken para verificar la autenticación
        this.app.use("/api/profile", verifyToken, express.json(), profileRoutes);

        // Ruta para crear un pago utilizando Stripe
        this.app.post("/procesar_pago", express.json(), controllers.processPayment);
    }

    async connectionDB(): Promise<void> {
        await connectDB();
    }

    listen(): void {
        const PORT = process.env.PORT;
        this.app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    }
}
