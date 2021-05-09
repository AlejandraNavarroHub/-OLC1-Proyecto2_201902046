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
        if (comprobar.tipo.tipos !== tipos.ERROR) {
            let FUNC = comprobar.valor;
            let value :any[] = [];
            let nuevo_entorno = new tablaSimbolos(this.ID, table);
            if (this.PARAMETROS instanceof Array) {
                if (this.PARAMETROS.length>FUNC.PARAMETROS.length) {
                    tree.newERROR("SEMANTICO", "Numero de entradas erroneo", this.linea, this.columna);
                    return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                }
                let x = 0;
                for(let parametro of this.PARAMETROS){
                    let valor = parametro.getValor(tree, table);
                    if (valor.Tipo.tipos===tipos.ERROR) {
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    }
                    if (valor.Tipo.tipos !== FUNC.PARAMETROS[x].TipoV.tipos) {
                        tree.newERROR("SEMANTICO", "EL TIPO DE LAS VARIABLES DE LA FUNCIÓN NO COINCIDEN", this.linea, this.columna);
                        return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                    }
                    x++;
                    value.push(valor);
                }

            }
            let x = 0;
            if (FUNC.BLOQUE) {
                if (FUNC.PARAMETROS) {
                    let x = 0;
                    for(let declaracion of FUNC.PARAMETROS){
                        let exp = value[x];
                        exp.linea = declaracion.linea;
                        exp.columna =declaracion.columna;
                        declaracion.expresion = exp;
                        declaracion.ejecutar(tree, nuevo_entorno);
                        x++; 
                    }
                }
                tree.FUNCIONES.push("funcion");
                for(let instrucciones of FUNC.BLOQUE){
                    if (instrucciones instanceof Instruccion) {
                        let res = instrucciones.ejecutar(tree, nuevo_entorno);
                        if (typeof(res)===typeof({}) && !(res instanceof Expresion)) {
                            if (res.nombre=="RETURN") {
                                let v = res.valor;
                                if (v instanceof Primitivo) {
                                    if (v.Tipo.tipos!==FUNC.TIPOV.tipos ||
                                        v.Tipo.tipos!==tipos.ENTERO && FUNC.TIPOV.tipos!==tipos.DECIMAL||
                                        v.Tipo.tipos!==tipos.DECIMAL && FUNC.TIPOV.tipos !== tipos.ENTERO) {
                                            tree.FUNCIONES.pop();
                                            tree.newERROR("SEMANTICO","TIPO DE RETORNO INCORRECTO", this.linea, this.columna);
                                            return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
                                    }
                                    tree.FUNCIONES.pop();
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
                        }
                    }
                }

                if (FUNC.TIPOV.tipos === tipos.ERROR) {
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
        let nodo = new nodoAST("LLAMADA");
        nodo.agregarHijoS(this.ID);
        if(this.PARAMETROS){
            let cont = new nodoAST("INSTRUCCIONES");
            for(let expre of this.PARAMETROS){
                if (expre instanceof Expresion) {
                    cont.agregarHijo(expre.getNodo());
                }
            }
            nodo.agregarHijo(cont);
        }
        return nodo;
    }
}