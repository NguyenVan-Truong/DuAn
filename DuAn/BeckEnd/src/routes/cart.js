import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controllers/cart.js";
// import { checkPermission } from './../middlewares/checkPermission.js';
import { checkAuth } from "../middlewares/checkauth.js";

const routerCart = Router();

routerCart.post("/",checkAuth ,addToCart);
routerCart.get("/",checkAuth, getCart);
routerCart.delete('/:productId', checkAuth, removeFromCart);

export default routerCart;