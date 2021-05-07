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
const SIMBOLO_1 = __importDefault(require("./SIMBOLO"));
const TIPO_1 = __importStar(require("./TIPO"));
class Entorno {
    constructor(nombre = "GLOBAL", anterior) {
        this.nombre = nombre;
        this.anterior = anterior;
        this.tabla = new Map();
    }
    set(simbolo, valor, tipo, DIMENSION = undefined, TAMAÑO = undefined) {
        simbolo = simbolo.toUpperCase();
        if (!this.tabla.has(simbolo)) {
            let nueva = new SIMBOLO_1.default(tipo, simbolo, valor, DIMENSION, TAMAÑO);
            this.tabla.set(simbolo, nueva);
            return nueva;
        }
        return new SIMBOLO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), "", undefined);
    }
    update(simbolo, valor) {
        let value = this.get(simbolo);
        if (value.tipo.getTipos() !== TIPO_1.tipos.ERROR) {
            value.valor = valor.valor;
            this.tabla.set(simbolo, value);
            return true;
        }
        return false;
    }
    get(variable) {
        variable = variable.toUpperCase();
        for (var temp = this; temp != null; temp = temp.anterior) {
            if (temp.tabla.has(variable)) {
                var result = temp.tabla.get(variable);
                if (result) {
                    return result;
                }
            }
        }
        //Error
        return new SIMBOLO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), "", undefined);
    }
}
exports.default = Entorno;
//# sourceMappingURL=ENTORNO.js.map