import { Instruccion } from "../Abstract/Instruccion";
import Excepcion from "../exceptions/EXCEPTION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";
import FUNCION_E from "../expresiones/FUNCION";

export default class FUNCION extends Instruccion{
   
    private PARAMETROS:Array<Expresion> | any;
    private BLOQUE:Array<Instruccion>;
    private TIPOV:Tipo;
    constructor(linea:number, columna:number, tipo:Tipo, ID:string, BLOQUE: Array<Instruccion>, PARAMETROS?:Array<Expresion>){
        super(linea, columna, new Tipo_INS(T_INS.OTROS), ID);
        this.PARAMETROS = PARAMETROS;
        this.BLOQUE = BLOQUE;
        this.TIPOV = tipo;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        let comprobar:any = undefined;
        if (this.TIPOV.getTipos()!==tipos.ERROR) {
            comprobar = table.set(this.ID, this, this.TIPOV);
        }else{
            comprobar = table.set(this.ID, this, new Tipo(tipos.CADENA));
        }
        if (comprobar.tipo.getTipos()===tipos.ERROR) {
            tree.newERROR("SEMANTICO","FUNCIÓN O VARIABLE YA DECLARADA",this.linea, this.columna);
        }
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("IMPRIMIR");
       
        return nodo;
    }
}