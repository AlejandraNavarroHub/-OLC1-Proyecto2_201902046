import { Expresion } from "../Abstract/EXPRESION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, {tipos} from "../tablaSimbolo/TIPO";
import { nodoAST } from "../Abstract/nodoAST";
import Primitivo from "./PRIMITIVO";


export default class Ternario extends Expresion{

    public exp1:Expresion;
    public exp2:Expresion;
    public exp3:Expresion;
    constructor(linea:number, columna:number, exp1:Expresion, exp2:Expresion, exp3:Expresion){
        super(linea, columna, undefined, new Tipo(tipos.ENTERO));
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.exp3 = exp3;
    }

    public getValor(tree:TRADUCTOR, table:tablaSimbolos):Expresion{
        let comprobar = this.exp1.getValor(tree, table);
        if (comprobar.Tipo.getTipos()!==tipos.ERROR) {
            if (comprobar.Tipo.getTipos() === tipos.BOOLEANO) {
               if (comprobar.valor) {
                   let valor = this.exp2.getValor(tree, table);
                   if (valor.Tipo.getTipos()!== tipos.ERROR) {
                        return valor;
                   }
               }else{
                    let valor = this.exp3.getValor(tree, table);
                    if (valor.Tipo.getTipos()!== tipos.ERROR) {
                        return valor;
                    }
               }
               return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna );
            }
            tree.newERROR("SEMANTICO","EL PRIMER VALOR DE UN TERNARIO DEBE SER UN BOOLEANO", this.linea, this.columna);
            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna );
        }
        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna );

    }

    public getNodo(): nodoAST {
        throw new Error("Method not implemented.");
    }
}