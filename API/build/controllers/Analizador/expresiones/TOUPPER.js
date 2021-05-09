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
class Tolower extends EXPRESION_1.Expresion {
    constructor(linea, columna, simbolo, exp) {
        super(linea, columna, undefined, new TIPO_1.default(TIPO_1.tipos.CADENA));
        this.exp = exp;
        this.simbolo = simbolo;
    }
    getValor(tree, table) {
        let valor1 = this.exp.getValor(tree, table);
        if (valor1.Tipo.getTipos() === TIPO_1.tipos.CADENA) {
            let nueva = new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), valor1.valor.toUpperCase(), this.linea, this.columna);
            table.update(this.exp.ID, nueva);
            return nueva;
        }
        else {
            tree.newERROR("SEMANTICO", "TOUPPER ES SOLO PARA VARIABLES TIPO STRING", this.linea, this.columna);
            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
        }
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("TOUPPER");
        nodo.agregarHijoS(this.simbolo);
        nodo.agregarHijo(this.exp.getNodo());
        return nodo;
    }
}
exports.default = Tolower;
//# sourceMappingURL=TOUPPER.js.map