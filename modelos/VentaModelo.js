class Venta {
    constructor(data) {
        this.id = data.id;             // ID del producto
        this.idUsuario = data.idUsuario;     // Nombre del producto
        this.idProducto = data.idProducto;     // Precio del producto (string)
        this.fec_hora = data.fec_hora;     // Precio del producto (string)
        this.cantidad = data.cantidad; // Cantidad del producto (string)
    }

    set id(id) {
        this._id = id; // Almacena el ID del producto
    }

    set idUsuario(idUsuario) {
        this._idUsuario = idUsuario; // Almacena el nombre
    }

    set idProducto(idProducto) {
        this._idProducto = idProducto; // Almacena el precio
    }

    set fec_hora(fec_hora) {
        this._fec_hora = fec_hora; // Almacena la cantidad
    }

    set cantidad(cantidad) {
        this._cantidad = cantidad; // Almacena la cantidad
    }

    get id() {
        return this._id; // Retorna el ID del producto
    }

    get idUsuario() {
        return this._idUsuario; // Retorna el nombre del producto
    }

    get idProducto() {
        return this._idProducto; // Retorna el precio del producto
    }

    get fec_hora() {
        return this._fec_hora; // Retorna el precio del producto
    }

    get cantidad() {
        return this._cantidad; // Retorna la cantidad del producto
    }

    get getVenta() {
        const conid = {
            id: this.id,
            idUsuario: this.idUsuario,
            idProducto: this.idProducto,
            fec_hora: this.fec_hora,
            cantidad: this.cantidad
        };
        const sinid = {
            idUsuario: this.idUsuario,
            idProducto: this.idProducto,
            fec_hora: this.fec_hora,
            cantidad: this.cantidad
        };
        if (this.id === undefined) {
            return sinid; // Retorna el producto sin ID
        } else {
            return conid; // Retorna el producto con ID
        }
    }
}

module.exports = Venta; // Exporta la clase Producto