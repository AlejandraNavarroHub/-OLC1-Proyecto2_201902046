export class nodoAST {

    public hijos: Array<nodoAST> = new Array<nodoAST>();
    public valor:string;

    constructor(valor:string) {
        this.valor = valor;
    }

    public setHijos(hijos:Array<nodoAST>){
        this.hijos = hijos;
    }

    public agregarHijoS(cad:string){
        this.hijos.push(new nodoAST(cad));
    }

    public agregarHijoL(hijos:Array<nodoAST>){
        for(let hijo of hijos)
        {
            this.hijos.push(hijo);
        }
    }

    public agregarHijo(hijo:nodoAST){
        this.hijos.push(hijo);
    }

    public agregarPrimerHijo(cad?:string, hijo?:nodoAST)
    {
        if (cad) {
            this.hijos.unshift(new nodoAST(cad));
        }else if (hijo) {
            this.hijos.unshift(hijo);
        }
    }

    public getValor():string
    {
        return this.valor;
    }
    
    public setValor(cad:string)
    {
        this.valor = cad;
    }
    
    public getHijos():Array<nodoAST> 
    {
        return this.hijos;
    }
}