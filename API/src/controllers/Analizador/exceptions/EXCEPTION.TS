export default class Excepcion {
    public numero:number;
    public tipo: string;
    public descripcion: string;
    public fila: number;
    public columna: number;

    constructor(numero: number, tipo:string,descripcion:string, fila:number, columna:number)
    {
        this.numero = numero;
        this.tipo = tipo;
        this.descripcion = descripcion;
        this.fila = fila;
        this.columna = columna;
    }

    public toString():string{
        return this.tipo + " - " + this.descripcion + " [" + this.fila + ", " + this.columna + "]";
    }
    public imprimir(){
        return this.toString() + "\n";
    }
}