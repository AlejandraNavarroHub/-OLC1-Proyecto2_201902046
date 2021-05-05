"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const EXPRESION_1 = require("../Abstract/EXPRESION");
class Primitivo extends EXPRESION_1.Expresion {
    constructor(tipo, valor, linea, columna) {
        super(linea, columna, valor, tipo);
    }
    getValor(tree, table) {
        return this.valor;
    }
    getNodo() {
        throw new Error("Method not implemented.");
    }
}
exports.default = Primitivo;
//# sourceMappingURL=PRIMITIVO.js.map