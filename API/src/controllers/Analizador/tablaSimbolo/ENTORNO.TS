import { Expresion } from "../Abstract/EXPRESION";
import Simbolo from "./SIMBOLO";
import Tipo, { tipos } from "./TIPO";


export default class Entorno
{
    public nombre:string;
    public tabla:Map<String, Simbolo>;
    private anterior: Entorno|any;
    constructor(nombre:string= "GLOBAL", anterior?:Entorno){
        this.nombre = nombre;
        this.anterior = anterior;
        this.tabla = new Map<String, Simbolo>();
    }

    public set(simbolo:string, valor:any, tipo:Tipo, DIMENSION:any = undefined, TAMAÑO:any = undefined): Simbolo{
        simbolo = simbolo.toUpperCase();
        if(!this.tabla.has(simbolo)){
            let nueva = new Simbolo(tipo, simbolo, valor, DIMENSION, TAMAÑO);
            this.tabla.set(simbolo, nueva);
            return nueva;
        }
        return new Simbolo(new Tipo(tipos.ERROR), "", undefined); 
    }
    
    public update(simbolo:string, valor:Expresion){
        let value = this.get(simbolo);
        if(value.tipo.getTipos()!==tipos.ERROR){
            value.valor = valor.valor;
            this.tabla.set(simbolo, value);
            return true;
        }
        return false;
    }

    public get(variable:String):Simbolo{
        variable = variable.toUpperCase();
        for(var temp:Entorno = this; temp!=null; temp = temp.anterior ){
            if (temp.tabla.has(variable)) {
                var result = temp.tabla.get(variable);
                if (result) {
                    return result;
                }
            }
        }
        //Error
        return new Simbolo(new Tipo(tipos.ERROR), "", undefined);
    }

}