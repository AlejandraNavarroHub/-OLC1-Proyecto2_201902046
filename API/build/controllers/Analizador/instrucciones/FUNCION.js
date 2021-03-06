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
        if (this.TIPOV.tipos !== TIPO_1.tipos.ERROR) {
            comprobar = table.set(this.ID, this, this.TIPOV);
        }
        else {
            comprobar = table.set(this.ID, this, new TIPO_1.default(TIPO_1.tipos.CADENA));
        }
        if (comprobar.tipo.tipos === TIPO_1.tipos.ERROR) {
            tree.newERROR("SEMANTICO", "FUNCIÓN O VARIABLE YA DECLARADA", this.linea, this.columna);
        }
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("FUNCION");
        if (this.TIPOV.getTipos() !== TIPO_1.tipos.ERROR) {
            nodo.agregarHijoS(this.TIPOV.getTipos());
            nodo.agregarHijoS(this.ID);
            if (this.PARAMETROS) {
                nodo.agregarHijo(this.PARAMETROS.getnode());
            }
        }
        else {
            nodo.agregarHijoS("VOID");
            nodo.agregarHijoS(this.ID);
            if (this.PARAMETROS) {
                nodo.agregarHijo(this.PARAMETROS.getnode());
            }
        }
        let cont = new nodoAST_1.nodoAST("INSTRUCCIONES");
        for (let instrucion of this.BLOQUE) {
            if (instrucion instanceof Instruccion_1.Instruccion) {
                cont.agregarHijo(instrucion.getNodo());
            }
        }
        nodo.agregarHijo(cont);
        return nodo;
    }
}
exports.default = FUNCION;
//# sourceMappingURL=FUNCION.js.map