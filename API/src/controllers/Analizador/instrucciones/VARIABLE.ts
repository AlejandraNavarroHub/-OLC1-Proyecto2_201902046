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
    private ID: string;
    private TipoV: Tipo;
    constructor(linea:number, columna:number, TipoV: Tipo ,nombre:string, expresion?:Expresion){
        super(linea, columna, new Tipo_INS(T_INS.DECLARACION));
        this.expresion = expresion;
        this.ID = nombre;
        this.TipoV = TipoV;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        let valor:any = undefined;
        if (!(this.expresion instanceof Expresion)) {
            switch( this.TipoV.getTipos() ){
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
            if (this.TipoV.getTipos()!==this.expresion.Tipo.getTipos() &&
                this.TipoV.getTipos()!==tipos.ENTERO && this.expresion.Tipo.getTipos()!==tipos.DECIMAL
                && this.TipoV.getTipos()!==tipos.DECIMAL && this.expresion.Tipo.getTipos()!==tipos.ENTERO) {
                    tree.newERROR("SEMANTICO","EL TIPO DE LA EXPRESIÓN NO COINCIDE CON EL DE LA VARIABLE", this.linea, this.columna);
                    return;
            }
            valor = this.expresion.getValor(tree, table);
            if (valor.Tipo.getTipos()=== tipos.ERROR) {
                return;
            }
            if(typeof(valor)== typeof("")){
                switch(valor.Tipo.getTipos()){
                    case tipos.ENTERO:
                        valor = Number(valor);
                        break
                    case tipos.BOOLEANO:
                        if (valor.toUpperCase() == "TRUE"){
                            valor = true;
                        }else if(valor.toUpperCase() == "FALSE") {
                            valor = false;
                        }
                        break
                    case tipos.DECIMAL:
                        valor = Number(valor);
                }
            }
            if (this.TipoV.getTipos()===tipos.DECIMAL && valor.Tipo.getTipos()!= tipos.DECIMAL) {
                tree.newERROR("SEMANTICO","TIPO DECIMAL SOLO PUEDE RECIBIR DECIMAL", this.linea, this.columna);
                 return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
            }
            if (this.TipoV.getTipos()===tipos.CADENA && valor.Tipo.getTipos()!= tipos.CADENA) {
                tree.newERROR("SEMANTICO","TIPO CADENA SOLO PUEDE RECIBIR CADENA", this.linea, this.columna);
                 return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
            }
            if (this.TipoV.getTipos()===tipos.CARACTER && valor.Tipo.getTipos()!= tipos.CARACTER) {
                tree.newERROR("SEMANTICO","TIPO CARACTER SOLO PUEDE RECIBIR CARACTER", this.linea, this.columna);
                 return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
            }
            if (this.TipoV.getTipos()===tipos.ENTERO && valor.Tipo.getTipos()!= tipos.ENTERO) {
                tree.newERROR("SEMANTICO","TIPO INT SOLO PUEDE RECIBIR INT", this.linea, this.columna);
                 return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
            }
            if (this.TipoV.getTipos()===tipos.BOOLEANO && valor.Tipo.getTipos()!= tipos.BOOLEANO) {
                tree.newERROR("SEMANTICO","TIPO BOOLEAN SOLO PUEDE RECIBIR BOOLEAN", this.linea, this.columna);
                 return new Primitivo(new Tipo(tipos.ERROR), undefined, this.linea, this.columna);
            }
        let respuesta = undefined;
        if (valor instanceof Primitivo) {
            respuesta = table.set(this.ID, valor.valor, this.TipoV);
        }else{
            respuesta = table.set(this.ID, valor, this.TipoV);
        }
        if (respuesta.tipo.getTipos()===tipos.ERROR) {
            tree.newERROR("SEMANTICO","LA VARIABLE YA ESTA DECLARADA", this.linea, this.columna);
        }else{
            tree.newSimbol(this.ID, "VARIABLE",this.TipoV.getTipos(), table.nombre, this.linea, this.columna);
        }
        }
    }

    public getNodo(): nodoAST {
        throw new Error("Method not implemented.");
    }
}