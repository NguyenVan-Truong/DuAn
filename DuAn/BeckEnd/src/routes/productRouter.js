import { Router } from "express";
import { createProduct, deleteProduct, getAll, getAllProduct, getProductById, updateProduct } from "../controllers/product.js";
import { checkPermission } from "../middlewares/checkPermission.js";

const productRouter = Router();
productRouter.get('/list',getAll);
productRouter.post("/", createProduct);
productRouter.get("/", getAllProduct);
productRouter.get("/:id", getProductById);
productRouter.patch("/:id", updateProduct);
productRouter.delete("/:id" , deleteProduct);
export default productRouter;
