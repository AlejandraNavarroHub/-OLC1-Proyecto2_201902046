import Simbolo from "./Simbolo";
import tablaSimbolos from "./ENTORNO";
import Excepcion from "../exceptions/EXCEPTION";
import {Instruccion} from "../Abstract/Instruccion";

export default class TRADUCTOR {
    public instrucciones: Array<Instruccion>;
    public errores: Array<Excepcion>;
    public consola: String;
    public global: tablaSimbolos;
    public CICLOS:any[] = [];
    public FUNCIONES:any[] = [];
    // public pila_exec: Array<E> = new Array<Expresion>();

    constructor(instrucciones: Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new tablaSimbolos();
        this.errores = new Array<Excepcion>();
    }

    public updateConsola(update:String){
        this.consola = `${this.consola}${update}\n`;
    }

    public newERROR(tipo:string, descripcion:string, fila:number, columna:number){
        this.errores.push(new Excepcion(this.errores.length+1, tipo, descripcion, fila, columna));
    }
}