import { Expresion } from "../Abstract/EXPRESION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, {tipos} from "../tablaSimbolo/TIPO";
import { nodoAST } from "../Abstract/nodoAST";
import Primitivo from "./PRIMITIVO";


export default class VECTOR_E extends Expresion{
    public posicion:Expresion;
    constructor(linea:number, columna:number, ID:string, posicion:Expresion){
        super(linea, columna, undefined, new Tipo(tipos.ENTERO),ID);
        this.posicion = posicion;
    }

    public getValor(tree:TRADUCTOR, table:tablaSimbolos){
        let comprobar = table.get(this.ID);
        if (comprobar.tipo.tipos !== tipos.ERROR) {
            if (comprobar.DIMENSION) {
                let valor = comprobar.valor;
                let pos = this.posicion.getValor(tree, table);
                if (valor.length>pos.valor && pos.valor>=0) {
                    return new Primitivo(comprobar.tipo, valor[pos.valor], this.linea, this.columna);    
                }
                tree.newERROR("SEMANTICO","POSICIÓN INVALIDA", this.linea, this.columna);
                return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);  
            }
            tree.newERROR("SEMANTICO","LA VARIABLE INDICADA NO ES UN VECTOR", this.linea, this.columna);
            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);    
        }
        tree.newERROR("SEMANTICO","VARIABLE NO DECLARADA", this.linea, this.columna);
        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("VARIABLE");
        nodo.agregarHijoS(this.ID);
        return nodo;
    }
}