import { Instruccion } from "../Abstract/Instruccion";
import Excepcion from "../exceptions/EXCEPTION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/Tipo";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";


export default class Imprimir extends Instruccion{
   
    private expresion: Expresion;

    constructor(expresion:Expresion, linea:number, columna:number){
        super(linea, columna, new Tipo_INS(T_INS.OTROS));
        this.expresion = expresion;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        var value = this.expresion.getValor(tree, table); //OBTIENE EL VALOR

        if(value instanceof Excepcion){
            return;
        }
        tree.updateConsola(value+"");
    }

    public getNodo(): nodoAST {
        throw new Error("Method not implemented.");
    }
}