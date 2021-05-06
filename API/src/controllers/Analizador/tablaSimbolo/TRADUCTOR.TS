import tablaSimbolos from "./ENTORNO";
import Excepcion from "../exceptions/EXCEPTION";
import {Instruccion} from "../Abstract/Instruccion";
import SIMB from "./list_simbol";

export default class TRADUCTOR {
    public instrucciones: Array<Instruccion>;
    public errores: Array<Excepcion>;
    public consola: String;
    public global: tablaSimbolos;
    public CICLOS:any[] = [];
    public FUNCIONES:any[] = [];
    public simbolos: Array<SIMB>;
    // public pila_exec: Array<E> = new Array<Expresion>();

    constructor(instrucciones: Array<Instruccion>){
        this.instrucciones = instrucciones;
        this.consola = "";
        this.global = new tablaSimbolos();
        this.errores = new Array<Excepcion>();
        this.simbolos = new Array<SIMB>();
    }

    public traducir(){
        for(let instrucion of this.instrucciones){
            if (instrucion instanceof Instruccion) {
                instrucion.ejecutar(this, this.global);
            }
        }
    }

    public imprimirErrores(){
        for(let error of this.errores){
            this.updateConsola(error.toString());
        }
    }
    
    public updateConsola(update:String){
        this.consola = `${this.consola}${update}\n`;
    }

    public newERROR(tipo:string, descripcion:string, fila:number, columna:number){
        this.errores.push(new Excepcion(this.errores.length+1, tipo, descripcion, fila, columna));
    }

    public newSimbol(nombre:string, grupo:string, tipo:string, ambito:string, fila:number, columna:number){
        this.simbolos.push(new SIMB(this.simbolos.length+1, nombre, grupo, tipo, ambito, fila, columna));
    }
}