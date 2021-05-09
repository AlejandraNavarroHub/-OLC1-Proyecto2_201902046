import { Instruccion } from "../Abstract/Instruccion";
import Excepcion from "../exceptions/EXCEPTION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";


export default class RETURN extends Instruccion{
   
    private exp:Expresion | any;
    constructor(linea:number, columna:number, exp?:Expresion){
        super(linea, columna, new Tipo_INS(T_INS.OTROS));
        this.exp = exp;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        if (tree.FUNCIONES.length>0) {
            if (this.exp instanceof Expresion) {
                let value = this.exp.getValor(tree, table);
                if (value.Tipo.getTipos()!== tipos.ERROR) {
                    return {nombre:"RETURN", valor:value};
                }
            }else{
                return {nombre:"RETURN", valor:undefined};
            }
        }
        tree.newERROR("SEMANTICO","NO SE PUEDE UTILIZAR RETURN FUERA DE UNA FUNCION", this.linea, this.columna);
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("IMPRIMIR");
       
        return nodo;
    }
}