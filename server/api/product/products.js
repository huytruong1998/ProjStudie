const db = require('../../database')
const express = require('express')

const uniqueString = require('unique-string');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../../models/product');
const validateAddProduct = require('../../validation/addproducts');
const Product = require('../../models/product');

const router = express.Router();

router.get('/test', (req, res) => {
    db.query('SELECT * FROM public.authuser', (err, user) => {
        if (err.error) {
            return res.status(404).json(err)
        }
        return res.json(user)

    });
});


router.get('/showallproducts', (req,res) =>{
    db.query('SELECT * FROM public.products', (err, user) => {
        if (err.error) {
            return res.status(404).json(err)
        }
        return res.json(user)

    });
})

router.post('/addproducts',(req,res) =>{
    const { errors, isValid } = validateAddProduct(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const uniqueID = uniqueString();
    Product.addproduct(uniqueID, req.body.name, req.body.price, req.body.brand, req.body.type, req.body.stocknumber, req.body.image,req.body.tag, (err, product) => {
        if (err.length = 0) {
            return res.json(err)
        } else {
            return res.json({ msg:'Sucessfully added product' })
        }

    })
})


router.post('/deleteproducts', (req,res)=>{
    Product.deleteproduct(req.body.productid,(err,product)=>{
        if (err.length = 0) {
            return res.json(err)
        } else {
            return res.json({ msg: 'Sucessfully delete product' })
        }
    })
})


module.exports = router;