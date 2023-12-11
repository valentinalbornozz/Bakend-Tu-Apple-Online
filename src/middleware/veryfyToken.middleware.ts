import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { Document } from 'mongoose';

// Define una interfaz que combina JwtPayload y el tipo esperado por req.user
interface CustomUser extends JwtPayload, Document { }

const secret = 'secreto';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // Obtenemos el token del encabezado HTTP de la solicitud
        const token = req.headers["authorization"]?.split(" ")[1];

        // Verificamos si se proporcionó un token
        if (token) {
            // Utilizamos el método 'verify' de 'jsonwebtoken' para verificar el token
            const decoded = jwt.verify(token, secret) as CustomUser;

            // Adjuntamos los datos del usuario decodificados al objeto 'req' para su uso posterior
            req.user = decoded;

            // Llamamos a 'next()' para permitir que la solicitud continúe hacia el siguiente middleware o controlador
            next();
        } else {
            // Si no se proporciona un token en el encabezado, respondemos con un estado 401 y un mensaje indicando que se debe enviar un token
            res.status(401).json({ mensaje: "Token no proporcionado" });
        }
    } catch (error) {
        // Si hay un error en la verificación, respondemos con un estado 401 y un mensaje de token inválido
        res.status(401).json({ mensaje: "Token inválido" });
    }
};

export default verifyToken;
