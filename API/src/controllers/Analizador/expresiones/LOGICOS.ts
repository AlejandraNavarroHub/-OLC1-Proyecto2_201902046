import { Expresion } from "../Abstract/EXPRESION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, {tipos} from "../tablaSimbolo/TIPO";
import { nodoAST } from "../Abstract/nodoAST";
import Primitivo from "./PRIMITIVO";


export default class Logicos extends Expresion{

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
            case "&&":
                if (valor2) {
                    if (valor1.Tipo.getTipos() == tipos.BOOLEANO && valor2.Tipo.getTipos() == tipos.BOOLEANO){
                        return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor && valor2.valor, this.linea,this.columna);
                    }else{
                        switch(valor1.Tipo.getTipos()){
                            case tipos.ENTERO:
                                switch(valor2.Tipo.getTipos()){
                                    case tipos.ENTERO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON VARIABLES TIPO ENTERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN ENTERO Y UN DECIMAL", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN ENTERO Y BOOLEAN", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CARACTER:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN ENTERO Y UN CARACTER", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CADENA:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case tipos.DECIMAL:
                                switch(valor2.Tipo.getTipos()){
                                    case tipos.ENTERO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON DOUBLE Y ENTERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN DOUBLE Y UN DECIMAL", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN DOUBLE Y BOOLEAN", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CARACTER:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN DOUBLE Y UN CARACTER", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CADENA:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN DOUBLE Y UNA CADENA", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case tipos.BOOLEANO:
                                switch(valor2.Tipo.getTipos()){
                                    case tipos.ENTERO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON BOOLEANO Y ENTERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN BOOLEANO Y UN DECIMAL", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CARACTER:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN BOOLEANO Y UN CARACTER", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CADENA:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN BOOLEANO Y UNA CADENA", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case tipos.CARACTER:
                                switch(valor2.Tipo.getTipos()){
                                    case tipos.ENTERO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON CARACTER Y ENTERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN CARACTER Y UN DECIMAL", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN CARACTER Y BOOLEAN", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CARACTER:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN CARACTER Y UN CARACTER", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CADENA:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case tipos.CADENA:
                                switch(valor2.Tipo.getTipos()){
                                    case tipos.ENTERO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN STRING Y ENTERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN STRING Y UN DECIMAL", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN STRING Y BOOLEAN", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CARACTER:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN STRING Y UN CARACTER", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CADENA:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN AND CON UN STRING Y UNA CADENA", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                }
                        }
                    }
                    
                }
            case "||":
                if (valor2) {
                    if (valor1.Tipo.getTipos() == tipos.BOOLEANO && valor2.Tipo.getTipos() == tipos.BOOLEANO){
                        return new Primitivo(new Tipo(tipos.BOOLEANO), valor1.valor || valor2.valor, this.linea,this.columna);
                    }else{
                        switch(valor1.Tipo.getTipos()){
                            case tipos.ENTERO:
                                switch(valor2.Tipo.getTipos()){
                                    case tipos.ENTERO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON VARIABLES TIPO ENTERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN ENTERO Y UN DECIMAL", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN ENTERO Y BOOLEAN", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CARACTER:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN ENTERO Y UN CARACTER", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CADENA:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN ENTERO Y UNA CADENA", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case tipos.DECIMAL:
                                switch(valor2.Tipo.getTipos()){
                                    case tipos.ENTERO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON DOUBLE Y ENTERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN DOUBLE Y UN DECIMAL", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN DOUBLE Y BOOLEAN", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CARACTER:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN DOUBLE Y UN CARACTER", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CADENA:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN DOUBLE Y UNA CADENA", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case tipos.BOOLEANO:
                                switch(valor2.Tipo.getTipos()){
                                    case tipos.ENTERO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON BOOLEANO Y ENTERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN BOOLEANO Y UN DECIMAL", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CARACTER:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN BOOLEANO Y UN CARACTER", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CADENA:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN BOOLEANO Y UNA CADENA", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case tipos.CARACTER:
                                switch(valor2.Tipo.getTipos()){
                                    case tipos.ENTERO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON CARACTER Y ENTERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN CARACTER Y UN DECIMAL", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN CARACTER Y BOOLEAN", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CARACTER:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN CARACTER Y UN CARACTER", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CADENA:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN CARACTER Y UNA CADENA", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                }
                            case tipos.CADENA:
                                switch(valor2.Tipo.getTipos()){
                                    case tipos.ENTERO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN STRING Y ENTERO", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.DECIMAL:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN STRING Y UN DECIMAL", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.BOOLEANO:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN STRING Y BOOLEAN", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CARACTER:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN STRING Y UN CARACTER", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    case tipos.CADENA:
                                        tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN OR CON UN STRING Y UNA CADENA", this.linea, this.columna);
                                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                }
                        }
                    }
                    
                }
            case "!":
                if (valor2) {
                    tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN NOT CON DOS VARIABLES", this.linea, this.columna);
                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);                       
                }else{
                    if (valor1.Tipo.getTipos() == tipos.BOOLEANO){
                        return new Primitivo(new Tipo(tipos.BOOLEANO), !valor1.valor, this.linea,this.columna);
                    }else{
                        switch(valor1.Tipo.getTipos()){
                            case tipos.ENTERO:
                                tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN NOT CON UN ENTERO", this.linea, this.columna);
                                return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            case tipos.DECIMAL:
                                tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN NOT CON UN DECIMAL", this.linea, this.columna);
                                return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            case tipos.CARACTER:
                                tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN NOT CON UN CARACTER", this.linea, this.columna);
                                return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                            case tipos.CADENA:
                                tree.newERROR("SEMANTICO","NO PUEDE REALIZAR LA OPERACIÓN NOT CON UN STRING", this.linea, this.columna);
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