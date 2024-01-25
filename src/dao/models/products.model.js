import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2";

const productsCollection = "products";

const ProductSchema = new mongoose.Schema({
    categoria:{type:String, required:true},
    nombre:{type:String, required:true},
    descripcion:{type:String},
    img:{type:String},
    precio:{type:Number,required:true},
    stock:{type:Number, default:1, required:true},
    code:{type:String, unique:true, required:true}
})

ProductSchema.plugin(paginate);

export const ProductModel = mongoose.model(productsCollection, ProductSchema);