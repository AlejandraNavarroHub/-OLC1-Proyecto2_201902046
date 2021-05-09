import { Instruccion } from "../Abstract/Instruccion";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";
import Simbolo from "../tablaSimbolo/SIMBOLO";
import Primitivo from "../expresiones/PRIMITIVO";


export default class VARIABLE extends Instruccion{
    private expresion: Expresion|any;
    private TipoV: Tipo;
    constructor(linea:number, columna:number, TipoV: Tipo ,nombre:string, expresion?:Expresion){
        super(linea, columna, new Tipo_INS(T_INS.DECLARACION), nombre);
        this.expresion = expresion;
        this.ID = nombre;
        this.TipoV = TipoV;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        let valor:any = undefined;
        if (!(this.expresion instanceof Expresion)) {
            switch( this.TipoV.tipos ){
                case tipos.ENTERO:
                    valor = 0;
                    break;
                case tipos.CADENA:
                    valor = '\x00';
                    break;
                case tipos.BOOLEANO:
                    valor = true;
                    break;
                case tipos.DECIMAL:
                    valor = 0.0;
                    break;
                case tipos.CARACTER:
                    valor = "";
                    break;
            }
        }else if(this.expresion){
            if (this.TipoV.tipos!==this.expresion.Tipo.tipos &&
                this.TipoV.tipos!==tipos.ENTERO && this.expresion.Tipo.tipos!==tipos.DECIMAL
                && this.TipoV.tipos!==tipos.DECIMAL && this.expresion.Tipo.tipos!==tipos.ENTERO) {
                    tree.newERROR("SEMANTICO","EL TIPO DE LA EXPRESIÓN NO COINCIDE CON EL DE LA VARIABLE", this.linea, this.columna);
                    return;
            }
            valor = this.expresion.getValor(tree, table);
            if (valor.Tipo.tipos=== tipos.ERROR) {
                return;
            }
            
            if (this.TipoV.tipos===tipos.DECIMAL && valor.Tipo.tipos!= tipos.DECIMAL) {
                tree.newERROR("SEMANTICO","TIPO DECIMAL SOLO PUEDE RECIBIR DECIMAL", this.linea, this.columna);
                 return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
            }
            if (this.TipoV.tipos===tipos.CADENA && valor.Tipo.tipos!= tipos.CADENA) {
                tree.newERROR("SEMANTICO","TIPO CADENA SOLO PUEDE RECIBIR CADENA", this.linea, this.columna);
                 return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
            }
            if (this.TipoV.tipos===tipos.CARACTER && valor.Tipo.tipos!= tipos.CARACTER) {
                tree.newERROR("SEMANTICO","TIPO CARACTER SOLO PUEDE RECIBIR CARACTER", this.linea, this.columna);
                 return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
            }
            if (this.TipoV.tipos===tipos.ENTERO && valor.Tipo.tipos!= tipos.ENTERO) {
                tree.newERROR("SEMANTICO","TIPO INT SOLO PUEDE RECIBIR INT", this.linea, this.columna);
                 return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
            }
            if (this.TipoV.tipos===tipos.BOOLEANO && valor.Tipo.tipos!= tipos.BOOLEANO) {
                tree.newERROR("SEMANTICO","TIPO BOOLEAN SOLO PUEDE RECIBIR BOOLEAN", this.linea, this.columna);
                 return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
            }
        }
        let respuesta = undefined;
        if (valor instanceof Primitivo) {
            respuesta = table.set(this.ID, valor.valor, this.TipoV);
        }else{
            respuesta = table.set(this.ID, valor, this.TipoV);
        }
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