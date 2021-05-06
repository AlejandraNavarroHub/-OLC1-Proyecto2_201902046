import { Expresion } from "../Abstract/EXPRESION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, {tipos} from "../tablaSimbolo/TIPO";
import { nodoAST } from "../Abstract/nodoAST";
import Primitivo from "./PRIMITIVO";


export default class Rela extends Expresion{

    public exp1:Expresion;
    public exp2:Expresion;
    public simbolo:string;
    constructor(linea:number, columna:number, exp1:Expresion, simbolo:string, exp2:Expresion){
        super(linea, columna, undefined, new Tipo(tipos.BOOLEANO));
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.simbolo = simbolo;
    }

    public getValor(tree:TRADUCTOR, table:tablaSimbolos):Expresion{
        let valor1 = this.exp1.getValor(tree, table);
        let valor2 = this.exp2?.getValor(tree, table);

        switch(this.simbolo){
            case "<":
                if (valor2) {
                    switch(valor1.Tipo.getTipos()){
                        case tipos.ENTERO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor < valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor < valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE CON UN ENTERO Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor < valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.DECIMAL:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor < valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor < valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE CON UN DOUBLE Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor < valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.BOOLEANO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CARACTER:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() < valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() < valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE CON UN CARACTER Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() < valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CADENA:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR QUE CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
            case ">":
                if (valor2) {
                    switch(valor1.Tipo.getTipos()){
                        case tipos.ENTERO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor > valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor > valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE CON UN ENTERO Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor > valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.DECIMAL:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor > valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor > valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE CON UN DOUBLE Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor > valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.BOOLEANO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CARACTER:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() > valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() > valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE CON UN CARACTER Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() > valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CADENA:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR QUE CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
            case "!=":
                if (valor2) {
                    switch(valor1.Tipo.getTipos()){
                        case tipos.ENTERO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor != valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor != valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN CON UN ENTERO Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor != valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.DECIMAL:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor != valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor != valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN CON UN DOUBLE Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor != valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.BOOLEANO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CARACTER:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() != valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() != valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN CON UN CARACTER Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() != valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CADENA:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN DIFERENCIACIÓN CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
            case "==":
                if (valor2) {
                    switch(valor1.Tipo.getTipos()){
                        case tipos.ENTERO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor == valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor == valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD CON UN ENTERO Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor == valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.DECIMAL:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor == valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor == valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD CON UN DOUBLE Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor == valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.BOOLEANO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CARACTER:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() == valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() == valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD CON UN CARACTER Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() == valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CADENA:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN IGUALDAD CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
            case ">=":
                if (valor2) {
                    switch(valor1.Tipo.getTipos()){
                        case tipos.ENTERO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor >= valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor >= valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL CON UN ENTERO Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor >= valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.DECIMAL:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor >= valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor >= valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL CON UN DOUBLE Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor >= valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.BOOLEANO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CARACTER:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() >= valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() >= valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL CON UN CARACTER Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() >= valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CADENA:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MAYOR IGUAL CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
            case "<=":
                if (valor2) {
                    switch(valor1.Tipo.getTipos()){
                        case tipos.ENTERO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor <= valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor <= valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL CON UN ENTERO Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor <= valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.DECIMAL:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor <= valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor <= valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL CON UN DOUBLE Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor <= valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.BOOLEANO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL ENTRE VARIABLES TIPO BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CARACTER:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() <= valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() <= valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL CON UN CARACTER Y UN BOOLEAN", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor.charCodeAt() <= valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CADENA:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MENOR IGUAL CON VARIABLE TIPO STRING", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
        }
        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
    }

    public getNodo(): nodoAST {
        throw new Error("Method not implemented.");
    }
}