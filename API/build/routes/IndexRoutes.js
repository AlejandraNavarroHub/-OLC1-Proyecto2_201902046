"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compiladorController_1 = require("../controllers/compiladorController");
class IndexRoutes {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        this.router.post("/RUN", compiladorController_1.compiladorController.run);
        this.router.post("/GRAF", compiladorController_1.compiladorController.graph);
    }
}
const indexRoutes = new IndexRoutes();
exports.default = indexRoutes.router;
//# sourceMappingURL=IndexRoutes.js.map