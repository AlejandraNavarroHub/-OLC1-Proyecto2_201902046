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
class Logicos extends EXPRESION_1.Expresion {
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
            case "&&":
                if (valor2) {
                    if (valor1.Tipo.getTipos() == TIPO_1.tipos.BOOLEANO && valor2.Tipo.getTipos() == TIPO_1.tipos.BOOLEANO) {
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.BOOLEANO), valor1.valor && valor2.valor, this.linea, this.columna);
                    }
                    else {
                        switch (valor1.Tipo.getTipos()) {
                            case TIPO_1.tipos.ENTERO:
                                switch (valor2.Tipo.getTipos()) {
                                    case TIPO_1.tipos.ENTERO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON VARIABLES TIPO ENTERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN ENTERO Y UN DECIMAL", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN ENTERO Y BOOLEAN", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CARACTER:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN ENTERO Y UN CARACTER", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CADENA:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case TIPO_1.tipos.DECIMAL:
                                switch (valor2.Tipo.getTipos()) {
                                    case TIPO_1.tipos.ENTERO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON DOUBLE Y ENTERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN DOUBLE Y UN DECIMAL", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN DOUBLE Y BOOLEAN", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CARACTER:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN DOUBLE Y UN CARACTER", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CADENA:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN DOUBLE Y UNA CADENA", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case TIPO_1.tipos.BOOLEANO:
                                switch (valor2.Tipo.getTipos()) {
                                    case TIPO_1.tipos.ENTERO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON BOOLEANO Y ENTERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN BOOLEANO Y UN DECIMAL", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CARACTER:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN BOOLEANO Y UN CARACTER", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CADENA:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN BOOLEANO Y UNA CADENA", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case TIPO_1.tipos.CARACTER:
                                switch (valor2.Tipo.getTipos()) {
                                    case TIPO_1.tipos.ENTERO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON CARACTER Y ENTERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN CARACTER Y UN DECIMAL", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN CARACTER Y BOOLEAN", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CARACTER:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN CARACTER Y UN CARACTER", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CADENA:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case TIPO_1.tipos.CADENA:
                                switch (valor2.Tipo.getTipos()) {
                                    case TIPO_1.tipos.ENTERO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN STRING Y ENTERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN STRING Y UN DECIMAL", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN STRING Y BOOLEAN", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CARACTER:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN STRING Y UN CARACTER", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CADENA:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN AND CON UN STRING Y UNA CADENA", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                }
                        }
                    }
                }
            case "||":
                if (valor2) {
                    if (valor1.Tipo.getTipos() == TIPO_1.tipos.BOOLEANO && valor2.Tipo.getTipos() == TIPO_1.tipos.BOOLEANO) {
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.BOOLEANO), valor1.valor || valor2.valor, this.linea, this.columna);
                    }
                    else {
                        switch (valor1.Tipo.getTipos()) {
                            case TIPO_1.tipos.ENTERO:
                                switch (valor2.Tipo.getTipos()) {
                                    case TIPO_1.tipos.ENTERO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON VARIABLES TIPO ENTERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN ENTERO Y UN DECIMAL", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN ENTERO Y BOOLEAN", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CARACTER:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN ENTERO Y UN CARACTER", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CADENA:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case TIPO_1.tipos.DECIMAL:
                                switch (valor2.Tipo.getTipos()) {
                                    case TIPO_1.tipos.ENTERO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON DOUBLE Y ENTERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN DOUBLE Y UN DECIMAL", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN DOUBLE Y BOOLEAN", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CARACTER:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN DOUBLE Y UN CARACTER", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CADENA:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN DOUBLE Y UNA CADENA", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case TIPO_1.tipos.BOOLEANO:
                                switch (valor2.Tipo.getTipos()) {
                                    case TIPO_1.tipos.ENTERO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON BOOLEANO Y ENTERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN BOOLEANO Y UN DECIMAL", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CARACTER:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN BOOLEANO Y UN CARACTER", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CADENA:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN BOOLEANO Y UNA CADENA", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case TIPO_1.tipos.CARACTER:
                                switch (valor2.Tipo.getTipos()) {
                                    case TIPO_1.tipos.ENTERO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON CARACTER Y ENTERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN CARACTER Y UN DECIMAL", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN CARACTER Y BOOLEAN", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CARACTER:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN CARACTER Y UN CARACTER", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CADENA:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case TIPO_1.tipos.CADENA:
                                switch (valor2.Tipo.getTipos()) {
                                    case TIPO_1.tipos.ENTERO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN STRING Y ENTERO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN STRING Y UN DECIMAL", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN STRING Y BOOLEAN", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CARACTER:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN STRING Y UN CARACTER", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    case TIPO_1.tipos.CADENA:
                                        tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN OR CON UN STRING Y UNA CADENA", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                }
                        }
                    }
                }
            case "!":
                if (valor2) {
                    tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN NOT CON DOS VARIABLES", this.linea, this.columna);
                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                }
                else {
                    if (valor1.Tipo.getTipos() == TIPO_1.tipos.BOOLEANO) {
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.BOOLEANO), !valor1.valor, this.linea, this.columna);
                    }
                    else {
                        switch (valor1.Tipo.getTipos()) {
                            case TIPO_1.tipos.ENTERO:
                                tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN NOT CON UN ENTERO", this.linea, this.columna);
                                return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            case TIPO_1.tipos.DECIMAL:
                                tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN NOT CON UN DECIMAL", this.linea, this.columna);
                                return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            case TIPO_1.tipos.CARACTER:
                                tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN NOT CON UN CARACTER", this.linea, this.columna);
                                return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            case TIPO_1.tipos.CADENA:
                                tree.newERROR("SEMANTICO", "NO PUEDE REALIZAR LA OPERACIÓN NOT CON UN STRING", this.linea, this.columna);
                                return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        }
                    }
                }
        }
        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("OPERADOR LOGICO");
        ;
        if (this.exp2) {
            nodo.agregarHijo(this.exp1.getNodo());
            nodo.agregarHijoS(this.simbolo);
            nodo.agregarHijo(this.exp2.getNodo());
        }
        else {
            nodo.agregarHijoS(this.simbolo);
            nodo.agregarHijo(this.exp1.getNodo());
        }
        return nodo;
    }
}
exports.default = Logicos;
//# sourceMappingURL=LOGICOS.js.map