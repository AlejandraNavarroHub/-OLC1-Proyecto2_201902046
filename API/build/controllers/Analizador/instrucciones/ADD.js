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
const TIPO_INSTRUCCION_1 = __importStar(require("../tablaSimbolo/TIPO_INSTRUCCION"));
const PRIMITIVO_1 = __importDefault(require("../expresiones/PRIMITIVO"));
class ADD extends Instruccion_1.Instruccion {
    constructor(linea, columna, ID, expresion) {
        super(linea, columna, new TIPO_INSTRUCCION_1.default(TIPO_INSTRUCCION_1.T_INS.OTROS), ID);
        this.expresion = expresion;
    }
    ejecutar(tree, table) {
        let comprobar = table.get(this.ID);
        if (comprobar.tipo.tipos !== TIPO_1.tipos.ERROR) {
            if (comprobar.TAMAÑO !== undefined) {
                let value = this.expresion.getValor(tree, table);
                if (value.Tipo.tipos !== TIPO_1.tipos.ERROR) {
                    if (value.Tipo.tipos === comprobar.tipo.tipos) {
                        let lista = comprobar.valor;
                        lista.push(value.valor);
                        console.log(lista);
                        table.update(this.ID, new PRIMITIVO_1.default(comprobar.tipo, lista, this.linea, this.columna), lista.length);
                        return;
                    }
                    tree.newERROR("SEMANTICO", "EL DATO INGRESADO NO COINCIDE CON EL TIPO DE LA LISTA", this.linea, this.columna);
                    return;
                }
            }
            tree.newERROR("SEMANTICO", "LA VARIABLE INDICADA NO ES UNA LISTA", this.linea, this.columna);
            return;
        }
        tree.newERROR("SEMANTICO", "LA LISTA NO EXISTE", this.linea, this.columna);
        return;
    }
    getNodo() {
        throw new Error("Method not implemented.");
    }
}
exports.default = ADD;
//# sourceMappingURL=ADD.js.map