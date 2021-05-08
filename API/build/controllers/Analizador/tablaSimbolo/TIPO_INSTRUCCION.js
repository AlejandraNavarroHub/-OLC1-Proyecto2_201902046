"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.T_INS = void 0;
class Tipo_INS {
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
exports.default = Tipo_INS;
var T_INS;
(function (T_INS) {
    T_INS["DECLARACION"] = "DECLARACION";
    T_INS["ASIGNACION"] = "ASIGNACION";
    T_INS["LLAMADA"] = "LLAMADA";
    T_INS["NATIVA"] = "NATIVA";
    T_INS["OTROS"] = "OTROS";
    T_INS["ERROR"] = "ERROR";
})(T_INS = exports.T_INS || (exports.T_INS = {}));
//# sourceMappingURL=TIPO_INSTRUCCION.js.map