import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import UsuarioModel from '../models/User.model';
import jwt from 'jsonwebtoken';

const secret: string = 'secreto'; // Reemplaza 'tu_clave_secreta' con tu clave secreta real

const login = async (req: Request, res: Response): Promise<void> => {
    try {
        // Extraer el email y la contraseña del cuerpo de la solicitud (req.body)
        const { email, password } = req.body;

        // Buscar un usuario en la base de datos por su dirección de correo electrónico
        const usuario = await UsuarioModel.findOne({ email });

        if (!usuario) {
            // Si no se encuentra un usuario con el correo proporcionado, responder con un mensaje de error
            res.status(404).json({ message: 'Correo no registrado' });
            return;
        }

        // Comparar la contraseña proporcionada con la contraseña almacenada en la base de datos
        const esCorrecta = await bcrypt.compare(password, usuario.password);

        if (esCorrecta) {
            // Si la contraseña es correcta, extraer el ID y el nombre del usuario
            const { _id: id, nombre } = usuario;

            // Crear un objeto de datos que se utilizará para firmar el token JWT
            const data = {
                id,
                nombre,
            };

            // Generar un token JWT firmado con la clave secreta y configurar su tiempo de expiración (24 horas)
            const token = jwt.sign(data, secret, {
                expiresIn: '24h',
            });

            // Responder con un mensaje de éxito y los datos del usuario junto con el token JWT
            res.status(200).json({
                message: 'Usuario logeado correctamente',
                usuario: {
                    id,
                    nombre,
                    token,
                },
            });
        } else {
            // Si la contraseña no es correcta, responder con un mensaje de error
            res.status(401).json({ message: 'Contraseña incorrecta' });
        }
    } catch (error: any) {
        // Manejo de errores: responder con un estado 500 y un mensaje de error en caso de fallo
        res.status(500).json({ message: 'Error en el servidor', error: error.message });
    }
};

export default login;
