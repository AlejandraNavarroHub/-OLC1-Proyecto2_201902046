import { nodoAST } from "../Abstract/nodoAST";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import Entorno from "../tablaSimbolo/ENTORNO";
import Tipo from "../tablaSimbolo/TIPO";

export abstract class Expresion {

    public Tipo:Tipo;
    public valor:any;
    public ID:string|any;
    public P:Expresion|any;
    public linea:number;
    public columna:number;
    constructor(linea : number, columna:number, valor:any, tipo:Tipo, ID?:string, P?:Expresion) {
        this.Tipo = tipo;
        this.valor = valor;
        this.ID = ID;
        this.P = P;
        this.linea = linea;
        this.columna = columna;
    }

    abstract getValor(arbol: TRADUCTOR, tabla: Entorno):Expresion;
    public abstract getNodo():nodoAST;
    // TODO graficar AST
}
