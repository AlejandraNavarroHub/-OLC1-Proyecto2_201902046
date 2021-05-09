import { Instruccion } from "../Abstract/Instruccion";
import Excepcion from "../exceptions/EXCEPTION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";


export default class DO extends Instruccion{
   
    private condicion: Expresion;
    private bloque:Array<Instruccion>;
    constructor(linea:number, columna:number, condicion:Expresion, bloque:Array<Instruccion>){
        super(linea, columna, new Tipo_INS(T_INS.OTROS));
        this.condicion = condicion;
        this.bloque = bloque;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        let comprobar = this.condicion.getValor(tree, table);
        if (comprobar.Tipo.getTipos()!==tipos.ERROR) {
            if (comprobar.Tipo.getTipos()===tipos.BOOLEANO) {
                tree.CICLOS.push("CICLO");
                let nuevo_entorno = new tablaSimbolos("", table);
                //DO
                for(let instruccion of this.bloque){
                    if (instruccion instanceof Instruccion) {
                        let res = instruccion.ejecutar(tree, nuevo_entorno);
                        try{
                            if (res.nombre==="BREAK") {
                                tree.CICLOS.pop();
                                return;
                            }
                            if (res.nombre==="CONTINUE") {
                                break;
                            }
                            if (res.nombre==="RETURN") {
                                tree.CICLOS.pop();
                                return res;
                            }
                        }catch(e){}
                    }
                }
                comprobar = this.condicion.getValor(tree, table);
                //*****WHILE******/
                while(comprobar.valor){
                    nuevo_entorno = new tablaSimbolos("", table);
                    for(let instruccion of this.bloque){
                        if (instruccion instanceof Instruccion) {
                            let res = instruccion.ejecutar(tree, nuevo_entorno);
                            try{
                                if (res.nombre==="BREAK") {
                                    tree.CICLOS.pop();
                                    return;
                                }
                                if (res.nombre==="CONTINUE") {
                                    break;
                                }
                                if (res.nombre==="RETURN") {
                                    tree.CICLOS.pop();
                                    return res;
                                }
                            }catch(e){}
                        }
                    }
                    comprobar = this.condicion.getValor(tree, table);
                }
                tree.CICLOS.pop();
                return;
            }
            tree.newERROR("SEMANTICO","SE ESPERABA UN BOOLEANO", this.linea, this.columna)
        }
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("IMPRIMIR");
 
        return nodo;
    }
}