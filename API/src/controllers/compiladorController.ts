import express , {query, Request, Response} from "express";
import Entorno from "./Analizador/tablaSimbolo/ENTORNO";
import TRADUCTOR from "./Analizador/tablaSimbolo/TRADUCTOR";

class CompiladorController {

    public  async index(req: Request, res: Response) {
        res.json();
    }

    public run(req: Request, res: Response) {

        const CONTENIDO = req.body.CONTENIDO;
        let arbol = new TRADUCTOR([]);
        let parse = require("./Analizador/gramatica");
        arbol = parse.parse(CONTENIDO);
        if (typeof(arbol)==typeof(true)) {
            arbol = new TRADUCTOR([]);
            arbol.newERROR("SINTACTICO","ERROR INRECUPERABLE",-1,-1);
        }
        const tabla = new Entorno();
        arbol.global = tabla;
        arbol.traducir();
        res.json({CONSOLA:arbol.consola, ERRORES:arbol.errores, SIMBOLOS:arbol.simbolos});
        
    }

    public graph(req: Request, res: Response){
        // try{
        //     const Contenido = req.body.Contenido;
        //     let parse = require("./Analizador/analizador");
        //     let ast = new ArbolAST([]);
        //     ast = parse.parse(Contenido);
        //     ast.openFile();
        // }catch{}
    }
}

export const compiladorController = new CompiladorController();
