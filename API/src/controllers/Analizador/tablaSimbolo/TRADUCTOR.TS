import tablaSimbolos from "./ENTORNO";
import Excepcion from "../exceptions/EXCEPTION";
import {Instruccion} from "../Abstract/Instruccion";
import SIMB from "./list_simbol";
import { nodoAST } from "../Abstract/nodoAST";
import FUNCION from "../instrucciones/FUNCION";
import { T_INS } from "./TIPO_INSTRUCCION";

export default class TRADUCTOR {
    public instrucciones: Array<Instruccion>;
    public FUNCTIONS: Array<FUNCION> = new Array<FUNCION>();
    public EXEC: Array<Instruccion> = new Array<Instruccion>();
    public errores: Array<Excepcion>;
    public consola: String;
    public global: tablaSimbolos;
    public grafo:string="";
    public c = 0;
    public raiz: nodoAST = new nodoAST("");
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

        let x = 0;
        if (this.EXEC.length===0) {
            this.newERROR("SEMANTICO","No se encontro función exec", -1, -1);
        }
        for(let ex of this.EXEC) {
            if (ex instanceof Instruccion) {
                if (x>0) {
                    this.newERROR("SEMANTICO","SOLO SE PUEDE TENER UNA FUNCIÓN EXEC", ex.linea, ex.columna);
                    return;
                }
                this.EXEC[0] = ex;
                x++;
            }
        }
        
        for(let funciones of this.FUNCTIONS){
            if (funciones instanceof FUNCION) {
                funciones.ejecutar(this, this.global);
            }
        }

        for(let instrucion of this.instrucciones){
            if (instrucion instanceof Instruccion) {
                console.log(instrucion);
                if (instrucion.TIPO.getTipos() === T_INS.DECLARACION) {
                    instrucion.ejecutar(this, this.global);
                }else{
                    this.newERROR("SEMANTICO","SOLO SE PUEDE REALIZAR DECLARACIONES EN EL AMBITO GLOBAL", instrucion.linea, instrucion.columna);
                }
            }
        }

        this.EXEC[0].ejecutar(this, this.global);
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

    public graficar(){
        let nodo = new nodoAST("RAIZ");
        let cont = new nodoAST("INSTRUCCIONES");
        for(let instrucion of this.instrucciones){
            if (instrucion instanceof Instruccion) {
                cont.agregarHijo(instrucion.getNodo());
            }
        }
        nodo.agregarHijo(cont);
        this.raiz = nodo;
        this.Graph();
    }

    public Graph():void
    {
        let r:string = "AST";
        let ext:string = "pdf";
        var fs = require('fs');
        var stream = fs.createWriteStream(`./src/AST/${r}.dot`);
        stream.once('open',() =>{
            stream.write(this.getDot(this.raiz));
            stream.end();

        });
        const exec = require('child_process').exec;
        exec(`dot -T ${ext} -o ./src/AST/${r}.${ext} ./src/AST/${r}.dot`, (err:any, stdout:any)=>{
            exec(`start ./src/AST/${r}.${ext}`);
        });
    }

    public getDot(raiz:nodoAST):string
    {
        this.grafo = "";
        this.grafo += "digraph {\n";//                         "     \"
        var re = /\"/gi; 
        this.grafo += "n0[label=\"" + raiz.getValor().replace(re, "\\\"") + "\"];\n";
        this.c = 1;
        this.recorrerAST("n0",raiz);
        this.grafo += "}";
        return this.grafo;
    }
    
    public recorrerAST(padre:string , nPadre:nodoAST)
    {
        for(let hijo of nPadre.getHijos())
        {
            let nombreHijo:string = "n" + this.c;
            var re = /\"/gi; 
            this.grafo += nombreHijo + "[label=\"" + hijo.getValor().replace(re, "\\\"") + "\"];\n";
            this.grafo += padre + "->" + nombreHijo + ";\n";
            this.c++;
            this.recorrerAST(nombreHijo,hijo);
        }
    }
}