import { Instruccion } from "../Abstract/Instruccion";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";
import Simbolo from "../tablaSimbolo/SIMBOLO";
import Primitivo from "../expresiones/PRIMITIVO";


export default class VECTOR extends Instruccion{
    private expresion: Array<Expresion>|any;
    private DIMENSION:Expresion|any;
    private TipoV: Tipo;
    private TipoV2:Tipo|any;
    constructor(linea:number, columna:number, TipoV: Tipo ,nombre:string, expresion?:Array<Expresion>, DIMENSION?:Expresion, TipoV2?:Tipo){
        super(linea, columna, new Tipo_INS(T_INS.DECLARACION), nombre);
        this.expresion = expresion;
        this.ID = nombre;
        this.DIMENSION = DIMENSION;
        this.TipoV = TipoV;
        this.TipoV2 = TipoV2;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        let valor:any[] = [];
        let dim:any = undefined;
        if (this.TipoV2) {
            if (this.TipoV.tipos !== this.TipoV2.tipos) {
                tree.newERROR("SEMANTICO","El TIPO DE DECLARACIÓN Y ASIGNACIÓN NO COINCIDE",this.linea, this.columna);
                return;
            }
        }
        if (!(this.expresion instanceof Expresion) && this.DIMENSION instanceof Expresion) {
            dim = this.DIMENSION.getValor(tree, table);
            if (dim<0) {
                tree.newERROR("SEMANTICO","TAMAÑO DE VECTOR INVALIDO",this.linea, this.columna);
                return;
            }
            switch( this.TipoV.tipos ){
                case tipos.ENTERO:
                    for(let x=0; x<dim.valor; x++){
                        valor[x] = 0;
                    }
                    break;
                case tipos.CADENA:
                    for(let x=0; x<dim.valor; x++){
                        valor[x] = "";
                    }
                    break;
                case tipos.BOOLEANO:
                    for(let x=0; x<dim.valor; x++){
                        valor[x] = true;
                    }
                    break;
                case tipos.DECIMAL:
                    for(let x=0; x<dim.valor; x++){
                        valor[x] = 0.0;
                    }
                    break;
                case tipos.CARACTER:
                    for(let x=0; x<dim.valor; x++){
                        valor[x] = "\x00";
                    }
                    break;
            }
        }else if(this.expresion){
        let x = 0;
            for(let exp of this.expresion){
                if (exp instanceof Expresion) {
                    let value = exp.getValor(tree, table);
                    if (value.Tipo.tipos===this.TipoV.tipos) {
                        valor[x] = value.valor;
                    }else{
                        tree.newERROR("SEMANTICO","TIPO INADECUADO DENTRO DE LA LISTA PARA EL VECTOR",value.linea, value.columna);
                        return;
                    }
                }
                x++;
            }
        }
        let respuesta = table.set(this.ID, valor, this.TipoV, valor.length);
        if (respuesta.tipo.tipos===tipos.ERROR) {
            tree.newERROR("SEMANTICO","LA VARIABLE YA ESTA DECLARADA", this.linea, this.columna);
        }else if(table.nombre==="GLOBAL"){
            tree.newSimbol(this.ID, "VARIABLE",this.TipoV.tipos, table.nombre, this.linea, this.columna);
        }
    }

    public getNodo(): nodoAST {
        let nodo = new nodoAST("DECLARACION");
        if (this.expresion) {
            nodo.agregarHijoS(this.TipoV.tipos);
            nodo.agregarHijoS(this.ID);
            nodo.agregarHijoS("=");
            nodo.agregarHijo(this.expresion.getNodo());
            nodo.agregarHijoS(";");
        }else{
            nodo.agregarHijoS(this.TipoV.tipos);
            nodo.agregarHijoS(this.ID);
            nodo.agregarHijoS(";");
        }
        return nodo;
    }
}