import Tipo_INS from "../tablaSimbolo/TIPO_INSTRUCCION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import TablaSimbolos from "../tablaSimbolo/ENTORNO";
import { nodoAST } from "./nodoAST";

export abstract class Instruccion {

    public linea: number;
    public columna: number;
    public TIPO: Tipo_INS
    constructor(linea : number, columna:number, tipo:Tipo_INS) {
        this.linea = linea;
        this.columna = columna;
        this.TIPO = tipo;
    }

    abstract ejecutar(arbol: TRADUCTOR, tabla: TablaSimbolos):any;
    public abstract getNodo():nodoAST;
    // TODO graficar AST
}