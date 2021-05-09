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
const EXPRESION_1 = require("../Abstract/EXPRESION");
const TIPO_INSTRUCCION_1 = __importStar(require("../tablaSimbolo/TIPO_INSTRUCCION"));
const nodoAST_1 = require("../Abstract/nodoAST");
class DO extends Instruccion_1.Instruccion {
    constructor(linea, columna, condicion, bloque) {
        super(linea, columna, new TIPO_INSTRUCCION_1.default(TIPO_INSTRUCCION_1.T_INS.OTROS));
        this.condicion = condicion;
        this.bloque = bloque;
    }
    ejecutar(tree, table) {
        let comprobar = this.condicion.getValor(tree, table);
        if (comprobar.Tipo.tipos !== TIPO_1.tipos.ERROR) {
            if (comprobar.Tipo.tipos === TIPO_1.tipos.BOOLEANO) {
                tree.CICLOS.push("CICLO");
                let nuevo_entorno = new ENTORNO_1.default("", table);
                //DO
                for (let instruccion of this.bloque) {
                    if (instruccion instanceof Instruccion_1.Instruccion) {
                        let res = instruccion.ejecutar(tree, nuevo_entorno);
                        if (typeof (res) === typeof ({}) && !(res instanceof EXPRESION_1.Expresion)) {
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
                    }
                }
                comprobar = this.condicion.getValor(tree, table);
                //*****WHILE******/
                while (comprobar.valor) {
                    nuevo_entorno = new ENTORNO_1.default("", table);
                    for (let instruccion of this.bloque) {
                        if (instruccion instanceof Instruccion_1.Instruccion) {
                            let res = instruccion.ejecutar(tree, nuevo_entorno);
                            if (typeof (res) === typeof ({}) && !(res instanceof EXPRESION_1.Expresion)) {
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
                        }
                    }
                    comprobar = this.condicion.getValor(tree, table);
                }
                tree.CICLOS.pop();
                return;
            }
            tree.newERROR("SEMANTICO", "SE ESPERABA UN BOOLEANO", this.linea, this.columna);
        }
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("SENTENIA CICLICA");
        nodo.agregarHijoS("DO");
        let cont = new nodoAST_1.nodoAST("INSTRUCCIONES");
        for (let instrucion of this.bloque) {
            if (instrucion instanceof Instruccion_1.Instruccion) {
                cont.agregarHijo(instrucion.getNodo());
            }
        }
        nodo.agregarHijo(cont);
        nodo.agregarHijoS("while");
        nodo.agregarHijo(this.condicion.getNodo());
        return nodo;
    }
}
exports.default = DO;
//# sourceMappingURL=DO.js.map