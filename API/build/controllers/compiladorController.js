"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.compiladorController = void 0;
const ENTORNO_1 = __importDefault(require("./Analizador/tablaSimbolo/ENTORNO"));
const TRADUCTOR_1 = __importDefault(require("./Analizador/tablaSimbolo/TRADUCTOR"));
class CompiladorController {
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.json();
        });
    }
    run(req, res) {
        const CONTENIDO = req.body.CONTENIDO;
        let arbol = new TRADUCTOR_1.default([]);
        let parse = require("./Analizador/gramatica");
        arbol = parse.parse(CONTENIDO);
        if (typeof (arbol) == typeof (true)) {
            arbol = new TRADUCTOR_1.default([]);
            arbol.newERROR("SINTACTICO", "ERROR INRECUPERABLE", -1, -1);
        }
        const tabla = new ENTORNO_1.default();
        arbol.global = tabla;
        arbol.traducir();
        res.json({ CONSOLA: arbol.consola, ERRORES: arbol.errores, SIMBOLOS: arbol.simbolos });
    }
    graph(req, res) {
        // try{
        //     const Contenido = req.body.Contenido;
        //     let parse = require("./Analizador/analizador");
        //     let ast = new ArbolAST([]);
        //     ast = parse.parse(Contenido);
        //     ast.openFile();
        // }catch{}
    }
}
exports.compiladorController = new CompiladorController();
//# sourceMappingURL=compiladorController.js.map