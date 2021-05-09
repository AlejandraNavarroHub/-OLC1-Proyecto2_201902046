import { Expresion } from "../Abstract/EXPRESION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, {tipos} from "../tablaSimbolo/TIPO";
import { nodoAST } from "../Abstract/nodoAST";
import Primitivo from "./PRIMITIVO";


export default class Casteo extends Expresion{

    public tip:Tipo;
    public exp:Expresion;
    constructor(linea:number, columna:number, tip:Tipo, exp:Expresion){
        super(linea, columna, undefined, new Tipo(tipos.ENTERO));
        this.exp = exp;
        this.tip = tip;
    }

    public getValor(tree:TRADUCTOR, table:tablaSimbolos):Expresion{
        let valor1 = this.exp.getValor(tree, table);
        let tipado = this.tip;

        if (valor1) {
            switch(tipado.tipos){
                case tipos.ENTERO:
                    switch(valor1.Tipo.tipos){
                        case tipos.ENTERO:
                            return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor, this.linea,this.columna);
                        case tipos.DECIMAL:
                            return new Primitivo(new Tipo(tipos.ENTERO), Math.trunc(valor1.valor), this.linea,this.columna);
                        case tipos.BOOLEANO:
                            tree.newERROR("SEMANTICO","NO PUEDE CASTEAR A ENTERO UN BOOLEANO", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                        case tipos.CARACTER:
                            return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor.charCodeAt(), this.linea,this.columna);
                        case tipos.CADENA:
                            tree.newERROR("SEMANTICO","NO EXISTE EL CASTEO DE STRING", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    }
                case tipos.DECIMAL:
                    switch(valor1.Tipo.tipos){
                        case tipos.ENTERO:
                            return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor, this.linea,this.columna);
                        case tipos.DECIMAL:
                            return new Primitivo(new Tipo(tipos.ENTERO),valor1.valor, this.linea,this.columna);
                        case tipos.BOOLEANO:
                            tree.newERROR("SEMANTICO","NO PUEDE CASTEAR A DOUBLE UN BOOLEANO", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                        case tipos.CARACTER:
                            tree.newERROR("SEMANTICO","NO PUEDE CASTEAR A DOUBLE UN CARACTER", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                        case tipos.CADENA:
                            tree.newERROR("SEMANTICO","NO EXISTE EL CASTEO DE STRING", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    }
                case tipos.BOOLEANO:
                    switch(valor1.Tipo.tipos){
                        case tipos.ENTERO:
                            tree.newERROR("SEMANTICO","NO EXISTE EL CASTEO A BOOLEAN", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                        case tipos.DECIMAL:
                            tree.newERROR("SEMANTICO","NO EXISTE EL CASTEO A BOOLEAN", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                        case tipos.BOOLEANO:
                            tree.newERROR("SEMANTICO","NO EXISTE EL CASTEO A BOOLEAN", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                        case tipos.CARACTER:
                            tree.newERROR("SEMANTICO","NO EXISTE EL CASTEO A BOOLEAN", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                        case tipos.CADENA:
                            tree.newERROR("SEMANTICO","NO EXISTE EL CASTEO DE STRING", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    }
                case tipos.CARACTER:
                    switch(valor1.Tipo.tipos){
                        case tipos.ENTERO:
                            return new Primitivo(new Tipo(tipos.ENTERO), String.fromCharCode(valor1.valor), this.linea,this.columna);
                        case tipos.DECIMAL:
                            return new Primitivo(new Tipo(tipos.ENTERO), String.fromCharCode(valor1.valor), this.linea,this.columna);
                        case tipos.BOOLEANO:
                            tree.newERROR("SEMANTICO","NO PUEDE CASTEAR A CARACTER UN BOOLEANO", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                        case tipos.CARACTER:
                            return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor, this.linea,this.columna);
                        case tipos.CADENA:
                            tree.newERROR("SEMANTICO","NO EXISTE EL CASTEO DE STRING", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    }
                case tipos.CADENA:
                    switch(valor1.Tipo.tipos){
                        case tipos.ENTERO:
                            return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor, this.linea,this.columna);
                        case tipos.DECIMAL:
                            return new Primitivo(new Tipo(tipos.ENTERO), Math.trunc(valor1.valor), this.linea,this.columna);
                        case tipos.BOOLEANO:
                            tree.newERROR("SEMANTICO","NO PUEDE CASTEAR A ENTERO UN BOOLEANO", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                        case tipos.CARACTER:
                            return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor.charCodeAt(), this.linea,this.columna);
                            case tipos.CADENA:
                                tree.newERROR("SEMANTICO","NO EXISTE EL CASTEO DE STRING", this.linea, this.columna);
                                return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    }
                }
            }
        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("CASTEO");
        nodo.agregarHijoS(this.tip.getTipos());
        nodo.agregarHijo(this.exp.getNodo());
        return nodo;
    }
}