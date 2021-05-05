import { Expresion } from "../Abstract/EXPRESION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, {tipos} from "../tablaSimbolo/TIPO";
import { nodoAST } from "../Abstract/nodoAST";
import Primitivo from "./PRIMITIVO";


export default class VARIABLE extends Expresion{
    constructor(ID:string, linea:number, columna:number){
        super(linea, columna, undefined, new Tipo(tipos.ENTERO),ID);
    }

    public getValor(tree:TRADUCTOR, table:tablaSimbolos){
        let comprobar = table.get(this.ID);
        if (comprobar.tipo.getTipos() !== tipos.ERROR) {
            let valor = comprobar;
            return new Primitivo(valor.tipo, valor.valor, this.linea, this.columna);
        }
        tree.newERROR("SEMANTICO","VARIABLE NO DECLARADA", this.linea, this.columna);
        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
    }

    public getNodo(): nodoAST {
        throw new Error("Method not implemented.");
    }
}