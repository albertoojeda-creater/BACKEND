const ventasBD = require("./conexion").ventas;
const usuarioBD = require("./conexion").usuarios; // Asumiendo que esto es correcto
const productoBD = require("./conexion").productos; // Asumiendo que esto es correcto
const Venta = require("../modelos/VentaModelo"); // Importa el modelo de Producto

// Función para validar datos del producto
function validarDatos(venta, usuario, producto) {
    /*console.log(venta);
    console.log(usuario);
    console.log(producto);*/

    console.log(usuario && usuario.id !== undefined && 
        producto && producto.id !== undefined && 
        venta && venta.fec_hora !== undefined && 
        venta.cantidad !== undefined);
    return usuario && usuario.id !== undefined && 
           producto && producto.id !== undefined && 
           venta && venta.fec_hora !== undefined && 
           venta.cantidad !== undefined;
}

// Mostrar todas las ventas
async function mostrarVentas() {
    const ventas = await ventasBD.get();
    //console.log(ventas);
    ventasValidas = [];
    
    ventas.forEach(async (venta) => {
        //console.log(venta.data());
        const venta1 = new Venta({ id: venta.id, ...venta.data() });
        
        // Obtener usuario y producto
        const usuario1 = await usuarioBD.doc(venta1.idUsuario).get(); // Suponiendo que tienes el ID del usuario en `venta1`
        const producto1 = await productoBD.doc(venta1.idProducto).get(); // Suponiendo que tienes el ID del producto en `venta1`
        /*console.log(usuario1);
        console.log(producto1);*/
        const usuario = usuario1.data(); // Obtener datos del usuario
        const producto = producto1.data(); // Obtener datos del producto

        // Validar datos y agregar nombre en lugar de ID
        if (validarDatos(venta1.getVenta, usuario, producto)) {
            console.log("Ajslk");
            const ventaConNombres = {
                ...venta1.getVenta,
                usuarioNombre: usuario.nombre, // Asumiendo que el campo del nombre es `nombre`
                productoNombre: producto.nombre // Asumiendo que el campo del nombre es `nombre`
            };
            //console.log(ventaConNombres);
            ventasValidas.push(ventaConNombres);
        }
    });
    //console.log(ventasValidas);
    return ventasValidas;
}

// Buscar venta por ID
async function busXId(id) {
    const venta = await ventasBD.doc(id).get();
    const venta1 = new Venta({ id: venta.id, ...venta.data() });

    const usuario = await usuarioBD.doc(venta1.usuarioId).get();
    const producto = await productoBD.doc(venta1.productoId).get();

    if (validarDatos(venta1.getVenta, usuario.data(), producto.data())) {
        return {
            ...venta1.getVenta,
            usuarioNombre: usuario.data().nombre, // Asumiendo que el campo del nombre es `nombre`
            productoNombre: producto.data().nombre // Asumiendo que el campo del nombre es `nombre`
        };
    }
    
    return null; // O un objeto que indique que no es válida
}

// Crear un nuevo producto
async function newSale(data) {
    const venta1 = new Venta(data);
    let ventaValida = false;
    
    const usuario = await usuarioBD.doc(data.usuarioId).get();
    const producto = await productoBD.doc(data.productoId).get();

    if (validarDatos(venta1.getVenta, usuario.data(), producto.data())) {
        await ventasBD.doc().set(venta1.getVenta);
        ventaValida = true;
    }

    return ventaValida; // Retornar si la venta fue válida o no
}

// Borrar venta por ID
async function cancelSale(id) {
    const ventaValida = await busXId(id);
    
    if (ventaValida) {
        await ventasBD.doc(id).delete();
        return true;
    }
    
    return false; // Si no fue válida
}

module.exports = {
    mostrarVentas,
    busXId,
    cancelSale,
    newSale
};