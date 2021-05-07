import { Instruccion } from "../Abstract/Instruccion";
import Excepcion from "../exceptions/EXCEPTION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";


export default class INDEC extends Instruccion{
   
    private expresion: Expresion;

    constructor(expresion:Expresion, linea:number, columna:number){
        super(linea, columna, new Tipo_INS(T_INS.OTROS));
        this.expresion = expresion;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        this.expresion.getValor(tree,table);
    }

    public getNodo(): nodoAST {
        throw new Error("Method not implemented.");
    }
}