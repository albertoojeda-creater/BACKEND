const ventasBD = require("./conexion").ventas; // Asumiendo que tienes una colección de productos
const Venta = require("../modelos/VentaModelo"); // Importa el modelo de Producto

// Función para validar datos del producto
function validarDatos(venta) {
    var valido = false;
    if (usuario.id !== undefined && producto.id !== undefined && venta.fec_hora !== undefined && venta.cantidad !== undefined) {
        valido = true;
    }
    return valido;
}

// Mostrar todos los productos
async function mostrarVentas() {
    const ventas = await ventasBD.get();
    var ventasValidas = [];
    ventas.forEach(venta => {
        const venta1 = new Venta({ id: venta.id, ...venta.data() });
        if (validarDatos(venta1.getVenta)) {
            ventasValidas.push(venta1.getVenta);
        }
    });
    return ventasValidas;
}

// Buscar producto por ID
async function busXId(id) {
    const venta = await ventasBD.doc(id).get();
    const venta1 = new Venta({ id: venta.id, ...venta.data() });
    var ventaValida;
    if (validarDatos(venta1.getVenta)) {
        ventaValida = venta1.getVenta;
    }
    return ventaValida;
}

// Crear un nuevo producto
async function newSale(data) {
    const venta1 = new Venta(data);
    var ventaValida = false;
    if (validarDatos(venta1.getVenta)) {
        await ventasBD.doc().set(venta1.getVenta);
        ventaValida = true;
    }
    return ventaValida;
}

// Borrar producto por ID
async function cancelSale(id) {
    var ventaValida = await busXId(id);
    var ventaValida = false;
    if (ventaValida) {
        await ventasBD.doc(id).delete();
        ventaValida = true;
    }
    return productoBorrado;
}

module.exports = {
    mostrarVentas,
    busXId,
    cancelSale,
    newSale
};