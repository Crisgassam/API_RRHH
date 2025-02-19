// server/index.js
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


//Arranco la aplicación express
const app = express();
//Puerto que vamos a utilizar, necesitamos un fichero con un avariable de entorno que nos diga que puerto  vamos a utilizar
const PORT = process.env.PORT || 80;

// Recrear __dirname usando import.meta.url
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware para servir archivos estáticos del cliente (html, css, js, imágenes...)
app.use(express.static(path.join(__dirname, '../cliente')));

// Middleware para parsear el cuerpo de las solicitudes como JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas de la API
// app.get('/json', (req, res) => {
//   res.json({ tipo: 'saludo', 'mensaje': '¡Hola caracola!' });
// });

// app.get('/', (req, res) => {
//    res.sendFile(path.join(__dirname, '../cliente/index.html'));
// });

// Manejar todas las demás rutas y devolver un mensaje HTML
// app.get('*', (req, res) => {
//   res.send('<h1>Hola caracola!</h1>');
// });

//Las rutas para los usuarios
import usuarioRoutes from './routes/usuarioRoutes.js'; 
app.use("/api/usuario",usuarioRoutes);

//Las rutas para el login
import loginRoutes from './routes/loginRoutes.js';
app.use("/api/login", loginRoutes);

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// Base de datos
import { dbPromise } from './database/database.js';

// Asegurar de que la base de datos está inicializada antes de iniciar el servidor
dbPromise.then(() => {
  app.listen(PORT, () => {
    console.log(`El servidor se está ejecutando en http://localhost:${PORT}`);
  });
}).catch((err) => {
  console.error('Error al inicializar la base de datos', err);
  process.exit(1);
});
