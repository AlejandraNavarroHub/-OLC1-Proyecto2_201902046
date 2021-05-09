"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const Instruccion_1 = require("../Abstract/Instruccion");
const TIPO_1 = require("../tablaSimbolo/TIPO");
const TIPO_INSTRUCCION_1 = __importStar(require("../tablaSimbolo/TIPO_INSTRUCCION"));
const nodoAST_1 = require("../Abstract/nodoAST");
class Imprimir extends Instruccion_1.Instruccion {
    constructor(expresion, linea, columna) {
        super(linea, columna, new TIPO_INSTRUCCION_1.default(TIPO_INSTRUCCION_1.T_INS.OTROS));
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }
    ejecutar(tree, table) {
        var value = this.expresion.getValor(tree, table);
        if (value.Tipo.tipos === TIPO_1.tipos.ERROR) {
            return;
        }
        tree.updateConsola(value.valor + "");
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("IMPRIMIR");
        nodo.agregarHijoS("PRINT");
        nodo.agregarHijo(this.expresion.getNodo());
        nodo.agregarHijoS(";");
        return nodo;
    }
}
exports.default = Imprimir;
//# sourceMappingURL=IMPRIMIR.js.map