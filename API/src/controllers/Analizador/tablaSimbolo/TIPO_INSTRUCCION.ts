export default class Tipo_INS
{
    public tipos: T_INS;
    
    constructor(tipos: T_INS){
        this.tipos = tipos;
    }

    public equals(obj: Tipo_INS){
        return this.tipos == obj.tipos;
    }

    public getTipos():T_INS
    {
        return this.tipos
    }

    public setTipo(tipo:T_INS)
    {
        this.tipos = tipo;
    }
}

export enum T_INS
{
    DECLARACION = "DECLARACION", 
    ASIGNACION = "ASIGNACION",
    LLAMADA = "LLAMADA",
    NATIVA = "NATIVA",
    OTROS = "OTROS",
    ERROR = "ERROR"
}