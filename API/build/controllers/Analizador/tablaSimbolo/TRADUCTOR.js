"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ENTORNO_1 = __importDefault(require("./ENTORNO"));
const EXCEPTION_1 = __importDefault(require("../exceptions/EXCEPTION"));
const Instruccion_1 = require("../Abstract/Instruccion");
class TRADUCTOR {
    // public pila_exec: Array<E> = new Array<Expresion>();
    constructor(instrucciones) {
        this.CICLOS = [];
        this.FUNCIONES = [];
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new ENTORNO_1.default();
        this.errores = new Array();
        this.simbolos = new Array();
    }
    traducir() {
        for (let instrucion of this.instrucciones) {
            if (instrucion instanceof Instruccion_1.Instruccion) {
                instrucion.ejecutar(this, this.global);
            }
        }
    }
    imprimirErrores() {
        for (let error of this.errores) {
            this.updateConsola(error.toString());
        }
    }
    updateConsola(update) {
        this.consola = `${this.consola}${update}\n`;
    }
    newERROR(tipo, descripcion, fila, columna) {
        this.errores.push(new EXCEPTION_1.default(this.errores.length + 1, tipo, descripcion, fila, columna));
    }
}
exports.default = TRADUCTOR;
//# sourceMappingURL=TRADUCTOR.js.map