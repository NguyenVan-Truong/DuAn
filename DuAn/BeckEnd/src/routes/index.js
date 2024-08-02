import { Router } from "express";
import productRouter from "./productRouter.js";
import categoryRouter from "./categoryRouter.js";
import routerAuth from "./auth.js";
import routerCart from "./cart.js";
import routerOrder from "./order.js";
// import { checkPermission } from './../middlewares/checkPermission.js';

const router = Router();

router.use("/products", productRouter);
router.use("/categorys", categoryRouter);
router.use("/users", routerAuth);
router.use("/carts", routerCart);   
router.use("/orders", routerOrder); 
export default router;
