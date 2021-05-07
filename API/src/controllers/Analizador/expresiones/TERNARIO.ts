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
    public simbolo1:string;
    public simbolo2:string;
    constructor(linea:number, columna:number, exp1:Expresion, simbolo1:string, exp2:Expresion, simbolo2:string, exp3:Expresion){
        super(linea, columna, undefined, new Tipo(tipos.ENTERO));
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.exp3 = exp3;
        this.simbolo1 = simbolo1;
        this.simbolo2 = simbolo2;
    }

    public getValor(tree:TRADUCTOR, table:tablaSimbolos):Expresion{
        let valor1 = this.exp1.getValor(tree, table);
        let valor2 = this.exp2.getValor(tree,table);
        let valor3 = this.exp3.getValor(tree,table);

        if(valor1 && valor2 && valor3){
            if (valor1.Tipo.getTipos() == tipos.BOOLEANO){
                if(valor1.valor == true){
                    switch(valor2.Tipo.getTipos()){
                        case tipos.ENTERO:
                            return new Primitivo(new Tipo(tipos.ENTERO), valor2.valor, this.linea, this.columna);
                        case tipos.DECIMAL:
                            return new Primitivo(new Tipo(tipos.DECIMAL), valor2.valor, this.linea,this.columna);
                        case tipos.BOOLEANO:
                            return new Primitivo(new Tipo(tipos.ENTERO), valor2.valor, this.linea,this.columna);
                        case tipos.CARACTER:
                            return new Primitivo(new Tipo(tipos.ENTERO), valor2.valor, this.linea,this.columna);
                        case tipos.CADENA:
                            return new Primitivo(new Tipo(tipos.CADENA), valor2.valor, this.linea,this.columna);
                    }
                }else{
                    switch(valor3.Tipo.getTipos()){
                        case tipos.ENTERO:
                            return new Primitivo(new Tipo(tipos.ENTERO), valor3.valor, this.linea, this.columna);
                        case tipos.DECIMAL:
                            return new Primitivo(new Tipo(tipos.DECIMAL), valor3.valor, this.linea,this.columna);
                        case tipos.BOOLEANO:
                            return new Primitivo(new Tipo(tipos.ENTERO), valor3.valor, this.linea,this.columna);
                        case tipos.CARACTER:
                            return new Primitivo(new Tipo(tipos.ENTERO), valor3.valor, this.linea,this.columna);
                        case tipos.CADENA:
                            return new Primitivo(new Tipo(tipos.CADENA), valor3.valor, this.linea,this.columna);
                    }
                }
            }else{
                tree.newERROR("SEMANTICO","LA CONDICIÓN DEBE SER TIPO BOOLEAN", this.linea, this.columna);
                return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
            }
        }else{
            tree.newERROR("SEMANTICO","NO CUMPLE CON LA SINTAXIS (CONDICION) ? EXPRESION : EXPRESION", this.linea, this.columna);
            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
        }
        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);

    }

    public getNodo(): nodoAST {
        throw new Error("Method not implemented.");
    }
}