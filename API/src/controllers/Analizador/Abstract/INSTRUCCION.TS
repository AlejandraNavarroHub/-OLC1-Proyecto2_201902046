import Tipo_INS from "../tablaSimbolo/TIPO_INSTRUCCION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import TablaSimbolos from "../tablaSimbolo/ENTORNO";
import { nodoAST } from "./nodoAST";

export abstract class Instruccion {

    public linea: number;
    public columna: number;
    public TIPO: Tipo_INS
    public ID:any;
    constructor(linea : number, columna:number, tipo:Tipo_INS, ID:any=undefined) {
        this.linea = linea;
        this.columna = columna;
        this.TIPO = tipo;
        this.ID = ID;
    }

    abstract ejecutar(arbol: TRADUCTOR, tabla: TablaSimbolos):any;
    public abstract getNodo():nodoAST;
    // TODO graficar AST
}