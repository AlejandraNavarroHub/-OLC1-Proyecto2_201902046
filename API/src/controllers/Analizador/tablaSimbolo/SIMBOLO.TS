import Tipo from "./TIPO";

export default class Simbolo
{
    public tipo: Tipo;
    public identificador: String;
    public DIMENSION: any;
    public TAMAÑO: any;
    public valor: any;

    constructor(tipo: Tipo, identificador: String, valor:any, DIMENSION?:any, CANTIDAD?:any)
    {
        this.tipo = tipo;
        this.identificador = identificador;
        this.valor = valor;
    }

    public getIdentificador() {
        return this.identificador;
    }
}