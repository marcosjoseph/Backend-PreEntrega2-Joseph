import {Router} from "express";
// import {ProductManager} from "../classes/ProductManager.js";
import Products from "../dao/dbManagers/products.js";
import {ProductModel} from "../dao/models/products.model.js";

const router = Router();

const products = new Products();

router.get("/", async (req, res) => {
    const {limit, page, query, sort} = req.query;

    const isSorted = () => { if(sort.toLowerCase() === "asc") {return 1
    } else if (sort.toLowerCase() === "desc") {return -1} }

    const parsedQuery = () => { if (query) {
        const queryObj = JSON.parse(query);
        return queryObj;}
        return {};}

    const options = await ProductModel.paginate(parsedQuery(), {
        limit: limit || 10,
        page: page || 1,
        sort: sort ? {price:isSorted()} : null,
        lean: true,
    })

    const {docs,hasPrevPage,hasNextPage,totalPages,prevPage, nextPage} = options

    const products = docs;
    products.forEach((product) => {console.log(product.nombre)})

    res.render("products", {
        products,hasPrevPage,hasNextPage,prevPage,nextPage
    })

    // try {
    //     const result = await products.paginate({},
    //         {
    //             limit: limit || 10,
    //             page: page || 1
    //         })
    //     res.json(result)
    // } catch (error) {console.log("Error al buscar los productos:" + error)}
})

router.get("/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const result = await products.getById(id);
        res.json(result);
    } catch(error) {console.log("Error al buscar el Producto:" + id + "," + error)}
})

router.post("/", async (req, res) => {

    const {categoria, nombre, descripcion,img, precio, stock, code} = req.body;

    try{
        const newProduct = {categoria, nombre, descripcion,img, precio, stock, code};
        const result = await products.saveProduct(newProduct);
        res.json(result);
        console.log("El producto se ha creado con exito.")
    } catch (error) {console.log("Error al crear nuevo Producto:" + error)}
})

router.put("/:id", async (req, res) => {
    try{
        const {id} = req.params;
        const {categoria, nombre, descripcion,img, precio, stock, code} = req.body;

        const newProduct = {categoria, nombre, descripcion,img, precio, stock, code};
        const result = await products.updateProduct(id, newProduct);
        res.json(result);
        console.log("El producto ha sido modificado");
    } catch (error) {console.log("Error al modificar Producto:" + id + "," + error)}
})

router.delete("/:id", async (req, res) => {
    const {id} = req.params;

    try{
        const result = await products.deleteProduct(id);
        res.json(result);
        console.log("El producto ha sido eliminado");
    } catch(error) {console.log("Error al eliminar el Producto:" + id + "," + error)}
})

// const productManager = new ProductManager ("./archivosJson/productos.json");

// router.get("/", async (req, res) => {
//     const {limit} = req.query;
//     try {
//     let temporalProducts = await productManager.getProducts();    

//     if (limit) {
//             let temporalArray  = temporalProducts.slice(0, +limit)

//             res.json({
//             data: temporalArray,
//             limit: limit,
//             cant: temporalArray.length,})
//         } else {
//             res.json({
//                 data: temporalProducts,
//                 limit: false,
//                 cant: temporalProducts.length,})
//         } 
//     } catch (error){console.log("error app.get", error)}} )

// router.get("/:pid", async (req, res) => {
//     const {pid} = req.params;

//     let product = await productManager.getProductById(pid);

//     if (product) {
//         res.json({ message: "success", data: product });
//         } else {
//         res.json({
//             message: "el producto solicitado no existe",
//         })
//         }
//     });

// router.post("/", (req, res) => {
//     const {categoria, nombre, descripcion, img, precio, stock, code} = req.body;

//     try {
//         const data = productManager.addProduct(categoria, nombre, descripcion, img, precio, stock, code);
//         res.json({message: "success", data: data})
//     } catch (error) {
//         console.error("No se hay podido agregar el producto", error)
//         res.status(500).json({message: "error", data: error})}
// })

// router.put("/:pid", async (req, res) => {
//     const {pid} = req.params;
//     const {categoria, nombre, descripcion, img, precio, stock, code} = req.body;

//     try {
//         let product = await productManager.getProductById(pid);

//         if(product) { 
//             let newProduct = {
//                 categoria: categoria || product.categoria,
//                 nombre: nombre || product.nombre,
//                 descripcion: descripcion || product.descripcion,
//                 img: img || product.img,
//                 precio: precio || product.precio,
//                 stock: stock || product.stock,
//                 code: code || product.code
//             };

//             const modification = await productManager.editProduct(pid, newProduct);

//             res.json({message: "success", data: modification})
//         } else { res.json({message:"El producto solicitado no existe"})}
//     } catch (error) {
//             console.error("No se hay podido modificar el producto", error);
//             res.status(500).json({message: "error", data: error})}    
// })

// router.delete("/:pid", async (req, res) => {
//     const {pid} = req.params;

//     try {
//         let product = await productManager.getProductById(pid);

//         if (product) {
//         const deleteProduct = await productManager.deleteProductById(pid);

//             res.json({message: "success. El Producto fue eliminado", data: deleteProduct})
//         } else { res.json({message:"El producto solicitado no existe"})}
//     } catch (error) {
//             console.error("No se hay podido eliminar el producto", error);
//             res.status(500).json({message: "error", data: error})}    
// })


export default router;