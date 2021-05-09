import { Instruccion } from "../Abstract/Instruccion";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";


export default class IF extends Instruccion{
   
    private condicion1:Expresion;
    private bloque1:Array<Instruccion>;
    private bloque2:Array<Instruccion> | any;
    private IF: Instruccion | any; 
    constructor(linea:number, columna:number, condicion1:Expresion, bloque1:Array<Instruccion>, bloque2?:Array<Instruccion>, If?:IF){
        super(linea, columna, new Tipo_INS(T_INS.OTROS));
        this.condicion1 = condicion1;
        this.bloque1 = bloque1;
        this.bloque2 = bloque2;
        this.IF = If;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        let comprobar = this.condicion1.getValor(tree, table);
        if (comprobar.Tipo.getTipos()!== tipos.ERROR) {
            if (comprobar.Tipo.getTipos()=== tipos.BOOLEANO) {
                if (comprobar.valor) {
                    for(let instruccion of this.bloque1){
                        if (instruccion instanceof Instruccion) {
                            let res = instruccion.ejecutar(tree, table);
                            try{
                                if (res.nombre === "RETURN" && tree.FUNCIONES.length>0) {
                                    return res;
                                }else if ((res.nombre==="BREAK" || res.nombre==="BREAK") && tree.CICLOS.length>0) {
                                    return res;
                                }
                            }catch(e){
                            }
                        }
                    }
                }else if (this.IF instanceof Instruccion) {
                    return this.IF.ejecutar(tree, table);
                }else if (this.bloque2 instanceof Array){
                    for(let instruccion of this.bloque2){
                        if (instruccion instanceof Instruccion) {
                            let res = instruccion.ejecutar(tree, table);
                            try{
                                if (res.nombre === "RETURN" && tree.FUNCIONES.length>0) {
                                    return res;
                                }else if ((res.nombre==="BREAK" || res.nombre==="BREAK") && tree.CICLOS.length>0) {
                                    return res;
                                }
                            }catch(e){
                            }
                        }
                    }
                }
                return;
            }
            tree.newERROR("SEMANTICO","SE ESPERABA UN BOOLEANO",this.linea, this.columna);
        }
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("IMPRIMIR");
        
        return nodo;
    }
}