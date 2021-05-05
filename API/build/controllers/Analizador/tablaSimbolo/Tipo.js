"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tipos = void 0;
class Tipo {
    constructor(tipos) {
        this.tipos = tipos;
    }
    equals(obj) {
        return this.tipos == obj.tipos;
    }
    getTipos() {
        return this.tipos;
    }
    setTipo(tipo) {
        this.tipos = tipo;
    }
}
exports.default = Tipo;
var tipos;
(function (tipos) {
    tipos["ENTERO"] = "ENTERO";
    tipos["DECIMAL"] = "DECIMAL";
    tipos["CARACTER"] = "CARACTER";
    tipos["BOOLEANO"] = "BOOLEANO";
    tipos["CADENA"] = "CADENA";
    tipos["ERROR"] = "ERROR";
})(tipos = exports.tipos || (exports.tipos = {}));
//# sourceMappingURL=Tipo.js.map