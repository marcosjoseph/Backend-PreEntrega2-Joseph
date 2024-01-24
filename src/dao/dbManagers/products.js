import {ProductModel} from "../models/products.model.js";

export default class Products {
    constructor() {};

    async getAll() {
        let products = await ProductModel.find().lean();
        return products;
    }

    async getById(id) {
        let product = await ProductModel.findById(id).lean();
        return product;
    }

    async saveProduct(product) {
        let newProduct = new ProductModel(product);
        let result = await newProduct.save();
        return result;
    }

    async updateProduct(id, product) {
        const result = await ProductModel.updateOne({_id:id}, product);
        return result;
    }

    async deleteProduct(id) {
        const result = await ProductModel.findByIdAndDelete(id);
        return result;
    }
}