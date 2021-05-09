import { Instruccion } from "../Abstract/Instruccion";
import Excepcion from "../exceptions/EXCEPTION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";


export default class FOR extends Instruccion{
   
    private DECLARACION: Instruccion;
    private ACTUALIZACION: Expresion;
    private CONDICION: Expresion;
    private BLOQUE:Array<Instruccion>;
    constructor(linea:number, columna:number, DECLARACION:Instruccion, CONDICION:Expresion , ACTUALIZACION:Expresion, BLOQUE:Array<Instruccion>){
        super(linea, columna, new Tipo_INS(T_INS.OTROS));
        this.DECLARACION = DECLARACION;
        this.ACTUALIZACION = ACTUALIZACION;
        this.CONDICION = CONDICION;
        this.BLOQUE = BLOQUE;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        let nuevo_entorno = new tablaSimbolos("", table);
        let entorno_For = new tablaSimbolos("", nuevo_entorno);
        let comprobar:any = undefined;
        if (this.DECLARACION.TIPO.getTipos() === T_INS.DECLARACION) {
            this.DECLARACION.ejecutar(tree, nuevo_entorno);        
            comprobar = this.CONDICION.getValor(tree, nuevo_entorno);
        }else{
            this.DECLARACION.ejecutar(tree, table);
            comprobar = this.CONDICION.getValor(tree, table);
        }
        if (comprobar.Tipo.getTipos()!==tipos.ERROR) {
            if (comprobar.Tipo.getTipos()===tipos.BOOLEANO) {
                tree.CICLOS.push("CICLO");
                while(comprobar.valor){
                    entorno_For = new tablaSimbolos("", nuevo_entorno);
                    for(let instruccion of this.BLOQUE){
                        if (instruccion instanceof Instruccion) {
                            let res = instruccion.ejecutar(tree, entorno_For);
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
                    if (this.DECLARACION.TIPO.getTipos() === T_INS.DECLARACION) {
                        comprobar = this.ACTUALIZACION.getValor(tree, nuevo_entorno);
                        comprobar = this.CONDICION.getValor(tree, nuevo_entorno);
                    }else{
                        comprobar = this.ACTUALIZACION.getValor(tree, table);
                        comprobar = this.CONDICION.getValor(tree, table);
                    }
                }
                tree.CICLOS.pop();
                return;
            }
            tree.newERROR("SEMANTICO","SE ESPERABA UN BOOLEANO", this.linea, this.columna)
        }
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("SENTENCIA CICLICA");
        nodo.agregarHijoS("FOR");
        nodo.agregarHijo(this.DECLARACION.getNodo());
        nodo.agregarHijoS(";");
        nodo.agregarHijo(this.CONDICION.getNodo());
        nodo.agregarHijoS(";");
        nodo.agregarHijo(this.ACTUALIZACION.getNodo());
        let cont = new nodoAST("INSTRUCCIONES");
        for(let instrucion of this.BLOQUE){
            if (instrucion instanceof Instruccion) {
                cont.agregarHijo(instrucion.getNodo());
            }
        }
        nodo.agregarHijo(cont);
        return nodo;
    }
}