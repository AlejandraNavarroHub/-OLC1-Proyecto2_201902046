"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ENTORNO_1 = __importDefault(require("./ENTORNO"));
const EXCEPTION_1 = __importDefault(require("../exceptions/EXCEPTION"));
const Instruccion_1 = require("../Abstract/Instruccion");
const list_simbol_1 = __importDefault(require("./list_simbol"));
const nodoAST_1 = require("../Abstract/nodoAST");
const FUNCION_1 = __importDefault(require("../instrucciones/FUNCION"));
const TIPO_INSTRUCCION_1 = require("./TIPO_INSTRUCCION");
class TRADUCTOR {
    // public pila_exec: Array<E> = new Array<Expresion>();
    constructor(instrucciones) {
        this.FUNCTIONS = new Array();
        this.EXEC = new Array();
        this.grafo = "";
        this.c = 0;
        this.raiz = new nodoAST_1.nodoAST("");
        this.CICLOS = [];
        this.FUNCIONES = [];
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new ENTORNO_1.default();
        this.errores = new Array();
        this.simbolos = new Array();
    }
    traducir() {
        let x = 0;
        if (this.EXEC.length === 0) {
            this.newERROR("SEMANTICO", "No se encontro función exec", -1, -1);
            return;
        }
        for (let ex of this.EXEC) {
            if (ex instanceof Instruccion_1.Instruccion) {
                if (x > 0) {
                    this.newERROR("SEMANTICO", "SOLO SE PUEDE TENER UNA FUNCIÓN EXEC", ex.linea, ex.columna);
                    return;
                }
                this.EXEC[0] = ex;
                x++;
            }
        }
        for (let funciones of this.FUNCTIONS) {
            if (funciones instanceof FUNCION_1.default) {
                funciones.ejecutar(this, this.global);
            }
        }
        for (let instrucion of this.instrucciones) {
            if (instrucion instanceof Instruccion_1.Instruccion) {
                console.log(instrucion);
                if (instrucion.TIPO.getTipos() === TIPO_INSTRUCCION_1.T_INS.DECLARACION) {
                    instrucion.ejecutar(this, this.global);
                }
                else {
                    this.newERROR("SEMANTICO", "SOLO SE PUEDE REALIZAR DECLARACIONES EN EL AMBITO GLOBAL", instrucion.linea, instrucion.columna);
                }
            }
        }
        this.EXEC[0].ejecutar(this, this.global);
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
    newSimbol(nombre, grupo, tipo, ambito, fila, columna) {
        this.simbolos.push(new list_simbol_1.default(this.simbolos.length + 1, nombre, grupo, tipo, ambito, fila, columna));
    }
    graficar() {
        let nodo = new nodoAST_1.nodoAST("RAIZ");
        let cont = new nodoAST_1.nodoAST("INSTRUCCIONES");
        for (let instrucion of this.instrucciones) {
            if (instrucion instanceof Instruccion_1.Instruccion) {
                cont.agregarHijo(instrucion.getNodo());
            }
        }
        nodo.agregarHijo(cont);
        this.raiz = nodo;
        this.Graph();
    }
    Graph() {
        let r = "AST";
        let ext = "pdf";
        var fs = require('fs');
        var stream = fs.createWriteStream(`./src/AST/${r}.dot`);
        stream.once('open', () => {
            stream.write(this.getDot(this.raiz));
            stream.end();
        });
        const exec = require('child_process').exec;
        exec(`dot -T ${ext} -o ./src/AST/${r}.${ext} ./src/AST/${r}.dot`, (err, stdout) => {
            exec(`start ./src/AST/${r}.${ext}`);
        });
    }
    getDot(raiz) {
        this.grafo = "";
        this.grafo += "digraph {\n"; //                         "     \"
        var re = /\"/gi;
        this.grafo += "n0[label=\"" + raiz.getValor().replace(re, "\\\"") + "\"];\n";
        this.c = 1;
        this.recorrerAST("n0", raiz);
        this.grafo += "}";
        return this.grafo;
    }
    recorrerAST(padre, nPadre) {
        for (let hijo of nPadre.getHijos()) {
            let nombreHijo = "n" + this.c;
            var re = /\"/gi;
            this.grafo += nombreHijo + "[label=\"" + hijo.getValor().replace(re, "\\\"") + "\"];\n";
            this.grafo += padre + "->" + nombreHijo + ";\n";
            this.c++;
            this.recorrerAST(nombreHijo, hijo);
        }
    }
}
exports.default = TRADUCTOR;
//# sourceMappingURL=TRADUCTOR.js.map