import {Router} from "express";
import Products from "../dao/dbManagers/products.js";
import Carts from "../dao/dbManagers/carts.js";

const router = Router();

router.get("/products", async (req, res) => {
    const products = new Products();
    const result = await products.getAll();
    res.render("products", {title:"Listado de Productos", products: result, style:"css/products.css"})
});

router.get("/carts", async (req, res) => {
    const carts = new Carts();
    const result = await carts.getAll();
    res.render("carts", {title:"Carts", products: result, style:"css/products.css"})
});


export default router;