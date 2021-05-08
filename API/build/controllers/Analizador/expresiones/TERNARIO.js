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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const EXPRESION_1 = require("../Abstract/EXPRESION");
const TIPO_1 = __importStar(require("../tablaSimbolo/TIPO"));
const nodoAST_1 = require("../Abstract/nodoAST");
const PRIMITIVO_1 = __importDefault(require("./PRIMITIVO"));
class Ternario extends EXPRESION_1.Expresion {
    constructor(linea, columna, exp1, exp2, exp3) {
        super(linea, columna, undefined, new TIPO_1.default(TIPO_1.tipos.ENTERO));
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.exp3 = exp3;
    }
    getValor(tree, table) {
        let comprobar = this.exp1.getValor(tree, table);
        if (comprobar.Tipo.getTipos() !== TIPO_1.tipos.ERROR) {
            if (comprobar.Tipo.getTipos() === TIPO_1.tipos.BOOLEANO) {
                if (comprobar.valor) {
                    let valor = this.exp2.getValor(tree, table);
                    if (valor.Tipo.getTipos() !== TIPO_1.tipos.ERROR) {
                        return valor;
                    }
                }
                else {
                    let valor = this.exp3.getValor(tree, table);
                    if (valor.Tipo.getTipos() !== TIPO_1.tipos.ERROR) {
                        return valor;
                    }
                }
                return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
            }
            tree.newERROR("SEMANTICO", "EL PRIMER VALOR DE UN TERNARIO DEBE SER UN BOOLEANO", this.linea, this.columna);
            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
        }
        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("TERNARIO");
        nodo.agregarHijo(this.exp1.getNodo());
        nodo.agregarHijoS("?");
        nodo.agregarHijo(this.exp2.getNodo());
        nodo.agregarHijoS(":");
        nodo.agregarHijo(this.exp3.getNodo());
        nodo.agregarHijoS(";");
        return nodo;
    }
}
exports.default = Ternario;
//# sourceMappingURL=TERNARIO.js.map