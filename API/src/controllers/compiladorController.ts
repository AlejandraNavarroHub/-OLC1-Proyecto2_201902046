import express , {query, Request, Response} from "express";

class CompiladorController {

    public  async index(req: Request, res: Response) {
        res.json();
    }

    public run(req: Request, res: Response) {

        const CONTENIDO = req.body.CONTENIDO;
        console.log(CONTENIDO);
        res.json({CONSOLA:CONTENIDO, ERRORES:[], SIMBOLOS:[]});
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
