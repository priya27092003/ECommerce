const express = require('express');
const router = express.Router();
const Product = require('../models/product.model'); // Adjust path if needed

// Display all products
router.get('/product', async (req, res) => {
    try {
        const products = await Product.find();
        res.render('products', { products }); // Renders views/products.ejs
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching products.");
    }
});

// Render form to add a new product
router.get('/new', (req, res) => {
    res.render('newProduct'); // Renders views/new-product.ejs
});

// Handle product creation
router.post('/new', async (req, res) => {
    const { image, name, price, discount, bgColor, panelcolor, textColor } = req.body;
    try {
        const newProduct = new Product({ image, name, price, discount, bgColor, panelcolor, textColor });
        await newProduct.save();
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error adding product.");
    }
});

// Render edit product form
router.get('/edit/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).send("Product not found.");
        }
        res.render('editProduct', { product }); // Renders views/edit-product.ejs
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching product.");
    }
});

// Handle product updates
router.post('/edit/:id', async (req, res) => {
    const { image, name, price, discount, bgColor, panelcolor, textColor } = req.body;
    try {
        await Product.findByIdAndUpdate(req.params.id, { image, name, price, discount, bgColor, panelcolor, textColor });
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error updating product.");
    }
});

// Delete product
router.post('/delete/:id', async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.redirect('/products');
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting product.");
    }
});

module.exports = router;