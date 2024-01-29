import {CartModel} from "../models/carts.model.js";

export default class Carts {
    constructor() {};

    async getAll() {
        let carts = await CartModel.find().lean();
        return carts;
    }

    async getById(cid) {
        let cart = await CartModel.findById(cid).lean();
        return cart;
    }

    async saveCart(cart) {
        let newCart = new CartModel(cart);
        let result = await newCart.save();
        return result;
    }

    async updateCart(cid, cart) {
        const result = await CartModel.updateOne({_id:cid}, cart);
        return result;
    }

    async deleteCart(cid) {
        const result = await CartModel.findByIdAndDelete(cid);
        return result;
    }
}