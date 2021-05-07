"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EXPRESION_1 = require("../Abstract/EXPRESION");
const TIPO_1 = require("../tablaSimbolo/TIPO");
class Primitivo extends EXPRESION_1.Expresion {
    constructor(tipo, valor, linea, columna) {
        switch (tipo.getTipos()) {
            case TIPO_1.tipos.ENTERO:
                valor = Number(valor);
                break;
            case TIPO_1.tipos.BOOLEANO:
                if (valor.valor.toUpperCase() == "TRUE") {
                    valor.valor = true;
                }
                else {
                    valor.valor = false;
                }
                break;
            case TIPO_1.tipos.DECIMAL:
                valor = Number(valor);
        }
        super(linea, columna, valor, tipo);
    }
    getValor(tree, table) {
        return this;
    }
    getNodo() {
        throw new Error("Method not implemented.");
    }
}
exports.default = Primitivo;
//# sourceMappingURL=PRIMITIVO.js.map