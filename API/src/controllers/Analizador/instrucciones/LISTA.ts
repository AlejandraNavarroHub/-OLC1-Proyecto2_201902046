import { Instruccion } from "../Abstract/Instruccion";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";
import Simbolo from "../tablaSimbolo/SIMBOLO";
import Primitivo from "../expresiones/PRIMITIVO";


export default class LISTA extends Instruccion{
    private expresion: Expresion|any;
    private TipoV: Tipo;
    private TipoV2: Tipo | any;
    constructor(linea:number, columna:number, TipoV: Tipo ,nombre:string, expresion?:Expresion, TipoV2?:Expresion){
        super(linea, columna, new Tipo_INS(T_INS.DECLARACION), nombre);
        this.expresion = expresion;
        this.ID = nombre;
        this.TipoV = TipoV;
        this.TipoV2 = TipoV2;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        let valor:any[] = [];
        if (this.TipoV2) {
            if (this.TipoV.tipos !== this.TipoV2.tipos) {
                tree.newERROR("SEMANTICO","El TIPO DE DECLARACIÓN Y ASIGNACIÓN NO COINCIDE",this.linea, this.columna);
                return;
            }
        }
        if(this.expresion instanceof Expresion){
            let g = this.expresion.getValor(tree, table);
            valor = g.valor;
            if (valor instanceof Array && g.Tipo.tipos!==this.TipoV.tipos) {
                tree.newERROR("SEMANTICO","TIPO DE VARIABLES NO COINCIDE",this.linea, this.columna);
                return;
            }
            
        }
        let respuesta = table.set(this.ID, valor, this.TipoV,undefined, valor.length);
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