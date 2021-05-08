import { Expresion } from "../Abstract/EXPRESION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, {tipos} from "../tablaSimbolo/TIPO";
import { nodoAST } from "../Abstract/nodoAST";
import Primitivo from "./PRIMITIVO";


export default class Arit extends Expresion{

    public exp1:Expresion;
    public exp2:Expresion|any;
    public simbolo:string;
    constructor(linea:number, columna:number, exp1:Expresion, simbolo:string, exp2?:Expresion){
        super(linea, columna, undefined, new Tipo(tipos.ENTERO));
        this.exp1 = exp1;
        this.exp2 = exp2;
        this.simbolo = simbolo;
    }

    public getValor(tree:TRADUCTOR, table:tablaSimbolos):Expresion{
        let valor1 = this.exp1.getValor(tree, table);
        let valor2 = this.exp2?.getValor(tree, table);
        switch(this.simbolo){
            case "+":
                if (valor2) {
                    switch(valor1.Tipo.getTipos()){
                        case tipos.ENTERO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor + valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor + valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor + valor2.valor, this.linea,this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor + valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    return new Primitivo(new Tipo(tipos.CADENA), String(valor1.valor) + valor2.valor, this.linea,this.columna);
                            }
                        case tipos.DECIMAL:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor + valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor + valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor + valor2.valor, this.linea,this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor + valor2.valor, this.linea,this.columna);
                                case tipos.CADENA:
                                    return new Primitivo(new Tipo(tipos.CADENA), String(valor1.valor) + valor2.valor, this.linea,this.columna);
                            }
                        case tipos.BOOLEANO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor + valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor + valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE SUMAR UN BOOLEANO CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE SUMAR UN BOOLEANO CON UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    return new Primitivo(new Tipo(tipos.CADENA), String(valor1.valor) + valor2.valor, this.linea,this.columna);
                            }
                        case tipos.CARACTER:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor.charCodeAt() + valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor.charCodeAt() + valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE SUMAR UN CARACTER CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea,this.columna);
                                case tipos.CADENA:
                                    return new Primitivo(new Tipo(tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea,this.columna);
                            }
                        case tipos.CADENA:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    return new Primitivo(new Tipo(tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea,this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea,this.columna);
                                case tipos.CADENA:
                                    return new Primitivo(new Tipo(tipos.CADENA), String(valor1.valor) + String(valor2.valor), this.linea,this.columna);
                            }
                    }
                }
            case "-":
                if (valor2) {
                    switch(valor1.Tipo.getTipos()){
                        case tipos.ENTERO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor - valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor - valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor - valor2.valor, this.linea,this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor - valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE RESTAR UN ENTERO CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.DECIMAL:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor - valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor - valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor - valor2.valor, this.linea,this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor - valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE RESTAR UN DOUBLE CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.BOOLEANO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor - valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor - valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE RESTAR UN BOOLEANO CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE RESTAR UN BOOLEANO CON UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE RESTAR UN BOOLEANO CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CARACTER:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor.charCodeAt() - valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor.charCodeAt() - valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE RESTAR UN CARACTER CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE RESTAR UN CARACTER CON UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE RESTAR UN CARACTER CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CADENA:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE RESTAR UNA CADENA CON UN ENTERO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE RESTAR UNA CADENA CON UN DOUBLE", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE RESTAR UNA CADENA CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE RESTAR UNA CADENA CON UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE RESTAR UNA CADENA CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }else{
                    switch(valor1.Tipo.getTipos()){
                        case tipos.ENTERO:
                            return new Primitivo(new Tipo(tipos.ENTERO), -valor1.valor, this.linea, this.columna);
                        case tipos.DECIMAL:
                            return new Primitivo(new Tipo(tipos.DECIMAL), -valor1.valor, this.linea, this.columna);
                        case tipos.BOOLEANO:
                            tree.newERROR("SEMANTICO","NO SE PUEDE REALIZAR LA NEGACION UNARIA CON UN BOOLEANO", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                        case tipos.CARACTER:
                            tree.newERROR("SEMANTICO","NO SE PUEDE REALIZAR LA NEGACION UNARIA CON UN CARACTER", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                        case tipos.CADENA:
                            tree.newERROR("SEMANTICO","NO SE PUEDE REALIZAR LA NEGACION UNARIA CON UNA CADENA", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    }
                }
            case "*":
                if (valor2) {
                    switch(valor1.Tipo.getTipos()){
                        case tipos.ENTERO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor * valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor * valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UN ENTERO CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor * valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UN ENTERO CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.DECIMAL:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor * valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor * valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UN DOUBLE CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor * valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UN DOUBLE CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.BOOLEANO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UN BOOLEANO CON UN ENTERO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UN BOOLEANO CON UN DECIMAL", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UN BOOLEANO CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UN BOOLEANO CON UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UN BOOLEANO CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CARACTER:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor.charCodeAt() * valor2.valor, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor.charCodeAt() * valor2.valor, this.linea,this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UN CARACTER CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UN CARACTER CON UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UN CARACTER CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CADENA:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UNA CADENA CON UN ENTERO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            case tipos.DECIMAL:
                                tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UNA CADENA CON UN DOUBLE", this.linea, this.columna);
                                return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            case tipos.BOOLEANO:
                                tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UNA CADENA CON UN BOOLEANO", this.linea, this.columna);
                                return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            case tipos.CARACTER:
                                tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UNA CADENA CON UN CARACTER", this.linea, this.columna);
                                return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            case tipos.CADENA:
                                tree.newERROR("SEMANTICO","NO PUEDE MULTIPLICAR UNA CADENA CON UNA CADENA", this.linea, this.columna);
                                return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
            case "/":
                if (valor2) {
                    switch(valor1.Tipo.getTipos()){
                        case tipos.ENTERO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    if(valor2.valor == 0){
                                        tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN ENTERO CON UN CERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    }else{
                                        return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case tipos.DECIMAL:
                                    if(valor2.valor == 0){
                                        tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN ENTERO CON UN CERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    }else{
                                        return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN ENTERO CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor / valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN ENTERO CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.DECIMAL:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    if(valor2.valor == 0){
                                        tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN DOUBLE CON UN CERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    }else{
                                        return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case tipos.DECIMAL:
                                    if(valor2.valor == 0){
                                        tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN DOUBLE CON UN CERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    }else{
                                        return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor / valor2.valor, this.linea, this.columna);
                                    }
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN DOUBLE CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor / valor2.valor.charCodeAt(), this.linea,this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN DOUBLE CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.BOOLEANO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN BOOLEANO CON UN ENTERO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN BOOLEANO CON UN DECIMAL", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN BOOLEANO CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN BOOLEANO CON UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN BOOLEANO CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CARACTER:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    if(valor2.valor == 0){
                                        tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN CARACTER CON UN CERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    }else{
                                        return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor.charCodeAt() / valor2.valor, this.linea, this.columna);
                                    }
                                case tipos.DECIMAL:
                                    if(valor2.valor == 0){
                                        tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN CARACTER CON UN CERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    }else{
                                        return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor.charCodeAt() / valor2.valor, this.linea, this.columna);
                                    }
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN CARACTER CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN CARACTER CON UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UN CARACTER CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CADENA:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UNA CADENA CON UN ENTERO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UNA CADENA CON UN DECIMAL", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UNA CADENA CON UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UNA CADENA CON UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE DIVIDIR UNA CADENA CON UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
            case "^":
                if (valor2) {
                    switch(valor1.Tipo.getTipos()){
                        case tipos.ENTERO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.ENTERO), Math.pow(valor1.valor,valor2.valor), this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), Math.pow(valor1.valor,valor2.valor), this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN ENTERO Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN ENTERO Y UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.DECIMAL:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), Math.pow(valor1.valor,valor2.valor), this.linea, this.columna);
                                case tipos.DECIMAL:
                                    return new Primitivo(new Tipo(tipos.DECIMAL), Math.pow(valor1.valor,valor2.valor), this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN DECIMAL Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN DECIMAL Y UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN DECIMAL Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.BOOLEANO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN BOOLEANO Y UN ENTERO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN BOOLEANO Y UN DECIMAL", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN BOOLEANO Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN BOOLEANO Y UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN BOOLEANO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CARACTER:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN CARACTER Y UN ENTERO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN CARACTER Y UN DECIMAL", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN CARACTER Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN CARACTER Y UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CADENA:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UNA CADENA Y UN ENTERO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UNA CADENA Y UN DECIMAL", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UNA CADENA Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UNA CADENA Y UN CARACTER", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE ELEVAR CON UNA CADENA Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                    }
                }
            case "%":
                if (valor2) {
                    switch(valor1.Tipo.getTipos()){
                        case tipos.ENTERO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    if(valor2.valor == 0){
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    }else{
                                        return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor % valor2.valor, this.linea, this.columna);
                                    }
                                case tipos.DECIMAL:
                                    if(valor2.valor == 0){
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    }else{
                                        return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor % valor2.valor, this.linea, this.columna);
                                    }
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN ENTERO Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN ENTERO Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.DECIMAL:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    if(valor2.valor == 0){
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    }else{
                                        return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor % valor2.valor, this.linea, this.columna);
                                    }
                                case tipos.DECIMAL:
                                    if(valor2.valor == 0){
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    }else{
                                        return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor % valor2.valor, this.linea, this.columna);
                                    }
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN DOUBLE Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN DOUBLE Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN DOUBLE Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.BOOLEANO:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UN ENTERO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UN DOUBLE", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN BOOLEANO Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CARACTER:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UN ENTERO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UN DOUBLE", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            }
                        case tipos.CADENA:
                            switch(valor2.Tipo.getTipos()){
                                case tipos.ENTERO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UN ENTERO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.DECIMAL:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UN DOUBLE", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.BOOLEANO:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CARACTER:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UN BOOLEANO", this.linea, this.columna);
                                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                case tipos.CADENA:
                                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN MODULO CON UNA CADENA Y UNA CADENA", this.linea, this.columna);
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