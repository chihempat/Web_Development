const Order = require("../models/order");
const Product = require("../models/product");
const mongoose = require("mongoose");

exports.products_get_all = (req, res, next) => {
    Product.find()
        .select('name price _id productImage')
        .exec()
        .then(docs => {
            const response = {
                count: docs.length,
                products: docs.map(doc => {
                    return {
                        name: doc.name,
                        price: doc.price,
                        productImage: doc.productImage,
                        _id: doc._id,
                        resquest: {
                            type: 'GET',
                            url: "localhost3000/products/" + doc._id,
                        }
                    }
                })
            };
            console.log(response);
            res.status(200).json(response);

        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.products_create_product = (req, res, next) => {
    console.log(req.file);
    const product = new Product({
        _id: mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage: req.file.path
    });
    product
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                message: "Handling POST requests to /products",
                createdProduct: {
                    name: result.name,
                    price: result.price,
                    _id: result._id,
                    request: {
                        type: "GET",
                        url: "localhost:3000/" + result._id
                    }
                }
            })
        })

    .catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
};


exports.products_get_product = (req, res, next) => {
    const id = req.params.productId;
    Product.findById(id).select("name price _id productImage")
        .exec()
        .then(doc => {
            console.log("From database", doc);
            if (doc) {
                res.status(200).json({
                    product: doc,
                    request: { type: GET, url: 'localhost:3000/products' }
                });
            } else {
                res.status(404)
                    .json({ message: "No valid entry found for provided ID" });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.products_update_product = (req, res, next) => {
    const id = req.params.productId;
    Product.updateOne({ _id: id }, { $set: req.body })
        .exec()
        .then(result => {
            console.log(result);
            res.status(200).json({
                message: "product updates",
                product: result,
                request: { type: "GET", url: "localhost:3000/products" + result._id }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};

exports.products_delete = (req, res, next) => {
    const id = req.params.productId;
    Product.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                message: "product deleted",
                results: {
                    type: "POST",
                    url: "localhost:3000/products" + result._id,
                    data: { name: String, price: Number }
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
};