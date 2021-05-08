import { Instruccion } from "../Abstract/Instruccion";
import Excepcion from "../exceptions/EXCEPTION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";


export default class Imprimir extends Instruccion{
   
    private expresion: Expresion;

    constructor(expresion:Expresion, linea:number, columna:number){
        super(linea, columna, new Tipo_INS(T_INS.OTROS));
        this.expresion = expresion;
        this.linea = linea;
        this.columna = columna;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        var value = this.expresion.getValor(tree, table);
        if(value.Tipo.getTipos()===tipos.ERROR){
            return;
        }
        tree.updateConsola(value.valor+"");
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("IMPRIMIR");
        nodo.agregarHijoS("PRINT")
        nodo.agregarHijo(this.expresion.getNodo());
        nodo.agregarHijoS(";")
        return nodo;
    }
}