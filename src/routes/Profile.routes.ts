import express, { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import User from '../models/User.model';

const router = express.Router();

// Ruta para actualizar el nombre del usuario
router.put("/update-name/:userId", async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { newName } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { nombre: newName },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        res.json({ message: "Nombre actualizado con éxito", usuario: updatedUser });
    } catch (error: any) {
        res.status(500).json({ message: "Error al actualizar el nombre", error: error.message });
    }
});

// Ruta para actualizar el correo electrónico del usuario
router.put("/update-email/:userId", async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { newEmail } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { email: newEmail },
            { new: true }
        );

        res.json({
            message: "Correo electrónico actualizado con éxito",
            usuario: updatedUser,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Error al actualizar el correo electrónico",
            error: error.message,
        });
    }
});

// Ruta para actualizar la contraseña del usuario
router.put("/update-password/:userId", async (req: Request, res: Response) => {
    try {
        const { userId } = req.params;
        const { currentPassword, newPassword } = req.body;

        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        const isPasswordValid = await bcrypt.compare(
            currentPassword,
            user.password
        );

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Contraseña actual incorrecta" });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
        );

        res.json({
            message: "Contraseña actualizada con éxito",
            usuario: updatedUser,
        });
    } catch (error: any) {
        res.status(500).json({
            message: "Error al actualizar la contraseña",
            error: error.message,
        });
    }
});

export default router;
