import {Router} from "express";
import Carts from "../dao/dbManagers/carts.js";
import Products from "../dao/dbManagers/products.js";
import {ProductModel} from "../dao/models/products.model.js";
import {CartModel} from "../dao/models/carts.model.js";

const router = Router();

const carts = new Carts();
const productsCRUD = new Products();

router.get("/", async (req, res) => {
    try{
        const result = await carts.getAll();
        res.json(result);
    } catch(error) {console.log("Error al traer los Carts:" + error)}
})

router.get("/:cid", async (req, res) => {
    const {cid} = req.params;

    try{
        const result = await carts.getById(cid);
        console.log(result);
        res.render("carts", {
            carts: result._id.toString(),
            products:result.products,
            style:"/css/cart.css"
        });
    } catch(error) {console.log("Error al traer el Cart:" + req.params + "," + error)}
})

router.post("/", async (req, res) => {
    try{
        const result = await carts.saveCart();
        res.json(result)
    } catch (error) {console.log("Error al crear nuevo Cart:" + error)}
})

router.put("/:cid/product/:pid", async (req, res) => {
    const {cid, pid} = req.params;
    

    const isCartValid = await carts.getById(cid);
    const isProductValid = await productsCRUD.getById(pid)
    let hasChange = false;

    const newProduct = {
        product: pid,
        quantity:1
    };

    if (!isCartValid || !isProductValid) {
        return res.status(400).json({
            status:"error",
            message:"Cart o Producto o encontrado"
        })}

        (item) => item.product.equals(pid)

    if(productIndex === -1) {
        isCartValid.products.push(newProduct);
        hasChange = true} else {
        isCartValid.products[productIndex].quantity++;
        hasChange = true}

    if(hasChange) {
        const result = await carts.updateCart(cid,{products: isCartValid.products});
        res.json({
            status:"ok",
            message: isCartValid
        })
    }
})

router.delete("/:cid", async (req, res) => {
    const {cid} = req.params;

    try{
        const result = await carts.deleteCart(cid);
        res.json(result);
    } catch(error) {console.log("Error al eliminar el Cart:" + req.params + "," + error)}
})

router.delete("/:cid/product/:pid", async (req, res) => {
    const {cid, pid} = req.params;

    const isCartValid = await carts.getById(cid);
    const isProductValid = await productsCRUD.getById(pid)
    let hasChange = false;

    if (!isCartValid || !isProductValid) {
        return res.status(400).json({
            status:"error",
            message:"Cart o Producto no encontrado"
        })}

    const productIndex = isCartValid.products.findIndex(
        (product) => product.product.equals(pid))

    if(productIndex === -1) {
            res.status(400).json({
            status:"error",
            message:"Producto no encontrado"
        }) } else {
            isCartValid.products[productIndex].quantity--;
        if (isCartValid.products[productIndex].quantity === 0) {
            isCartValid.products.splice(productIndex,1)
        }
        hasChange = true}

    if(hasChange) {
        const result = await carts.updateCart(cid,{products: isCartValid.products});
        res.json({
            status:"ok",
            message: isCartValid
        })
    }
})

export default router;