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
class Arit extends EXPRESION_1.Expresion {
    constructor(linea, columna, exp1, simbolo, exp2) {
        super(linea, columna, undefined, new TIPO_1.default(TIPO_1.tipos.ENTERO));
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.simbolo = simbolo;
    }
    getValor(tree, table) {
        var _a;
        let valor1 = this.exp1.getValor(tree, table);
        let valor2 = (_a = this.exp2) === null || _a === void 0 ? void 0 : _a.getValor(tree, table);
        switch (this.simbolo) {
            case "+":
                if (valor2) {
                    switch (valor1.Tipo.getTipos()) {
                        case TIPO_1.tipos.ENTERO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor + valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor + valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor + valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor + valor2.valor.charCodeAt(), this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), String(valor1.valor) + valor2.valor, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.DECIMAL:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor + valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor + valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor + valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor + valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), String(valor1.valor) + valor2.valor, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.BOOLEANO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor + valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor + valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE SUMAR UN BOOLEANO CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE SUMAR UN BOOLEANO CON UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), String(valor1.valor) + valor2.valor, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CARACTER:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor.charCodeAt() + valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor.charCodeAt() + valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE SUMAR UN CARACTER CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CADENA:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea, this.columna);
                            }
                    }
                }
            case "-":
                if (valor2) {
                    switch (valor1.Tipo.getTipos()) {
                        case TIPO_1.tipos.ENTERO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor - valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor - valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor - valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor - valor2.valor.charCodeAt(), this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE RESTAR UN ENTERO CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.DECIMAL:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor - valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor - valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor - valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor - valor2.valor.charCodeAt(), this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE RESTAR UN DOUBLE CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.BOOLEANO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor - valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor - valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE RESTAR UN BOOLEANO CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE RESTAR UN BOOLEANO CON UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE RESTAR UN BOOLEANO CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CARACTER:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor.charCodeAt() - valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor.charCodeAt() - valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE RESTAR UN CARACTER CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE RESTAR UN CARACTER CON UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE RESTAR UN CARACTER CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CADENA:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE RESTAR UNA CADENA CON UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE RESTAR UNA CADENA CON UN DOUBLE", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE RESTAR UNA CADENA CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE RESTAR UNA CADENA CON UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE RESTAR UNA CADENA CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
                else {
                    switch (valor1.Tipo.getTipos()) {
                        case TIPO_1.tipos.ENTERO:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), -valor1.valor, this.linea, this.columna);
                        case TIPO_1.tipos.DECIMAL:
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), -valor1.valor, this.linea, this.columna);
                        case TIPO_1.tipos.BOOLEANO:
                            tree.newERROR("SEMANTICO", "NO SE PUEDE REALIZAR LA NEGACION UNARIA CON UN BOOLEANO", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        case TIPO_1.tipos.CARACTER:
                            tree.newERROR("SEMANTICO", "NO SE PUEDE REALIZAR LA NEGACION UNARIA CON UN CARACTER", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        case TIPO_1.tipos.CADENA:
                            tree.newERROR("SEMANTICO", "NO SE PUEDE REALIZAR LA NEGACION UNARIA CON UNA CADENA", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                    }
                }
            case "*":
                if (valor2) {
                    switch (valor1.Tipo.getTipos()) {
                        case TIPO_1.tipos.ENTERO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor * valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor * valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UN ENTERO CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor * valor2.valor.charCodeAt(), this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UN ENTERO CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.DECIMAL:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor * valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor * valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UN DOUBLE CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor * valor2.valor.charCodeAt(), this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UN DOUBLE CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.BOOLEANO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UN BOOLEANO CON UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UN BOOLEANO CON UN DECIMAL", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UN BOOLEANO CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UN BOOLEANO CON UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UN BOOLEANO CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CARACTER:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor.charCodeAt() * valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor.charCodeAt() * valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UN CARACTER CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UN CARACTER CON UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UN CARACTER CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CADENA:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UNA CADENA CON UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UNA CADENA CON UN DOUBLE", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UNA CADENA CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UNA CADENA CON UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE MULTIPLICAR UNA CADENA CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
            case "/":
                if (valor2) {
                    switch (valor1.Tipo.getTipos()) {
                        case TIPO_1.tipos.ENTERO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN ENTERO CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.DECIMAL:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN ENTERO CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN ENTERO CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor.charCodeAt(), this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN ENTERO CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.DECIMAL:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN DOUBLE CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.DECIMAL:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN DOUBLE CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN DOUBLE CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor.charCodeAt(), this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN DOUBLE CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.BOOLEANO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN BOOLEANO CON UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN BOOLEANO CON UN DECIMAL", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN BOOLEANO CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN BOOLEANO CON UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN BOOLEANO CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CARACTER:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN CARACTER CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor.charCodeAt() / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.DECIMAL:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN CARACTER CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor.charCodeAt() / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN CARACTER CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN CARACTER CON UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UN CARACTER CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CADENA:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UNA CADENA CON UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UNA CADENA CON UN DECIMAL", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UNA CADENA CON UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UNA CADENA CON UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE DIVIDIR UNA CADENA CON UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
            case "^":
                if (valor2) {
                    switch (valor1.Tipo.getTipos()) {
                        case TIPO_1.tipos.ENTERO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor ^ valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor ^ valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN ENTERO Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN ENTERO Y UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.DECIMAL:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor ^ valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor ^ valor2.valor, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN DECIMAL Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN DECIMAL Y UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN DECIMAL Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.BOOLEANO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN BOOLEANO Y UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN BOOLEANO Y UN DECIMAL", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN BOOLEANO Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN BOOLEANO Y UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN BOOLEANO Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CARACTER:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN CARACTER Y UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN CARACTER Y UN DECIMAL", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN CARACTER Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN CARACTER Y UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CADENA:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UNA CADENA Y UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UNA CADENA Y UN DECIMAL", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UNA CADENA Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UNA CADENA Y UN CARACTER", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE ELEVAR CON UNA CADENA Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
            case "%":
                if (valor2) {
                    switch (valor1.Tipo.getTipos()) {
                        case TIPO_1.tipos.ENTERO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.DECIMAL:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN ENTERO Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN ENTERO Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.DECIMAL:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.DECIMAL:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN DOUBLE Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN DOUBLE Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN DOUBLE Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.BOOLEANO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UN DOUBLE", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CARACTER:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UN DOUBLE", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CADENA:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UN DOUBLE", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
            case "":
                if (valor2) {
                    switch (valor1.Tipo.getTipos()) {
                        case TIPO_1.tipos.ENTERO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.DECIMAL:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN ENTERO Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN ENTERO Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.DECIMAL:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.DECIMAL:
                                    if (valor2.valor == 0) {
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    else {
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN DOUBLE Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN DOUBLE Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN DOUBLE Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.BOOLEANO:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UN DOUBLE", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CARACTER:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UN DOUBLE", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case TIPO_1.tipos.CADENA:
                            switch (valor2.Tipo.getTipos()) {
                                case TIPO_1.tipos.ENTERO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UN ENTERO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UN DOUBLE", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CARACTER:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UN BOOLEANO", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                case TIPO_1.tipos.CADENA:
                                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UNA CADENA", this.linea, this.columna);
                                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
        }
        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
    }
    getNodo() {
        throw new Error("Method not implemented.");
    }
}
exports.default = Arit;
//# sourceMappingURL=ARITMETICA.js.map