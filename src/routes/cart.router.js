import {Router} from "express";
// import {CartManager} from "../classes/CartManager.js";
import Carts from "../dao/dbManagers/carts.js";

const router = Router();

const carts = new Carts();

router.get("/", async (req, res) => {
    try{
        const result = await carts.getAll();
        res.json(result);
    } catch(error) {console.log("Error al traer los Carts:" + error)}
})

router.get("/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const result = await carts.getById(id);
        res.json(result);
    } catch(error) {console.log("Error al traer el Cart:" + req.params + "," + error)}
})

router.post("/", async (req, res) => {
    try{
        const result = await carts.saveCart();
        res.json(result)
    } catch (error) {console.log("Error al crear nuevo Cart:" + error)}
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const result = await carts.deleteCart(id);
        res.json(result);
    } catch(error) {console.log("Error al eliminar el Cart:" + req.params + "," + error)}
})

// const cartManager = new CartManager("./archivosJson/carts.json");

// router.get("/", async (req, res) => {
//     try {
//         let cartProducts = await cartManager.getCarts();
//         res.json({data:cartProducts});
//     } catch (error) {console.log(error)}
// })

// router.get("/:cid", async (req, res) => {
//     const {cid} = req.params;

//     let cart = await cartManager.getCartById(cid);

//     if (cart) {
//         res.json({ message: "success", data: cart });
//         } else {
//         res.json({
//             message: "El carrito solicitado no existe",
//         })
//         }
//     });

// router.post("/", async (req, res) => {
//     try {
//         let createCart = await cartManager.addCart();
//         res.json({message:"Carrito Creado", data:createCart});
//     } catch (error) {
//         res.status(500).json({message:"Error al crear el Carrito", data:error})
//     }
// })

// router.post("/:cid/products/:pid", async (req, res) => {
//     const {cid, pid} = req.params;

//     try {
//         const response = await cartManager.addProductToCart(cid, pid);
//         res.json({message:`Producto Agregado Correctamente al Carrito ${cid}`, data:response})
//     } catch (error) {
//         res.status(500).json({message:"Error al agregar producto", data:error})
//     }

// }
// )

export default router;