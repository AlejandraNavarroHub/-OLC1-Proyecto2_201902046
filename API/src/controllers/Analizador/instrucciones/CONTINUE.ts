import { Instruccion } from "../Abstract/Instruccion";
import Excepcion from "../exceptions/EXCEPTION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";


export default class CONTINUE extends Instruccion{
   

    constructor(linea:number, columna:number){
        super(linea, columna, new Tipo_INS(T_INS.OTROS));
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        if (tree.CICLOS.length>0) {
            return {nombre:"CONTINUE", valor:undefined};
        }
        tree.newERROR("SEMANTICO","NO SE PUEDE UTILIZAR CONTINUE FUERA DE UN CICLO", this.linea, this.columna);
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("CONTINUE");
        return nodo;
    }
}