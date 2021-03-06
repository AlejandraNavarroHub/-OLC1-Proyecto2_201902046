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
class Nativa extends EXPRESION_1.Expresion {
    constructor(linea, columna, simbolo, exp1) {
        super(linea, columna, undefined, new TIPO_1.default(TIPO_1.tipos.ENTERO));
        this.exp1 = exp1;
        this.simbolo = simbolo;
    }
    getValor(tree, table) {
        let valor1 = this.exp1.getValor(tree, table);
        switch (this.simbolo) {
            case "Length":
                switch (valor1.Tipo.getTipos()) {
                    case TIPO_1.tipos.ENTERO:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON INT", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    case TIPO_1.tipos.DECIMAL:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON DOUBLE", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    case TIPO_1.tipos.BOOLEANO:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON BOOLEAN", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    case TIPO_1.tipos.CARACTER:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON UN CHAR", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    case TIPO_1.tipos.CADENA:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor.length, this.linea, this.columna);
                }
            case "Truncate":
                switch (valor1.Tipo.getTipos()) {
                    case TIPO_1.tipos.ENTERO:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), Math.trunc(valor1.valor), this.linea, this.columna);
                    case TIPO_1.tipos.DECIMAL:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), Math.trunc(valor1.valor), this.linea, this.columna);
                    case TIPO_1.tipos.BOOLEANO:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON BOOLEAN", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    case TIPO_1.tipos.CARACTER:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON UN CHAR", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    case TIPO_1.tipos.CADENA:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON UNA CADENA", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                }
            case "Round":
                switch (valor1.Tipo.getTipos()) {
                    case TIPO_1.tipos.ENTERO:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), Math.round(valor1.valor), this.linea, this.columna);
                    case TIPO_1.tipos.DECIMAL:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), Math.round(valor1.valor), this.linea, this.columna);
                    case TIPO_1.tipos.BOOLEANO:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON BOOLEAN", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    case TIPO_1.tipos.CARACTER:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON UN CHAR", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    case TIPO_1.tipos.CADENA:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON UNA CADENA", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                }
            case "Typeof":
                switch (valor1.Tipo.getTipos()) {
                    case TIPO_1.tipos.ENTERO:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), valor1.Tipo.getTipos(), this.linea, this.columna);
                    case TIPO_1.tipos.DECIMAL:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), valor1.Tipo.getTipos(), this.linea, this.columna);
                    case TIPO_1.tipos.BOOLEANO:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), valor1.Tipo.getTipos(), this.linea, this.columna);
                    case TIPO_1.tipos.CARACTER:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), valor1.Tipo.getTipos(), this.linea, this.columna);
                    case TIPO_1.tipos.CADENA:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), valor1.Tipo.getTipos(), this.linea, this.columna);
                }
            case "toString":
                switch (valor1.Tipo.getTipos()) {
                    case TIPO_1.tipos.ENTERO:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), valor1.valor.toString(), this.linea, this.columna);
                    case TIPO_1.tipos.DECIMAL:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), valor1.valor.toString(), this.linea, this.columna);
                    case TIPO_1.tipos.BOOLEANO:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), valor1.valor.toString(), this.linea, this.columna);
                    case TIPO_1.tipos.CARACTER:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), valor1.valor.toString(), this.linea, this.columna);
                    case TIPO_1.tipos.CADENA:
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), valor1.valor.toString(), this.linea, this.columna);
                }
            case "toCharArray":
                switch (valor1.Tipo.getTipos()) {
                    case TIPO_1.tipos.ENTERO:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON INT", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    case TIPO_1.tipos.DECIMAL:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON DOUBLE", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    case TIPO_1.tipos.BOOLEANO:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON BOOLEAN", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    case TIPO_1.tipos.CARACTER:
                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN CON UN CHAR", this.linea, this.columna);
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    case TIPO_1.tipos.CADENA:
                        //Tipo lista
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), Array.from(valor1.valor), this.linea, this.columna);
                }
        }
        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("FUNCIONES NATIVAS");
        nodo.agregarHijoS(this.simbolo);
        nodo.agregarHijo(this.exp1.getNodo());
        nodo.agregarHijoS(";");
        return nodo;
    }
}
exports.default = Nativa;
//# sourceMappingURL=NATIVA.js.map