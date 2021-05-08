"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EXPRESION_1 = require("../Abstract/EXPRESION");
const TIPO_1 = require("../tablaSimbolo/TIPO");
class Primitivo extends EXPRESION_1.Expresion {
    constructor(tipo, valor, linea, columna) {
        if (typeof (valor) === typeof ("")) {
            switch (tipo.getTipos()) {
                case TIPO_1.tipos.ENTERO:
                    valor = Number(valor);
                    break;
                case TIPO_1.tipos.BOOLEANO:
                    if (valor.toUpperCase() === "TRUE") {
                        valor = true;
                    }
                    else {
                        valor = false;
                    }
                    break;
                case TIPO_1.tipos.DECIMAL:
                    valor = Number(valor);
                    break;
            }
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