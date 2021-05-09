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
const TIPO_1 = __importStar(require("../tablaSimbolo/TIPO"));
const TIPO_INSTRUCCION_1 = __importStar(require("../tablaSimbolo/TIPO_INSTRUCCION"));
const nodoAST_1 = require("../Abstract/nodoAST");
class FUNCION extends Instruccion_1.Instruccion {
    constructor(linea, columna, tipo, ID, BLOQUE, PARAMETROS) {
        super(linea, columna, new TIPO_INSTRUCCION_1.default(TIPO_INSTRUCCION_1.T_INS.OTROS), ID);
        this.PARAMETROS = PARAMETROS;
        this.BLOQUE = BLOQUE;
        this.TIPOV = tipo;
    }
    ejecutar(tree, table) {
        let comprobar = undefined;
        if (this.TIPOV.getTipos() !== TIPO_1.tipos.ERROR) {
            comprobar = table.set(this.ID, this, this.TIPOV);
        }
        else {
            comprobar = table.set(this.ID, this, new TIPO_1.default(TIPO_1.tipos.CADENA));
        }
        if (comprobar.tipo.getTipos() === TIPO_1.tipos.ERROR) {
            tree.newERROR("SEMANTICO", "FUNCIÓN O VARIABLE YA DECLARADA", this.linea, this.columna);
        }
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("IMPRIMIR");
        return nodo;
    }
}
exports.default = FUNCION;
//# sourceMappingURL=FUNCION.js.map