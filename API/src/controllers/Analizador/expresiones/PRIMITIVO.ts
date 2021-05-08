import { Expresion } from "../Abstract/EXPRESION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { nodoAST } from "../Abstract/nodoAST";


export default class Primitivo extends Expresion{
    
    constructor(tipo:Tipo, valor:any, linea:number, columna:number){
        if(typeof(valor)=== typeof("")){
            switch(tipo.getTipos()){
                case tipos.ENTERO:
                    valor = Number(valor);
                    break;
                case tipos.BOOLEANO:
                    if (valor.toUpperCase() === "TRUE"){
                        valor = true;
                    }else{
                        valor = false;
                    }
                    break;
                case tipos.DECIMAL:
                    valor = Number(valor);
                    break;
            }
        }
        super(linea, columna, valor, tipo);
    }

    public getValor(tree:TRADUCTOR, table:tablaSimbolos){
        return this;
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("PRIMITIVO");
        nodo.agregarHijoS(String(this.valor));
        return nodo;
    }
}