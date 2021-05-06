export default class SIMB {
    public numero:number;
    public nombre:string;
    public grupo:string;
    public tipo: string;
    public ambito: string;
    public fila: number;
    public columna: number;

    constructor(numero: number, nombre:string, grupo:string, tipo:string,ambito:string, fila:number, columna:number)
    {
        this.numero = numero;
        this.nombre = nombre;
        this.grupo = grupo;
        this.tipo = tipo;
        this.ambito = ambito;
        this.fila = fila;
        this.columna = columna;
    }

}