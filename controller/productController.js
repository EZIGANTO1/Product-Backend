const Product = require('../Module/product.module.js');

// get products
const getProducts = async (req, res) => {
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    }   catch (error) {
        res.status(500).json ({ message: error.message });
    }
};

// create products
const createProducts = async (req, res) => {
    try {
        const products = await Product.create(req.body);
        res.status(200).json(products);
    }   catch (error) {
        res.status(500).json ({ message: error.message });
    }
};

// get product by id
const getProductsById = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update new product
let updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' });
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    }   catch (error) {
        res.status(500).json({ message: error.message })
    }
};

// delete new product
let deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findByIdAndDelete(id);
        if (!product) {
            return res.status(404).json({ message: 'Product Not Found' });
        }
        res.status(200).json({ message: 'Product Deleted Successfully' })
    }   catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports = {
    getProducts,
    createProducts,
    getProductsById,
    updateProduct,
    deleteProduct,
};