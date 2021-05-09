import { Instruccion } from "../Abstract/Instruccion";
import Excepcion from "../exceptions/EXCEPTION";
import TRADUCTOR from "../tablaSimbolo/TRADUCTOR";
import tablaSimbolos from "../tablaSimbolo/ENTORNO";
import Tipo, { tipos } from "../tablaSimbolo/TIPO";
import { Expresion } from "../Abstract/EXPRESION";
import Tipo_INS, { T_INS } from "../tablaSimbolo/TIPO_INSTRUCCION";
import { nodoAST } from "../Abstract/nodoAST";
import Primitivo from "../expresiones/PRIMITIVO";


export default class ADD extends Instruccion{
   
    private expresion: Expresion;

    constructor(linea:number, columna:number, ID:string, expresion:Expresion){
        super(linea, columna, new Tipo_INS(T_INS.OTROS), ID);
        this.expresion = expresion;
    }

    public ejecutar(tree:TRADUCTOR, table:tablaSimbolos){
        let comprobar = table.get(this.ID);
        if (comprobar.tipo.tipos!==tipos.ERROR) {
            if (comprobar.TAMAÑO !==undefined) {
                let value = this.expresion.getValor(tree,table);
                if (value.Tipo.tipos!==tipos.ERROR) {
                    if (value.Tipo.tipos === comprobar.tipo.tipos) {
                        let lista = comprobar.valor;
                        lista.push(value.valor);
                        console.log(lista);
                        table.update(this.ID, new Primitivo(comprobar.tipo, lista, this.linea, this.columna), lista.length);
                        return;
                    } 
                    tree.newERROR("SEMANTICO","EL DATO INGRESADO NO COINCIDE CON EL TIPO DE LA LISTA", this.linea, this.columna);
                    return;
                    
                }
            }
            tree.newERROR("SEMANTICO","LA VARIABLE INDICADA NO ES UNA LISTA", this.linea, this.columna);
            return;
        }
        tree.newERROR("SEMANTICO","LA LISTA NO EXISTE", this.linea, this.columna);
        return;
    }

    public getNodo(): nodoAST {
        throw new Error("Method not implemented.");
    }
}