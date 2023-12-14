# Tu Apple Online - Tienda en Línea de Apple Backend

## Descripción
Backend desarrollado para el backend del ecommerce del repositorio "tu apple online en react" con typescript, donde tenemos todo el desarrollo del backend con la conexión a la base de datos, controladores para el login, registro, obtener el usuario por id, el procesador de pago para realizar el pago mediante stripe utilziando la api del mismo.

## EndPoints
Aquí están los endpoints correspondientes a cada ruta:

1. Registro de usuarios:
 ```
Método: POST
Endpoint: /register
Datos esperados en el cuerpo de la solicitud (req.body):
Datos necesarios para el registro de usuarios, manejados por el controlador controllers.register.
 ```
La siguiente ruta es para el registro del cliente
```
http://localhost:3000/register
```


2. Inicio de sesión de usuarios:
 ```
Método: POST
Endpoint: /login
Datos esperados en el cuerpo de la solicitud (req.body):
Datos necesarios para el inicio de sesión de usuarios, manejados por el controlador controllers.login.
```
La siguiente ruta es para iniciar sesion el cliente
```
http://localhost:3000/login
```
3. Obtener usuario por ID (ruta protegida):
 ```
Método: GET
Endpoint: /user/:id
Parámetros de ruta:
id: Identificador único del usuario.
Middleware de autenticación: verifyToken
Datos esperados en el cuerpo de la solicitud (req.body):
No se espera ningún dato en el cuerpo de la solicitud.
Este endpoint está protegido y requiere un token válido para acceder, gracias al middleware verifyToken.
 ```
La siguiente ruta es para obtener el id del cliente
```
http://localhost:3000/user/(aquí va el id del cliente) y se le tiene que pasar el token generado una vez inicie sesion
```
La siguiente ruta es para la actualización del email
```
http://localhost:3000/api/profile/update-email/(aqui va el id del usuario registrado)
```
### Para probar cada enpoint siguiente se le tiene que pasar el token del usuario una vez iniciado sesión
4.Actualizar perfil del usuario (rutas protegidas):
 ```
Prefijo del Endpoint: /api/profile
Middleware de autenticación: verifyToken
Rutas incluidas:
Actualizar nombre: PUT /update-name/:userId (definida en profileRoutes)
Actualizar correo electrónico: PUT /update-email/:userId (definida en profileRoutes)
Actualizar contraseña: PUT /update-password/:userId (definida en profileRoutes)
Datos esperados en el cuerpo de la solicitud (req.body):
Datos necesarios para las actualizaciones de perfil, manejados por las respectivas funciones del controlador.
 ```
La siguiente ruta es para la actualización del nombre del cliente
```
http://localhost:3000/api/profile/update-name/(aqui va el id del usuario registrado, y deberan pasarle el token en el header para que se pueda cambiar)
```
La siguiente ruta es para la actualización del email
```
http://localhost:3000/api/profile/update-email/(aqui va el id del usuario registrado, y deberan pasarle el token en el header para que se pueda cambiar)
```
La siguiente ruta es para la actualización de la password del cliente
```
http://localhost:3000/api/profile/update-password/(aqui va el id del usuario registrado, y deberan pasarle el token en el header para que se pueda cambiar)
```

5. Procesar pago utilizando Stripe:
 ```
Método: POST
Endpoint: /procesar_pago
Datos esperados en el cuerpo de la solicitud (req.body):
Datos necesarios para procesar el pago, manejados por el controlador controllers.processPayment.
 ```
La siguiente ruta es para poder procesar el pago de los productos
```
http://localhost:3000/procesar_pago
```

## Instrucciones de uso
1. Primero clonar el repositorio en tu pc
2. Segundo utilziar el siguiente comando para instalar dependencias
   ```
   npm i / npm install
   ```
3. Tercero utilizar el sigueinte comando para iniciar el server
   ```
   npm run dev
   ```
4. Abre tu navegador y visita http://localhost:3000 para ver el sitio web en acción.
5. Explora el catálogo de productos, agrega productos al carrito y realiza compras como usuario.

6. Tecnologías Utilizadas:
  Node.js,
  TypeScript,
  MongoDB,
  JsonWebToken,
