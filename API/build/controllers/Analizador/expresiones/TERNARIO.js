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
const PRIMITIVO_1 = __importDefault(require("./PRIMITIVO"));
class Ternario extends EXPRESION_1.Expresion {
    constructor(linea, columna, exp1, simbolo1, exp2, simbolo2, exp3) {
        super(linea, columna, undefined, new TIPO_1.default(TIPO_1.tipos.ENTERO));
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.exp3 = exp3;
        this.simbolo1 = simbolo1;
        this.simbolo2 = simbolo2;
    }
    getValor(tree, table) {
        let valor1 = this.exp1.getValor(tree, table);
        let valor2 = this.exp2.getValor(tree, table);
        let valor3 = this.exp3.getValor(tree, table);
        if (valor1 && valor2 && valor3) {
            if (valor1.Tipo.getTipos() == TIPO_1.tipos.BOOLEANO) {
                if (valor1.valor == true) {
                    switch (valor2.Tipo.getTipos()) {
                        case TIPO_1.tipos.ENTERO:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor2.valor, this.linea, this.columna);
                        case TIPO_1.tipos.DECIMAL:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor2.valor, this.linea, this.columna);
                        case TIPO_1.tipos.BOOLEANO:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor2.valor, this.linea, this.columna);
                        case TIPO_1.tipos.CARACTER:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor2.valor, this.linea, this.columna);
                        case TIPO_1.tipos.CADENA:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), valor2.valor, this.linea, this.columna);
                    }
                }
                else {
                    switch (valor3.Tipo.getTipos()) {
                        case TIPO_1.tipos.ENTERO:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor3.valor, this.linea, this.columna);
                        case TIPO_1.tipos.DECIMAL:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor3.valor, this.linea, this.columna);
                        case TIPO_1.tipos.BOOLEANO:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor3.valor, this.linea, this.columna);
                        case TIPO_1.tipos.CARACTER:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor3.valor, this.linea, this.columna);
                        case TIPO_1.tipos.CADENA:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), valor3.valor, this.linea, this.columna);
                    }
                }
            }
            else {
                tree.newERROR("SEMANTICO", "LA CONDICIÓN DEBE SER TIPO BOOLEAN", this.linea, this.columna);
                return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
            }
        }
        else {
            tree.newERROR("SEMANTICO", "NO CUMPLE CON LA SINTAXIS (CONDICION) ? EXPRESION : EXPRESION", this.linea, this.columna);
            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
        }
        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
    }
    getNodo() {
        throw new Error("Method not implemented.");
    }
}
exports.default = Ternario;
//# sourceMappingURL=TERNARIO.js.map