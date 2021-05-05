import { Expresion } from "../Abstract/EXPRESION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo from "../tablaSimbolo/Tipo";
import { nodoAST } from "../Abstract/nodoAST";


export default class Primitivo extends Expresion{
    
    constructor(tipo:Tipo, valor:any, linea:number, columna:number){
        super(linea, columna, valor, tipo);
    }

    public getValor(tree:TRADUCTOR, table:tablaSimbolos){
        return this.valor;
    }

    public getNodo(): nodoAST {
        throw new Error("Method not implemented.");
    }
}