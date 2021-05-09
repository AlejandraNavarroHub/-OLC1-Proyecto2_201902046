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
class VECTOR extends Instruccion_1.Instruccion {
    constructor(linea, columna, TipoV, nombre, expresion, DIMENSION, TipoV2) {
        super(linea, columna, new TIPO_INSTRUCCION_1.default(TIPO_INSTRUCCION_1.T_INS.DECLARACION), nombre);
        this.expresion = expresion;
        this.ID = nombre;
        this.DIMENSION = DIMENSION;
        this.TipoV = TipoV;
        this.TipoV2 = TipoV2;
    }
    ejecutar(tree, table) {
        let valor = [];
        let dim = undefined;
        if (this.TipoV2) {
            if (this.TipoV.tipos !== this.TipoV2.tipos) {
                tree.newERROR("SEMANTICO", "El TIPO DE DECLARACIÓN Y ASIGNACIÓN NO COINCIDE", this.linea, this.columna);
                return;
            }
        }
        if (!(this.expresion instanceof EXPRESION_1.Expresion) && this.DIMENSION instanceof EXPRESION_1.Expresion) {
            dim = this.DIMENSION.getValor(tree, table);
            if (dim < 0) {
                tree.newERROR("SEMANTICO", "TAMAÑO DE VECTOR INVALIDO", this.linea, this.columna);
                return;
            }
            switch (this.TipoV.tipos) {
                case TIPO_1.tipos.ENTERO:
                    for (let x = 0; x < dim.valor; x++) {
                        valor[x] = 0;
                    }
                    break;
                case TIPO_1.tipos.CADENA:
                    for (let x = 0; x < dim.valor; x++) {
                        valor[x] = "";
                    }
                    break;
                case TIPO_1.tipos.BOOLEANO:
                    for (let x = 0; x < dim.valor; x++) {
                        valor[x] = true;
                    }
                    break;
                case TIPO_1.tipos.DECIMAL:
                    for (let x = 0; x < dim.valor; x++) {
                        valor[x] = 0.0;
                    }
                    break;
                case TIPO_1.tipos.CARACTER:
                    for (let x = 0; x < dim.valor; x++) {
                        valor[x] = "\x00";
                    }
                    break;
            }
        }
        else if (this.expresion) {
            let x = 0;
            for (let exp of this.expresion) {
                if (exp instanceof EXPRESION_1.Expresion) {
                    let value = exp.getValor(tree, table);
                    if (value.Tipo.tipos === this.TipoV.tipos) {
                        valor[x] = value.valor;
                    }
                    else {
                        tree.newERROR("SEMANTICO", "TIPO INADECUADO DENTRO DE LA LISTA PARA EL VECTOR", value.linea, value.columna);
                        return;
                    }
                }
                x++;
            }
        }
        let respuesta = table.set(this.ID, valor, this.TipoV, valor.length);
        if (respuesta.tipo.tipos === TIPO_1.tipos.ERROR) {
            tree.newERROR("SEMANTICO", "LA VARIABLE YA ESTA DECLARADA", this.linea, this.columna);
        }
        else if (table.nombre === "GLOBAL") {
            tree.newSimbol(this.ID, "VARIABLE", this.TipoV.tipos, table.nombre, this.linea, this.columna);
        }
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("DECLARACION");
        if (this.expresion) {
            nodo.agregarHijoS(this.TipoV.tipos);
            nodo.agregarHijoS(this.ID);
            nodo.agregarHijoS("=");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijoS(";");
        }
        else {
            nodo.agregarHijoS(this.TipoV.tipos);
            nodo.agregarHijoS(this.ID);
            nodo.agregarHijoS(";");
        }
        return nodo;
    }
}
exports.default = VECTOR;
//# sourceMappingURL=VECTOR.js.map