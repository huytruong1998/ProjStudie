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


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'uploads/')
    },
    filename:function(req,file,cb){
        cb(null, Date.now() + file.originalname);
    }
})

const upload = multer({ storage: storage }) 

const fileFilter = (req,file,cb)=>{
    //reject a file
    if(file.minetype ==='image/jpeg'|| file.minetype==='image/png'){
        cb(null, true);
        
    }else{
        cb(null, false);
    }
    
}


const router = express.Router();
//Set storage engine

//Init upload
router.post('/testimage',upload.single('image'),(req,res,next)=>{
    // const imagepath = req.headers.host + '/' + req.file.path;
     console.log(req.body.image);
    
})


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

router.post('/addproducts', upload.single('image'),(req,res) =>{
    const { errors, isValid } = validateAddProduct(req.body);

    // Check Validation
    if (!isValid) {
        return res.status(400).json(errors);
    }
    
    const imagepath = 'http://' + req.headers.host + '/' + req.file.path;
    
    const uniqueID = uniqueString();
    Product.addproduct(uniqueID, req.body.name, req.body.price, req.body.brand, req.body.type, req.body.stocks, imagepath,req.body.tag,req.body.discount,req.body.description,req.body.country, (err, product) => {
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


router.post('/:id/buyproduct',(req,res)=>{
    Product.buyproduct(req.params.id, req.body.quantity, (err, product)=>{
        if (err.length = 0) {
            return res.json(err)
        } else {
            return res.json({ msg: 'Sucessfully buy product' })
        }
    })
})


router.post('/:id/admin/edit', upload.single('image'),(req,res)=>{
    const discountnull = req.body.discount;
    if (req.file !== undefined) {
       const imagepath = 'http://' + req.headers.host + '/' + req.file.path;
    }
    

    if(req.file !== undefined){
       const imagepath = 'http://' + req.headers.host + '/' + req.file.path;
        Product.editproduct(req.params.id, req.body.name, req.body.price, req.body.brand, discountnull, req.body.type, req.body.description, req.body.country, imagepath, req.body.tag, req.body.stocks, (err, product) => {
            if (err) {
                return res.json(err);
            }
            return res.json(product);
        })   
    }else{
        const imagepath = req.body.image;
        Product.editproduct(req.params.id, req.body.name, req.body.price, req.body.brand, discountnull, req.body.type, req.body.description, req.body.country, imagepath, req.body.tag, req.body.stocks, (err, product) => {
            if (err) {
                return res.json(err);
            }
            return res.json(product);
        })
    }
    
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