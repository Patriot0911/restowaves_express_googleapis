import { Router } from "express";
import productsController from "../controllers/productsController.js";

const productRouter = Router();

productRouter.get('/', productsController.getAll);

export default productRouter;
