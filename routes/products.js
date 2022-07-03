const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

//Getting all
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

//Getting all with specified category, sorted by their release date from newest to oldest,
//and limited to a certain number depending on which page and section
router.get('/category-and-limit', async (req, res) => {
    let limit = 3;
    if (req.query.page === 'product') limit = 18;
    else if (req.query.page === 'home/latest') limit = 3;
    else if (req.query.page === 'support') limit = 0;

    try {
        const products = await Product.find({ category: req.query.category }).
            sort({"releaseDate" : -1}).
            limit(limit);

        res.json(products);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

//Getting one
router.get('/:id', getProduct, (req, res) => {
    res.send(res.product);
});

//Creating one
// router.post('/', async (req, res) => {
//     const product = new Product({
//         name: req.body.name,
//     })

//     try {
//         const newProduct = await product.save();
//         res.status(201).json(newProduct);
//     } catch (err) {
//         res.status(400).json({message: err.message});
//     }
// });

//Updating one
router.patch('/:id', (req, res) => {

});

//Deleting one
router.delete('/:id', (req, res) => {

});

async function getProduct(req, res, next) {
    let product;
    try {
        product = await Product.findById(req.params.id);
        if (product == null) {
            return res.status(404).json({ message: "Cannot find product" });
        }
    }
    catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.product = product;
    next();
}

module.exports = router;