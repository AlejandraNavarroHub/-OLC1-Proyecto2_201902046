"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Simbolo {
    constructor(tipo, identificador, valor, DIMENSION, CANTIDAD) {
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
        this.DIMENSION = DIMENSION;
        this.TAMAÑO = CANTIDAD;
    }
    getIdentificador() {
        return this.identificador;
    }
}
exports.default = Simbolo;
//# sourceMappingURL=SIMBOLO.js.map