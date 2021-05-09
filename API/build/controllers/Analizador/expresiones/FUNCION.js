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
const ENTORNO_1 = __importDefault(require("../tablaSimbolo/ENTORNO"));
const TIPO_1 = __importStar(require("../tablaSimbolo/TIPO"));
const nodoAST_1 = require("../Abstract/nodoAST");
const PRIMITIVO_1 = __importDefault(require("./PRIMITIVO"));
const Instruccion_1 = require("../Abstract/Instruccion");
class FUNCION_E extends EXPRESION_1.Expresion {
    constructor(linea, columna, ID, PARAMETROS) {
        super(linea, columna, undefined, new TIPO_1.default(TIPO_1.tipos.ENTERO), ID);
        this.PARAMETROS = PARAMETROS;
    }
    getValor(tree, table) {
        let comprobar = table.get(this.ID);
        if (comprobar.tipo.getTipos() !== TIPO_1.tipos.ERROR) {
            let FUNC = comprobar.valor;
            let nuevo_entorno = new ENTORNO_1.default(this.ID, table);
            if (this.PARAMETROS instanceof Array) {
                if (this.PARAMETROS.length > FUNC.PARAMETROS.length) {
                    tree.newERROR("SEMANTICO", "Numero de entradas erroneo", this.linea, this.columna);
                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                }
                let x = 0;
                for (let parametro of this.PARAMETROS) {
                    if (parametro instanceof EXPRESION_1.Expresion) {
                        let valor = parametro.getValor(tree, table);
                        if (valor.Tipo.getTipos() === TIPO_1.tipos.ERROR) {
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        }
                        if (valor.Tipo.getTipos() !== FUNC.PARAMETROS[x].TipoV.getTipos()) {
                            tree.newERROR("SEMANTICO", "EL TIPO DE LAS VARIABLES DE LA FUNCIÓN NO COINCIDEN", this.linea, this.columna);
                            return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                        }
                        FUNC.PARAMETROS[x].expresion = valor;
                        FUNC.PARAMETROS[x].ejecutar(tree, nuevo_entorno);
                    }
                    x++;
                }
            }
            tree.FUNCIONES.push("");
            if (FUNC.BLOQUE instanceof Array) {
                for (let instrucciones of FUNC.BLOQUE) {
                    if (instrucciones instanceof Instruccion_1.Instruccion) {
                        let res = instrucciones.ejecutar(tree, nuevo_entorno);
                        try {
                            if (res.nombre == "RETURN") {
                                let v = res.valor.getValor(tree, nuevo_entorno);
                                if (v instanceof PRIMITIVO_1.default) {
                                    if (v.Tipo.getTipos() !== FUNC.TIPOV.getTipos() ||
                                        v.Tipo.getTipos() !== TIPO_1.tipos.ENTERO && FUNC.TIPOV.getTipos() !== TIPO_1.tipos.DECIMAL ||
                                        v.Tipo.getTipos() !== TIPO_1.tipos.DECIMAL && FUNC.TIPOV.getTipos() !== TIPO_1.tipos.ENTERO) {
                                        tree.FUNCIONES.pop();
                                        tree.newERROR("SEMANTICO", "TIPO DE RETORNO INCORRECTO", this.linea, this.columna);
                                        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    return v;
                                }
                            }
                            if (res.nombre === "BREAK") {
                                tree.FUNCIONES.pop();
                                tree.newERROR("SEMANTICO", "FUNCIÓN BREAK NO SE PUEDE USAR DENTRO DE UNA FUNCIÓN", this.linea, this.columna);
                                return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                            if (res.nombre === "CONTINUE") {
                                tree.FUNCIONES.pop();
                                tree.newERROR("SEMANTICO", "FUNCIÓN CONTINUE NO SE PUEDE USAR DENTRO DE UNA FUNCIÓN", this.linea, this.columna);
                                return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        }
                        catch (_a) { }
                    }
                }
                if (FUNC.TIPOV.getTipos() === TIPO_1.tipos.ERROR) {
                    return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.CADENA), undefined, this.linea, this.columna);
                }
                tree.newERROR("SEMANTICO", "SE ESPERABA UN VALOR DE RETORNO", this.linea, this.columna);
                return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
            }
        }
        tree.newERROR("SEMANTICO", "FUNCIÓN NO ENCONTRADA", this.linea, this.columna);
        return new PRIMITIVO_1.default(new TIPO_1.default(TIPO_1.tipos.ERROR), undefined, this.linea, this.columna);
    }
    getNodo() {
        let nodo = new nodoAST_1.nodoAST("LLAMADA");
        nodo.agregarHijoS(this.ID);
        if (this.PARAMETROS) {
            let cont = new nodoAST_1.nodoAST("INSTRUCCIONES");
            for (let expre of this.PARAMETROS) {
                if (expre instanceof EXPRESION_1.Expresion) {
                    cont.agregarHijo(expre.getNodo());
                }
            }
            nodo.agregarHijo(cont);
        }
        return nodo;
    }
}
exports.default = FUNCION_E;
//# sourceMappingURL=FUNCION.js.map