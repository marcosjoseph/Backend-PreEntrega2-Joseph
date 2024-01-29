import express from "express";
import {Server} from "socket.io";
import handlebars from "express-handlebars";
import mongoose from "mongoose";
import dotenv from "dotenv";

//Importo las routes
import productsRouter from "./routes/products.router.js";
import cartRouter from "./routes/cart.router.js";
import viewsRouter from "./routes/views.router.js";
import {__dirname} from "./utils.js";

//Inicializo dotenv para proteger mis datos sensibles
dotenv.config();

//Creo y conecto el puerto
const app = express();
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`)
})

// // //Conecto mi BD de Mongoose
const DB_URL = process.env.DB_URL;

mongoose.connect(DB_URL).then(()=> {console.log("Base de Datos conectada:" + DB_URL);
}).catch((error)=>{console.log("Error en la conexion de la base de datos", error);})

app.use(express.json()); //Me permite recibir y mandar JSON
app.use(express.urlencoded({extended:true})); //Me permite obtener querys y params

app.use(express.static(__dirname + "/public"));

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

//Conecto las routes
app.use("/api/products", productsRouter); //le pongo api para poder manejar el crud
app.use("/api/carts", cartRouter);
app.use("/", viewsRouter) //aca renderizo las vistas de los handlebars

const socketServer = new Server(server);

socketServer.on ("connection", (socket) => {
    console.log("Nuevo Cliente Conectado");
    
    socket.on("addProduct", async (product)=>{
        const nombre= product.nombre;
        const descripcion = product.descripcion;
        const img = product.img;
        const precio = product.precio;
        const stock = product.stock;
        const code = product.code;

        try {
            const agregarProducto = await productManager.addProduct(nombre, descripcion, img, precio, stock, code);
            const allProducts = await productManager.getProducts();

            agregarProducto && socketServer.emit("updateProducts", allProducts)
        } catch (error) {console.log("Error al agregar Producto," + error)};
        })

    socket.on("deleteProduct", async (id) => {
        try {
            const borrarProducto = await productManager.deleteProductById(id);
            const allProducts = await productManager.getProducts();

            borrarProducto && socketServer.emit("updateProducts", allProducts)
    } catch (error) {console.log("Error al eliminar el producto," + error)}})
})

