import { Expresion } from "../Abstract/EXPRESION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { nodoAST } from "../Abstract/nodoAST";
import Primitivo from "./PRIMITIVO";


export default class Tolower extends Expresion{
    public exp:Expresion;
    public simbolo:string;
    constructor(linea:number, columna:number, simbolo:string, exp:Expresion){
        super(linea, columna,undefined, new Tipo(tipos.CADENA));
        this.exp = exp;
        this.simbolo = simbolo;
    }

    public getValor(tree:TRADUCTOR, table:tablaSimbolos):Expresion{
        let valor1 = this.exp.getValor(tree, table);
        if(valor1.Tipo.getTipos() === tipos.CADENA){
            let nueva = new Primitivo(new Tipo(tipos.CADENA), valor1.valor.toUpperCase(), this.linea, this.columna)
            table.update(this.exp.ID, nueva);
            return nueva;
        }else{
            tree.newERROR("SEMANTICO","TOUPPER ES SOLO PARA VARIABLES TIPO STRING", this.linea, this.columna);
            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
        }
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("TOUPPER");
        nodo.agregarHijoS(this.simbolo);
        nodo.agregarHijo(this.exp.getNodo());
        return nodo;
    }
}