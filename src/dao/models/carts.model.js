import mongoose from "mongoose";

const cartsCollection = "carts";

const CartSchema = new mongoose.Schema({
    products: {
        type:[{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref:"products"},
            quantity: {
                type:Number,
                default:1}
            }],
    default:[]}
}) 

// CartSchema.pre(['find', 'findOne'], function () {
//     this.populate({path: 'products.productos', select:'nombre precio img'})
// })

CartSchema.pre("findOne", function () {
    this.populate("products")
})

export const CartModel = mongoose.model(cartsCollection, CartSchema);