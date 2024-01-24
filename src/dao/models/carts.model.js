import mongoose from "mongoose";

const cartsCollection = "carts";

const CartSchema = new mongoose.Schema({
    products: {type:Array,default:[]}
}) 

export const CartModel = mongoose.model(cartsCollection, CartSchema);