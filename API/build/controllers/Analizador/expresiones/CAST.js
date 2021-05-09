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
class Casteo extends EXPRESION_1.Expresion {
    constructor(linea, columna, tip, exp) {
        super(linea, columna, undefined, new TIPO_1.default(TIPO_1.tipos.ENTERO));
        this.exp = exp;
        this.tip = tip;
    }
    getValor(tree, table) {
        let valor1 = this.exp.getValor(tree, table);
        let tipado = this.tip;
        if (valor1) {
            switch (tipado.tipos) {
                case TIPO_1.tipos.ENTERO:
                    switch (valor1.Tipo.tipos) {
                        case TIPO_1.tipos.ENTERO:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor, this.linea, this.columna);
                        case TIPO_1.tipos.DECIMAL:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), Math.trunc(valor1.valor), this.linea, this.columna);
                        case TIPO_1.tipos.BOOLEANO:
                            tree.newERROR("SEMANTICO", "NO PUEDE CASTEAR A ENTERO UN BOOLEANO", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        case TIPO_1.tipos.CARACTER:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor.charCodeAt(), this.linea, this.columna);
                        case TIPO_1.tipos.CADENA:
                            tree.newERROR("SEMANTICO", "NO EXISTE EL CASTEO DE STRING", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    }
                case TIPO_1.tipos.DECIMAL:
                    switch (valor1.Tipo.tipos) {
                        case TIPO_1.tipos.ENTERO:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor, this.linea, this.columna);
                        case TIPO_1.tipos.DECIMAL:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor, this.linea, this.columna);
                        case TIPO_1.tipos.BOOLEANO:
                            tree.newERROR("SEMANTICO", "NO PUEDE CASTEAR A DOUBLE UN BOOLEANO", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        case TIPO_1.tipos.CARACTER:
                            tree.newERROR("SEMANTICO", "NO PUEDE CASTEAR A DOUBLE UN CARACTER", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        case TIPO_1.tipos.CADENA:
                            tree.newERROR("SEMANTICO", "NO EXISTE EL CASTEO DE STRING", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    }
                case TIPO_1.tipos.BOOLEANO:
                    switch (valor1.Tipo.tipos) {
                        case TIPO_1.tipos.ENTERO:
                            tree.newERROR("SEMANTICO", "NO EXISTE EL CASTEO A BOOLEAN", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        case TIPO_1.tipos.DECIMAL:
                            tree.newERROR("SEMANTICO", "NO EXISTE EL CASTEO A BOOLEAN", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        case TIPO_1.tipos.BOOLEANO:
                            tree.newERROR("SEMANTICO", "NO EXISTE EL CASTEO A BOOLEAN", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        case TIPO_1.tipos.CARACTER:
                            tree.newERROR("SEMANTICO", "NO EXISTE EL CASTEO A BOOLEAN", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        case TIPO_1.tipos.CADENA:
                            tree.newERROR("SEMANTICO", "NO EXISTE EL CASTEO DE STRING", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    }
                case TIPO_1.tipos.CARACTER:
                    switch (valor1.Tipo.tipos) {
                        case TIPO_1.tipos.ENTERO:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), String.fromCharCode(valor1.valor), this.linea, this.columna);
                        case TIPO_1.tipos.DECIMAL:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), String.fromCharCode(valor1.valor), this.linea, this.columna);
                        case TIPO_1.tipos.BOOLEANO:
                            tree.newERROR("SEMANTICO", "NO PUEDE CASTEAR A CARACTER UN BOOLEANO", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        case TIPO_1.tipos.CARACTER:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor, this.linea, this.columna);
                        case TIPO_1.tipos.CADENA:
                            tree.newERROR("SEMANTICO", "NO EXISTE EL CASTEO DE STRING", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    }
                case TIPO_1.tipos.CADENA:
                    switch (valor1.Tipo.tipos) {
                        case TIPO_1.tipos.ENTERO:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor, this.linea, this.columna);
                        case TIPO_1.tipos.DECIMAL:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), Math.trunc(valor1.valor), this.linea, this.columna);
                        case TIPO_1.tipos.BOOLEANO:
                            tree.newERROR("SEMANTICO", "NO PUEDE CASTEAR A ENTERO UN BOOLEANO", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        case TIPO_1.tipos.CARACTER:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor.charCodeAt(), this.linea, this.columna);
                        case TIPO_1.tipos.CADENA:
                            tree.newERROR("SEMANTICO", "NO EXISTE EL CASTEO DE STRING", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    }
            }
        }
        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("CASTEO");
        nodo.agregarHijoS(this.tip.getTipos());
        nodo.agregarHijo(this.exp.getNodo());
        return nodo;
    }
}
exports.default = Casteo;
//# sourceMappingURL=CAST.js.map