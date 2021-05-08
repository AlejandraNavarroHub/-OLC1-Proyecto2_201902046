import { Instruccion } from "../Abstract/Instruccion";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";
import Simbolo from "../tablaSimbolo/SIMBOLO";
import Primitivo from "../expresiones/PRIMITIVO";


export default class Asignar_valor extends Instruccion{
    private exp: Expresion;
    private ID: string;
    constructor(linea:number, columna:number, nombre:string, exp:Expresion){
        super(linea, columna, new Tipo_INS(T_INS.ASIGNACION));
        this.exp = exp;
        this.ID = nombre;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        let vari = table.get(this.ID);
        let valor:any = undefined;
        if (vari.tipo.getTipos()!== tipos.ERROR) {
            if(this.exp){
                valor = this.exp.getValor(tree, table);
                if(valor.Tipo.getTipos()!== tipos.ERROR){
                    if (vari.tipo.getTipos()!==valor.Tipo.getTipos() && vari.tipo.getTipos()!==tipos.ENTERO
                    && valor.Tipo.getTipos()!==tipos.DECIMAL && vari.tipo.getTipos()!==tipos.DECIMAL
                    && valor.Tipo.getTipos()!==tipos.ENTERO) {
                        tree.newERROR("SEMANTICO","EL TIPO DE LA EXPRESIÓN NO COINCIDE CON EL DE LA VARIABLE", this.linea, this.columna);
                        return;
                    }
                    let respuesta = table.update(this.ID, valor);
                    if (!respuesta) {
                        tree.newERROR("SEMANTICO","LA VARIABLE NO EXISTE", this.linea, this.columna);
                    }
                    return;
                }
            }
        }
    }
    public getNodo(): nodoAST {
        let nodo = new nodoAST("ASIGNCACIÓN");
        nodo.agregarHijoS(this.ID);
        nodo.agregarHijoS("=")
        nodo.agregarHijo(this.exp.getNodo());
        nodo.agregarHijoS(";")
        return nodo;
    }
}