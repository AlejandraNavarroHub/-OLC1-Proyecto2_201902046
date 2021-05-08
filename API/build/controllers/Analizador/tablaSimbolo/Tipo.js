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
    tipos["ENTERO"] = "INT";
    tipos["DECIMAL"] = "DOUBLE";
    tipos["CARACTER"] = "CHAR";
    tipos["BOOLEANO"] = "BOOLEAN";
    tipos["CADENA"] = "STRING";
    tipos["ERROR"] = "ERROR";
})(tipos = exports.tipos || (exports.tipos = {}));
//# sourceMappingURL=TIPO.js.map