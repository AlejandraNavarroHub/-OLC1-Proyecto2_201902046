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
class Incrementar extends EXPRESION_1.Expresion {
    constructor(linea, columna, exp1, simbolo) {
        super(linea, columna, undefined, new TIPO_1.default(TIPO_1.tipos.ENTERO));
        this.exp1 = exp1;
        this.simbolo = simbolo;
    }
    getValor(tree, table) {
        let valor1 = this.exp1.getValor(tree, table);
        if (this.simbolo == "++") {
            if (this.exp1.ID) {
                if (valor1.Tipo.tipos == TIPO_1.tipos.ENTERO || valor1.Tipo.tipos == TIPO_1.tipos.DECIMAL) {
                    if (valor1.Tipo.tipos == TIPO_1.tipos.ENTERO) {
                        let nueva = new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor + 1, this.linea, this.columna);
                        table.update(this.exp1.ID, nueva);
                        return nueva;
                    }
                    else {
                        let nueva = new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor + 1, this.linea, this.columna);
                        table.update(this.exp1.ID, nueva);
                        return nueva;
                    }
                }
                else {
                    tree.newERROR("SEMANTICO", "NO PUEDE INCREMENTAR TIPOS DIFERENTES A INT Y DOUBLE", this.linea, this.columna);
                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                }
            }
            else {
                if (valor1.Tipo.tipos == TIPO_1.tipos.ENTERO || valor1.Tipo.tipos == TIPO_1.tipos.DECIMAL) {
                    if (valor1.Tipo.tipos == TIPO_1.tipos.ENTERO) {
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor + 1, this.linea, this.columna);
                    }
                    else {
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor + 1, this.linea, this.columna);
                    }
                }
                else {
                    tree.newERROR("SEMANTICO", "NO PUEDE INCREMENTAR TIPOS DIFERENTES A INT Y DOUBLE", this.linea, this.columna);
                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                }
            }
        }
        else if (this.simbolo == "--") {
            if (this.exp1.ID) {
                if (valor1.Tipo.tipos == TIPO_1.tipos.ENTERO || valor1.Tipo.tipos == TIPO_1.tipos.DECIMAL) {
                    if (valor1.Tipo.tipos == TIPO_1.tipos.ENTERO) {
                        let nueva = new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor - 1, this.linea, this.columna);
                        table.update(this.exp1.ID, nueva);
                        return nueva;
                    }
                    else {
                        let nueva = new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor - 1, this.linea, this.columna);
                        table.update(this.exp1.ID, nueva);
                        return nueva;
                    }
                }
                else {
                    tree.newERROR("SEMANTICO", "NO PUEDE DECREMENTAR TIPOS DIFERENTES A INT Y DOUBLE", this.linea, this.columna);
                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                }
            }
            else {
                if (valor1.Tipo.tipos == TIPO_1.tipos.ENTERO || valor1.Tipo.tipos == TIPO_1.tipos.DECIMAL) {
                    if (valor1.Tipo.tipos == TIPO_1.tipos.ENTERO) {
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ENTERO), valor1.valor - 1, this.linea, this.columna);
                    }
                    else {
                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.DECIMAL), valor1.valor - 1, this.linea, this.columna);
                    }
                }
                else {
                    tree.newERROR("SEMANTICO", "NO PUEDE DECREMENTAR TIPOS DIFERENTES A INT Y DOUBLE", this.linea, this.columna);
                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                }
            }
        }
        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
    }
    getNodo() {
        let nodo;
        if (this.simbolo == "++") {
            nodo = new nodoAST_1.nodoAST("INCREMENTAR");
            nodo.agregarHijo(this.exp1.getNodo());
            nodo.agregarHijoS(this.simbolo);
        }
        else {
            nodo = new nodoAST_1.nodoAST("DECREMENTAR");
            nodo.agregarHijo(this.exp1.getNodo());
            nodo.agregarHijoS(this.simbolo);
        }
        return nodo;
    }
}
exports.default = Incrementar;
//# sourceMappingURL=IN_DECREMENTAR.js.map