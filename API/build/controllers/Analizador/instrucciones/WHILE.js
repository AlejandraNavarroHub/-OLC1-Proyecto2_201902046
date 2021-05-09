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
const ENTORNO_1 = __importDefault(require("../tablaSimbolo/ENTORNO"));
const TIPO_1 = require("../tablaSimbolo/TIPO");
const TIPO_INSTRUCCION_1 = __importStar(require("../tablaSimbolo/TIPO_INSTRUCCION"));
const nodoAST_1 = require("../Abstract/nodoAST");
class WHILE extends Instruccion_1.Instruccion {
    constructor(linea, columna, condicion, bloque) {
        super(linea, columna, new TIPO_INSTRUCCION_1.default(TIPO_INSTRUCCION_1.T_INS.OTROS));
        this.condicion = condicion;
        this.bloque = bloque;
    }
    ejecutar(tree, table) {
        let comprobar = this.condicion.getValor(tree, table);
        if (comprobar.Tipo.getTipos() !== TIPO_1.tipos.ERROR) {
            if (comprobar.Tipo.getTipos() === TIPO_1.tipos.BOOLEANO) {
                tree.CICLOS.push("CICLO");
                let nuevo_entorno = new ENTORNO_1.default("", table);
                while (comprobar.valor) {
                    nuevo_entorno = new ENTORNO_1.default("", table);
                    for (let instruccion of this.bloque) {
                        if (instruccion instanceof Instruccion_1.Instruccion) {
                            let res = instruccion.ejecutar(tree, nuevo_entorno);
                            try {
                                if (res.nombre === "BREAK") {
                                    tree.CICLOS.pop();
                                    return;
                                }
                                if (res.nombre === "CONTINUE") {
                                    break;
                                }
                                if (res.nombre === "RETURN") {
                                    tree.CICLOS.pop();
                                    return res;
                                }
                            }
                            catch (e) { }
                        }
                    }
                    comprobar = this.condicion.getValor(tree, table);
                }
                tree.CICLOS.pop();
                return;
            }
            tree.newERROR("SEMANTICO", "SE ESPERABA UN BOOLEANO", this.linea, this.columna);
        }
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("IMPRIMIR");
        return nodo;
    }
}
exports.default = WHILE;
//# sourceMappingURL=WHILE.js.map