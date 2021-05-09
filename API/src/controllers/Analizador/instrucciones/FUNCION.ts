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
        let nodo = new nodoAST("FUNCION");
        if (this.TIPOV.getTipos()!==tipos.ERROR){
            nodo.agregarHijoS(this.TIPOV.getTipos());
            nodo.agregarHijoS(this.ID);
            if(this.PARAMETROS){
                nodo.agregarHijo(this.PARAMETROS.getnode());
            }
        }else{
            nodo.agregarHijoS("VOID");
            nodo.agregarHijoS(this.ID);
            if(this.PARAMETROS){
                nodo.agregarHijo(this.PARAMETROS.getnode());
            }
        }
        let cont = new nodoAST("INSTRUCCIONES");
        for(let instrucion of this.BLOQUE){
            if (instrucion instanceof Instruccion) {
                cont.agregarHijo(instrucion.getNodo());
            }
        }
        nodo.agregarHijo(cont);
        return nodo;
    }
}