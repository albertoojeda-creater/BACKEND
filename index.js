const express = require("express");
const usuariosRutas = require("./routes/rutasUsuarios");
const productosRutas = require("./routes/rutasProductos");

const app = express();

// Middleware para procesar datos de formularios y JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Cargar rutas
app.use("/", usuariosRutas);
app.use("/productos", productosRutas); // Cargar rutas de productos

// Configuración del puerto
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Servidor en http://localhost:${port}`);
});
