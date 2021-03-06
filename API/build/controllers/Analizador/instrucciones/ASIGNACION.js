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
class Asignar_valor extends Instruccion_1.Instruccion {
    constructor(linea, columna, nombre, exp) {
        super(linea, columna, new TIPO_INSTRUCCION_1.default(TIPO_INSTRUCCION_1.T_INS.ASIGNACION), nombre);
        this.exp = exp;
        this.ID = nombre;
    }
    ejecutar(tree, table) {
        let vari = table.get(this.ID);
        let valor = undefined;
        if (vari.tipo.tipos !== TIPO_1.tipos.ERROR) {
            if (this.exp) {
                valor = this.exp.getValor(tree, table);
                if (valor.Tipo.tipos !== TIPO_1.tipos.ERROR) {
                    if (vari.tipo.tipos !== valor.Tipo.tipos && vari.tipo.tipos !== TIPO_1.tipos.ENTERO
                        && valor.Tipo.tipos !== TIPO_1.tipos.DECIMAL && vari.tipo.tipos !== TIPO_1.tipos.DECIMAL
                        && valor.Tipo.tipos !== TIPO_1.tipos.ENTERO) {
                        tree.newERROR("SEMANTICO", "EL TIPO DE LA EXPRESI??N NO COINCIDE CON EL DE LA VARIABLE", this.linea, this.columna);
                        return;
                    }
                    let respuesta = table.update(this.ID, valor);
                    if (!respuesta) {
                        tree.newERROR("SEMANTICO", "LA VARIABLE NO EXISTE", this.linea, this.columna);
                    }
                    return;
                }
            }
        }
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("ASIGNCACI??N");
        nodo.agregarHijoS(this.ID);
        nodo.agregarHijoS("=");
        nodo.agregarHijo(this.exp.getNodo());
        nodo.agregarHijoS(";");
        return nodo;
    }
}
exports.default = Asignar_valor;
//# sourceMappingURL=ASIGNACION.js.map