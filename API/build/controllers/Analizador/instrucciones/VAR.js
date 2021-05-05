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
const TIPO_1 = require("../tablaSimbolo/TIPO");
const EXPRESION_1 = require("../Abstract/EXPRESION");
const TIPO_INSTRUCCION_1 = __importStar(require("../tablaSimbolo/TIPO_INSTRUCCION"));
const SIMBOLO_1 = __importDefault(require("../tablaSimbolo/SIMBOLO"));
class VARIABLES extends Instruccion_1.Instruccion {
    constructor(linea, columna, TipoV, nombre, expresion) {
        super(linea, columna, new TIPO_INSTRUCCION_1.default(TIPO_INSTRUCCION_1.T_INS.DECLARACION));
        this.expresion = expresion;
        this.ID = nombre;
        this.TipoV = TipoV;
    }
    ejecutar(tree, table) {
        let valor = undefined;
        if (!(this.expresion instanceof EXPRESION_1.Expresion)) {
            switch (this.TipoV.getTipos()) {
                case TIPO_1.tipos.ENTERO:
                    valor = 0;
                    break;
                case TIPO_1.tipos.CADENA:
                    valor = '\x00';
                    break;
                case TIPO_1.tipos.BOOLEANO:
                    valor = true;
                    break;
                case TIPO_1.tipos.DECIMAL:
                    valor = 0.0;
                    break;
                case TIPO_1.tipos.CARACTER:
                    valor = "";
                    break;
            }
        }
        else {
            if (this.TipoV.getTipos() !== this.expresion.Tipo.getTipos() &&
                this.TipoV.getTipos() !== TIPO_1.tipos.ENTERO && this.expresion.Tipo.getTipos() !== TIPO_1.tipos.DECIMAL
                && this.TipoV.getTipos() !== TIPO_1.tipos.DECIMAL && this.expresion.Tipo.getTipos() !== TIPO_1.tipos.ENTERO) {
                tree.newERROR("SEMANTICO", "EL TIPO DE LA EXPRESIÓN NO COINCIDE CON EL DE LA VARIABLE", this.linea, this.columna);
                return;
            }
            valor = this.expresion.getValor(tree, table);
            if (valor.Tipo.getTipos() === TIPO_1.tipos.ERROR) {
                return;
            }
            if (this.TipoV.getTipos() === TIPO_1.tipos.ENTERO && valor.Tipo.getTipos() === TIPO_1.tipos.DECIMAL) {
                valor.valor = Math.trunc(valor.valor);
            }
        }
        let respuesta = undefined;
        if (valor instanceof SIMBOLO_1.default) {
            respuesta = table.set(this.ID, valor.valor, this.TipoV);
        }
        else {
            respuesta = table.set(this.ID, valor, this.TipoV);
        }
        if (respuesta.tipo.getTipos() === TIPO_1.tipos.ERROR) {
            tree.newERROR("SEMANTICO", "LA VARIABLE YA ESTA DECLARADA", this.linea, this.columna);
        }
    }
    getNodo() {
        throw new Error("Method not implemented.");
    }
}
exports.default = VARIABLES;
//# sourceMappingURL=VAR.js.map