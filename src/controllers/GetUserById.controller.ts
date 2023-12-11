import { Request, Response } from 'express';
import UsuarioModel from '../models/User.model';

const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extraer la ID del usuario desde el objeto 'req.user'
        const { id } = req.user as { id: string };

        // Verificar si la ID tiene una longitud válida (en este caso, 24 caracteres)
        if (id.length === 24) {
            // Buscar un usuario por su ID en la base de datos
            const usuario = await UsuarioModel.findById(id);

            if (!usuario) {
                // Si no se encuentra ningún usuario con esa ID, responder con un mensaje
                res.json({
                    message: 'No se encontró ningún usuario con esa ID',
                });
            } else {
                // Si se encuentra el usuario, extraer información sensible y responder con el resto de los datos
                const { _id, password, __v, ...resto } = usuario.toObject();
                res.json(resto);
            }
        } else {
            // Si la ID no tiene la longitud esperada, responder con un mensaje de error
            res.json({ message: 'Estás enviando una contraseña incorrecta' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};

export default getUserById;
