import {CartModel} from "../models/carts.model.js";

export default class Carts {
    constructor() {};

    async getAll() {
        let carts = await CartModel.find().lean();
        return carts;
    }

    async getById(id) {
        let cart = await CartModel.findById(id).lean();
        return cart;
    }

    async saveCart(cart) {
        let newCart = new CartModel(cart);
        let result = await newCart.save();
        return result;
    }

    async updateCart(id, cart) {
        const result = await CartModel.updateOne({_id:id}, cart);
        return result;
    }

    async deleteCart(id) {
        const result = await CartModel.findByIdAndDelete(id);
        return result;
    }
}