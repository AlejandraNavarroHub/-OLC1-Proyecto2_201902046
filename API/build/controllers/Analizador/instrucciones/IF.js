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
const EXPRESION_1 = require("../Abstract/EXPRESION");
const TIPO_INSTRUCCION_1 = __importStar(require("../tablaSimbolo/TIPO_INSTRUCCION"));
const nodoAST_1 = require("../Abstract/nodoAST");
class IF extends Instruccion_1.Instruccion {
    constructor(linea, columna, condicion1, bloque1, bloque2, If) {
        super(linea, columna, new TIPO_INSTRUCCION_1.default(TIPO_INSTRUCCION_1.T_INS.OTROS));
        this.condicion1 = condicion1;
        this.bloque1 = bloque1;
        this.bloque2 = bloque2;
        this.IF = If;
    }
    ejecutar(tree, table) {
        let comprobar = this.condicion1.getValor(tree, table);
        if (comprobar.Tipo.tipos !== TIPO_1.tipos.ERROR) {
            if (comprobar.Tipo.tipos === TIPO_1.tipos.BOOLEANO) {
                if (comprobar.valor) {
                    for (let instruccion of this.bloque1) {
                        if (instruccion instanceof Instruccion_1.Instruccion) {
                            let res = instruccion.ejecutar(tree, table);
                            if (typeof (res) === typeof ({}) && !(res instanceof EXPRESION_1.Expresion)) {
                                if (res.nombre === "RETURN" && tree.FUNCIONES.length > 0) {
                                    return res;
                                }
                                else if ((res.nombre === "BREAK" || res.nombre === "BREAK") && tree.CICLOS.length > 0) {
                                    return res;
                                }
                            }
                        }
                    }
                }
                else if (this.IF instanceof Instruccion_1.Instruccion) {
                    return this.IF.ejecutar(tree, table);
                }
                else if (this.bloque2 instanceof Array) {
                    for (let instruccion of this.bloque2) {
                        if (instruccion instanceof Instruccion_1.Instruccion) {
                            let res = instruccion.ejecutar(tree, table);
                            if (typeof (res) === typeof ({}) && !(res instanceof EXPRESION_1.Expresion)) {
                                if (res.nombre === "RETURN" && tree.FUNCIONES.length > 0) {
                                    return res;
                                }
                                else if ((res.nombre === "BREAK" || res.nombre === "BREAK") && tree.CICLOS.length > 0) {
                                    return res;
                                }
                            }
                        }
                    }
                }
                return;
            }
            tree.newERROR("SEMANTICO", "SE ESPERABA UN BOOLEANO", this.linea, this.columna);
        }
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("SENTENCIAS DE CONTROL");
        nodo.agregarHijoS("IF");
        nodo.agregarHijo(this.condicion1.getNodo());
        let cont = new nodoAST_1.nodoAST("INSTRUCCIONES");
        for (let instrucion of this.bloque1) {
            if (instrucion instanceof Instruccion_1.Instruccion) {
                cont.agregarHijo(instrucion.getNodo());
            }
        }
        nodo.agregarHijo(cont);
        if (this.bloque2) {
            nodo.agregarHijoS("ELSE");
            let cont2 = new nodoAST_1.nodoAST("INSTRUCCIONES");
            for (let instruc of this.bloque2) {
                if (instruc instanceof Instruccion_1.Instruccion) {
                    cont.agregarHijo(instruc.getNodo());
                }
            }
            nodo.agregarHijo(cont2);
        }
        return nodo;
    }
}
exports.default = IF;
//# sourceMappingURL=IF.js.map