import {Router} from "express";
import {compiladorController} from "../controllers/compiladorController";
class IndexRoutes {
    public router: Router = Router();

    constructor() {
        this.config();
    }

    public config(): void {
        this.router.post("/RUN", compiladorController.run);
        this.router.post("/GRAF", compiladorController.graph);
    }
}
const indexRoutes = new IndexRoutes();
export  default indexRoutes.router;
