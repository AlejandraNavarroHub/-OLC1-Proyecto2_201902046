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
const Instruccion_1 = require("../Abstract/Instruccion");
const ENTORNO_1 = __importDefault(require("../tablaSimbolo/ENTORNO"));
const TIPO_1 = require("../tablaSimbolo/TIPO");
const TIPO_INSTRUCCION_1 = __importStar(require("../tablaSimbolo/TIPO_INSTRUCCION"));
const nodoAST_1 = require("../Abstract/nodoAST");
class FOR extends Instruccion_1.Instruccion {
    constructor(linea, columna, DECLARACION, CONDICION, ACTUALIZACION, BLOQUE) {
        super(linea, columna, new TIPO_INSTRUCCION_1.default(TIPO_INSTRUCCION_1.T_INS.OTROS));
        this.DECLARACION = DECLARACION;
        this.ACTUALIZACION = ACTUALIZACION;
        this.CONDICION = CONDICION;
        this.BLOQUE = BLOQUE;
    }
    ejecutar(tree, table) {
        let nuevo_entorno = new ENTORNO_1.default("", table);
        let entorno_For = new ENTORNO_1.default("", nuevo_entorno);
        let comprobar = undefined;
        if (this.DECLARACION.TIPO.getTipos() === TIPO_INSTRUCCION_1.T_INS.DECLARACION) {
            this.DECLARACION.ejecutar(tree, nuevo_entorno);
            comprobar = this.CONDICION.getValor(tree, nuevo_entorno);
        }
        else {
            this.DECLARACION.ejecutar(tree, table);
            comprobar = this.CONDICION.getValor(tree, table);
        }
        if (comprobar.Tipo.getTipos() !== TIPO_1.tipos.ERROR) {
            if (comprobar.Tipo.getTipos() === TIPO_1.tipos.BOOLEANO) {
                tree.CICLOS.push("CICLO");
                while (comprobar.valor) {
                    entorno_For = new ENTORNO_1.default("", nuevo_entorno);
                    for (let instruccion of this.BLOQUE) {
                        if (instruccion instanceof Instruccion_1.Instruccion) {
                            let res = instruccion.ejecutar(tree, entorno_For);
                            try {
                                if (res.nombre === "BREAK") {
                                    tree.CICLOS.pop();
                                    return;
                                }
                                if (res.nombre === "CONTINUE") {
                                    break;
                                }
                                if (res.nombre === "RETURN") {
                                    tree.CICLOS.pop();
                                    return res;
                                }
                            }
                            catch (e) { }
                        }
                    }
                    if (this.DECLARACION.TIPO.getTipos() === TIPO_INSTRUCCION_1.T_INS.DECLARACION) {
                        comprobar = this.ACTUALIZACION.getValor(tree, nuevo_entorno);
                        comprobar = this.CONDICION.getValor(tree, nuevo_entorno);
                    }
                    else {
                        comprobar = this.ACTUALIZACION.getValor(tree, table);
                        comprobar = this.CONDICION.getValor(tree, table);
                    }
                }
                tree.CICLOS.pop();
                return;
            }
            tree.newERROR("SEMANTICO", "SE ESPERABA UN BOOLEANO", this.linea, this.columna);
        }
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("IMPRIMIR");
        return nodo;
    }
}
exports.default = FOR;
//# sourceMappingURL=FOR.js.map