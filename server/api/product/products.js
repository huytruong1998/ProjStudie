const db = require('../../database')
const express = require('express')

const uniqueString = require('unique-string');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const path = require('path')

const validateAddProduct = require('../../validation/addproducts');
const Product = require('../../models/product');
const validateCheckStockInput = require('../../validation/checkstock');
const _ = require('lodash');
const multer = require('multer');

const router = express.Router();
//Set storage engine
const storage = multer.diskStorage({
    destination: './upload',
    filename: function(req,file,cb){
        cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})
//Init upload
const upload = multer({ storage: storage })
router.get('/showallproducts', (req,res) =>{
    Product.showallproducts(function(err,products){
        if(err){
            return res.json(err);
        }
        return  res.json(products);
    })
})

router.get('/:id', (req, res) => {
    Product.getproduct(req.params.id, (err, products) => {
        if (err) {
            return res.json(err);
        }
        return res.json(products[0]);
    })
})

router.post('/addproducts',(req,res) =>{
    const { errors, isValid } = validateAddProduct(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    const uniqueID = uniqueString();
    Product.addproduct(uniqueID, req.body.name, req.body.price, req.body.brand, req.body.type, req.body.stocks, req.body.image,req.body.tag,req.body.discount,req.body.description,req.body.country, (err, product) => {
        if (err.length = 0) {
            return res.json(err)
        } else {
            return res.json({ msg:'Sucessfully added product' })
        }

    })
})

router.post('/testimage', upload.single('file'),(req,res)=>{
    console.log(req.file);
    es.send("file saved on server");
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


router.post('/:id/buyproduct',(req,res)=>{
    Product.buyproduct(req.params.id, req.body.quantity, (err, product)=>{
        if (err.length = 0) {
            return res.json(err)
        } else {
            return res.json({ msg: 'Sucessfully buy product' })
        }
    })
})


router.post('/:id/admin/edit',(req,res)=>{
    Product.editproduct(req.params.id, req.body.name, req.body.price, req.body.brand, req.body.discount, req.body.type, req.body.description, req.body.country, req.body.image, req.body.tag, req.body.stocks, (err, product) => {
        if (err) {
            return res.json(err);
        }
        return res.json(product);
    })
})

router.post('/checkstock',(req,res)=>{
    const { errors, isValid } = validateCheckStockInput(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    db.query('SELECT stocks from public.products WHERE id=$1', [req.body.productid], (err, product) => {
        if (err.length == 'undefined') {
            res.status(404).json(err);
        }
        if (parseInt(product[0].stocks) >= parseInt(req.body.quantity)) {
            res.json('true');
        }
        else {
            errors.notenough = 'There is not enough item in stock';
            return res.status(404).json(errors);
        }
    })
})

router.post('/buyproducts', (req, res) => {
    Product.buyproduct(req.body.productid, req.body.quantity, (err, product) => {
        if (err) {
            return res.json(err);
        }
        return res.json(product);
    })
})

module.exports = router;