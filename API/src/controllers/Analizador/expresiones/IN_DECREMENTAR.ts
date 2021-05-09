import { Expresion } from "../Abstract/EXPRESION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, {tipos} from "../tablaSimbolo/TIPO";
import { nodoAST } from "../Abstract/nodoAST";
import Primitivo from "./PRIMITIVO";
import Simbolo from "../tablaSimbolo/SIMBOLO";


export default class Incrementar extends Expresion{

    public exp1:Expresion;
    public simbolo:string;
    constructor(linea:number, columna:number, exp1:Expresion, simbolo:string){
        super(linea, columna, undefined, new Tipo(tipos.ENTERO));
        this.exp1 = exp1;
        this.simbolo = simbolo;
    }

    public getValor(tree:TRADUCTOR, table:tablaSimbolos):Expresion{
        let valor1 = this.exp1.getValor(tree, table);
        if(this.simbolo == "++"){
            if(this.exp1.ID){
                if(valor1.Tipo.tipos == tipos.ENTERO || valor1.Tipo.tipos == tipos.DECIMAL){
                    if(valor1.Tipo.tipos == tipos.ENTERO){
                        let nueva = new Primitivo(new Tipo(tipos.ENTERO), valor1.valor+1, this.linea, this.columna)
                        table.update(this.exp1.ID, nueva);
                        return nueva;
                    }else{
                        let nueva = new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor+1, this.linea, this.columna)
                        table.update(this.exp1.ID, nueva);
                        return nueva;
                    }
                }else{
                    tree.newERROR("SEMANTICO","NO PUEDE INCREMENTAR TIPOS DIFERENTES A INT Y DOUBLE", this.linea, this.columna);
                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                }
            }
            else{
                if(valor1.Tipo.tipos == tipos.ENTERO || valor1.Tipo.tipos == tipos.DECIMAL){
                    if(valor1.Tipo.tipos == tipos.ENTERO){
                        return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor+1, this.linea, this.columna);
                    }else{
                        return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor+1, this.linea, this.columna);
                    }
                }else{
                    tree.newERROR("SEMANTICO","NO PUEDE INCREMENTAR TIPOS DIFERENTES A INT Y DOUBLE", this.linea, this.columna);
                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                }
            }
        }else if(this.simbolo == "--"){
            if(this.exp1.ID){
                if(valor1.Tipo.tipos == tipos.ENTERO || valor1.Tipo.tipos == tipos.DECIMAL){
                    if(valor1.Tipo.tipos == tipos.ENTERO){
                        let nueva = new Primitivo(new Tipo(tipos.ENTERO), valor1.valor-1, this.linea, this.columna)
                        table.update(this.exp1.ID, nueva);
                        return nueva;
                    }else{
                        let nueva = new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor-1, this.linea, this.columna)
                        table.update(this.exp1.ID, nueva);
                        return nueva;
                    }
                }else{
                    tree.newERROR("SEMANTICO","NO PUEDE DECREMENTAR TIPOS DIFERENTES A INT Y DOUBLE", this.linea, this.columna);
                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                }
            }
            else{
                if(valor1.Tipo.tipos == tipos.ENTERO || valor1.Tipo.tipos == tipos.DECIMAL){
                    if(valor1.Tipo.tipos == tipos.ENTERO){
                        return new Primitivo(new Tipo(tipos.ENTERO), valor1.valor-1, this.linea, this.columna);
                    }else{
                        return new Primitivo(new Tipo(tipos.DECIMAL), valor1.valor-1, this.linea, this.columna);
                    }
                }else{
                    tree.newERROR("SEMANTICO","NO PUEDE DECREMENTAR TIPOS DIFERENTES A INT Y DOUBLE", this.linea, this.columna);
                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                }
            }
        }
        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
    }



    public getNodo(): nodoAST {
        let nodo;
        if(this.simbolo == "++"){
            nodo = new nodoAST("INCREMENTAR");
            nodo.agregarHijo(this.exp1.getNodo());
            nodo.agregarHijoS(this.simbolo);
        }else{
            nodo = new nodoAST("DECREMENTAR");
            nodo.agregarHijo(this.exp1.getNodo());
            nodo.agregarHijoS(this.simbolo);
        }
        return nodo;
        
    }
}