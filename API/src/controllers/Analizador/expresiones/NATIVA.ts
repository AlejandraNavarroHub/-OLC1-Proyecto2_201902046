import { Expresion } from "../Abstract/EXPRESION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, {tipos} from "../tablaSimbolo/TIPO";
import { nodoAST } from "../Abstract/nodoAST";
import Primitivo from "./PRIMITIVO";


export default class Nativa extends Expresion{

    public exp1:Expresion;
    public simbolo:string;
    constructor(linea:number, columna:number, simbolo:string, exp1:Expresion){
        super(linea, columna, undefined, new Tipo(tipos.ENTERO));
        this.exp1 = exp1;
        this.simbolo = simbolo;
    }

    public getValor(tree:TRADUCTOR, table:tablaSimbolos):Expresion{
        let valor1 = this.exp1.getValor(tree, table);

        switch(this.simbolo){
            case "Length":
                switch(valor1.Tipo.getTipos()){
                    case tipos.ENTERO:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON INT", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    case tipos.DECIMAL:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON DOUBLE", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    case tipos.BOOLEANO:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON BOOLEAN", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    case tipos.CARACTER:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON UN CHAR", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    case tipos.CADENA:
                        return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor.length, this.linea,this.columna);
                }
            case "Truncate":
                switch(valor1.Tipo.getTipos()){
                    case tipos.ENTERO:
                        return new Primitivo(new Tipo(tipos.ENTERO), Math.trunc(valor1.valor), this.linea,this.columna);
                    case tipos.DECIMAL:
                        return new Primitivo(new Tipo(tipos.ENTERO), Math.trunc(valor1.valor), this.linea,this.columna);
                    case tipos.BOOLEANO:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON BOOLEAN", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    case tipos.CARACTER:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON UN CHAR", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    case tipos.CADENA:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON UNA CADENA", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                }
            case "Round":
                switch(valor1.Tipo.getTipos()){
                    case tipos.ENTERO:
                        return new Primitivo(new Tipo(tipos.ENTERO), Math.round(valor1.valor), this.linea,this.columna);
                    case tipos.DECIMAL:
                        return new Primitivo(new Tipo(tipos.ENTERO), Math.round(valor1.valor), this.linea,this.columna);
                    case tipos.BOOLEANO:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON BOOLEAN", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    case tipos.CARACTER:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON UN CHAR", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    case tipos.CADENA:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON UNA CADENA", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                }
            case "Typeof":
                switch(valor1.Tipo.getTipos()){
                    case tipos.ENTERO:
                        return new Primitivo(new Tipo(tipos.CADENA), valor1.Tipo.getTipos(), this.linea,this.columna);
                    case tipos.DECIMAL:
                        return new Primitivo(new Tipo(tipos.CADENA), valor1.Tipo.getTipos(), this.linea,this.columna);
                    case tipos.BOOLEANO:
                        return new Primitivo(new Tipo(tipos.CADENA), valor1.Tipo.getTipos(), this.linea,this.columna);
                    case tipos.CARACTER:
                        return new Primitivo(new Tipo(tipos.CADENA), valor1.Tipo.getTipos(), this.linea,this.columna);
                    case tipos.CADENA:
                        return new Primitivo(new Tipo(tipos.CADENA), valor1.Tipo.getTipos(), this.linea,this.columna);
                }
            case "toString":
                switch(valor1.Tipo.getTipos()){
                    case tipos.ENTERO:
                        return new Primitivo(new Tipo(tipos.CADENA), valor1.valor.toString(), this.linea,this.columna);
                    case tipos.DECIMAL:
                        return new Primitivo(new Tipo(tipos.CADENA), valor1.valor.toString(), this.linea,this.columna);
                    case tipos.BOOLEANO:
                        return new Primitivo(new Tipo(tipos.CADENA), valor1.valor.toString(), this.linea,this.columna);
                    case tipos.CARACTER:
                        return new Primitivo(new Tipo(tipos.CADENA), valor1.valor.toString(), this.linea,this.columna);
                    case tipos.CADENA:
                        return new Primitivo(new Tipo(tipos.CADENA), valor1.valor.toString(), this.linea,this.columna);
                }
            case "toCharArray":
                switch(valor1.Tipo.getTipos()){
                    case tipos.ENTERO:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON INT", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    case tipos.DECIMAL:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON DOUBLE", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    case tipos.BOOLEANO:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON BOOLEAN", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    case tipos.CARACTER:
                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN CON UN CHAR", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    case tipos.CADENA:
                        //Tipo lista
                        return new Primitivo(new Tipo(tipos.CADENA), Array.from(valor1.valor), this.linea,this.columna);
                }
        }
        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("FUNCIONES NATIVAS");
        nodo.agregarHijoS(this.simbolo);
        nodo.agregarHijo(this.exp1.getNodo());
        nodo.agregarHijoS(";");
        return nodo;
    }
}