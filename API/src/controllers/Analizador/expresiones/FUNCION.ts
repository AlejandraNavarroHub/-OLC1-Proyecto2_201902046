import { Expresion } from "../Abstract/EXPRESION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, {tipos} from "../tablaSimbolo/TIPO";
import { nodoAST } from "../Abstract/nodoAST";
import Primitivo from "./PRIMITIVO";
import { Instruccion } from "../Abstract/Instruccion";
import Simbolo from "../tablaSimbolo/SIMBOLO";



export default class FUNCION_E extends Expresion{

    private PARAMETROS:Array<Expresion> | any;
    constructor(linea:number, columna:number, ID:string, PARAMETROS?:Array<Expresion>){
        super(linea, columna, undefined, new Tipo(tipos.ENTERO),ID);
        this.PARAMETROS = PARAMETROS;
    }

    public getValor(tree:TRADUCTOR, table:tablaSimbolos): Expresion{
        let comprobar = table.get(this.ID);
        if (comprobar.tipo.getTipos() !== tipos.ERROR) {
            let FUNC = comprobar.valor;
            let nuevo_entorno = new tablaSimbolos(this.ID, table);
            if (this.PARAMETROS instanceof Array) {
                if (this.PARAMETROS.length>FUNC.PARAMETROS.length) {
                    tree.newERROR("SEMANTICO", "Numero de entradas erroneo", this.linea, this.columna);
                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                }
                let x = 0;
                for(let parametro of this.PARAMETROS){
                    if (parametro instanceof Expresion) {
                        let valor = parametro.getValor(tree, table);
                        if (valor.Tipo.getTipos()===tipos.ERROR) {
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                        }
                        if (valor.Tipo.getTipos() !== FUNC.PARAMETROS[x].TipoV.getTipos()) {
                            tree.newERROR("SEMANTICO", "EL TIPO DE LAS VARIABLES DE LA FUNCIÓN NO COINCIDEN", this.linea, this.columna);
                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                        }
                        FUNC.PARAMETROS[x].expresion = valor;
                        FUNC.PARAMETROS[x].ejecutar(tree, nuevo_entorno);
                    }
                    x++;
                }

            }
            tree.FUNCIONES.push("");
            if (FUNC.BLOQUE instanceof Array) {
                for(let instrucciones of FUNC.BLOQUE){
                    if (instrucciones instanceof Instruccion) {
                        let res = instrucciones.ejecutar(tree, nuevo_entorno);
                        try{
                            if (res.nombre=="RETURN") {
                                let v = res.valor.getValor(tree, nuevo_entorno);
                                if (v instanceof Primitivo) {
                                    if (v.Tipo.getTipos()!==FUNC.TIPOV.getTipos() ||
                                        v.Tipo.getTipos()!==tipos.ENTERO && FUNC.TIPOV.getTipos()!==tipos.DECIMAL||
                                        v.Tipo.getTipos()!==tipos.DECIMAL && FUNC.TIPOV.getTipos() !== tipos.ENTERO) {
                                            tree.FUNCIONES.pop();
                                            tree.newERROR("SEMANTICO","TIPO DE RETORNO INCORRECTO", this.linea, this.columna);
                                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    return v;
                                }
                            }

                            if (res.nombre==="BREAK"){
                                tree.FUNCIONES.pop();
                                tree.newERROR("SEMANTICO","FUNCIÓN BREAK NO SE PUEDE USAR DENTRO DE UNA FUNCIÓN", this.linea, this.columna);
                                return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);   
                            }

                            if (res.nombre==="CONTINUE"){
                                tree.FUNCIONES.pop();
                                tree.newERROR("SEMANTICO","FUNCIÓN CONTINUE NO SE PUEDE USAR DENTRO DE UNA FUNCIÓN", this.linea, this.columna);
                                return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna); 
                            }
                        }catch{}
                    }
                }

                if (FUNC.TIPOV.getTipos() === tipos.ERROR) {
                    return new Primitivo(new Tipo(tipos.CADENA), undefined, this.linea, this.columna);    
                }
                tree.newERROR("SEMANTICO","SE ESPERABA UN VALOR DE RETORNO", this.linea, this.columna);
                return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
            }
        }
        tree.newERROR("SEMANTICO","FUNCIÓN NO ENCONTRADA", this.linea, this.columna);
        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("VARIABLE");
        nodo.agregarHijoS(this.ID);
        return nodo;
    }
}