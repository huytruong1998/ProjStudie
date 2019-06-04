const db = require('../../database')
const express = require('express');
const uniqueString = require('unique-string');
const Order = require('../../models/order');

const router = express.Router();

router.get('/test', (req, res) => {
    db.query('SELECT * FROM public.authuser', (err, user) => {
        if (err.error) {
            return res.status(404).json(err)
        }
        return res.json(user)

    });
});

router.post('/getorder',(req,res)=>{
    Order.getorder( (err, products) => {
        if (err) {
            return res.json(err);
        }
        return res.json(products);
    })
})

router.get('/getallorder',(req,res)=>{
    Order.getallorder((err,order)=>{
        if (err) {
            return res.json(err);
        }
        return res.json(order);
    })
})


router.post('/array',(req,res)=>{
    const uniqueID = uniqueString();
    Order.createOrder(uniqueID, req.body.startdate, req.body.item, req.body.status, req.body.enddate, req.body.userid, req.body.totalprice,(err,order)=>{
        if (err) {
            return res.json(err);
        }
        return res.json(order);
    })
})


module.exports = router;