import { Router } from "express";
import productsController from "../controllers/productsController.js";

const productRouter = Router();

productRouter.get('/',              productsController.getAll);
productRouter.get('/:id',           productsController.getSpecific);
productRouter.get('/:id/sizes',     productsController.getSpecificProductSizes);

productRouter.put('/:id',           productsController.putName);

export default productRouter;
