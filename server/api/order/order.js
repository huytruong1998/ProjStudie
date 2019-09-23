const db = require('../../database')
const express = require('express');
const uniqueString = require('unique-string');
const Order = require('../../models/order');
const nodemailer = require('nodemailer');
const _ = require('lodash');

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


router.post('/neworder',(req,res)=>{
    const uniqueID = uniqueString();
    Order.createOrder(uniqueID, req.body.startdate, req.body.item, req.body.status, req.body.enddate, req.body.userid, req.body.totalprice,req.body.email,(err,order)=>{
        if (err) {
            return res.json(err);
        }
        return res.json(order);
    })
    nodemailer.createTestAccount((err,account)=>{
        const itemorder = _.map(req.body.item.order,(item)=>{
            itemprice = parseFloat(item.price * (1 - item.discount)).toFixed(2);
            itemtotal = parseFloat(itemprice * item.quantity).toFixed(2);
        
            return `<p>${item.name} = ${itemprice}€ x ${item.quantity} = ${itemtotal}€</p>`
        })

        const htmlEmail=`
        <h3>Your Purchase</h3>
        <h3>${itemorder}</h3>
        <h3>Total: ${parseFloat(req.body.totalprice).toFixed(2)}€</h3>
        `
        const transporter = nodemailer.createTransport({
            host: 'gmail',
            port: 587,
            auth: {
                user: 'truongquanghuy723027@gmail.com',
                pass: 'process.env.ENV_VARIABLE'
            }
        });
        let mailOptions={
            from:'test@testaccount.com',
            to:'katheryn53@ethereal.email',
            replyTo:'test@testaccount.com',
            subject:'New Message',
            html:htmlEmail
        }

        transporter.sendMail(mailOptions,(err,info)=>{
            if(err){
                return console.log(req.body.item.order);
            }
            
        })
    })

})

router.post('/checkorderstock',(req,res)=>{
    Order.checkorderstocks(req.body.orderid,(err,ordercheck)=>{
        if(err){
            return res.json(err);
        }
        return res.json(ordercheck)
    })
})

router.post('/changestatus',(req,res)=>{
    Order.changestatus(req.body.status,req.body.orderid,(err,status)=>{
        if (err) {
            return res.json(err);
        }
        return res.json(status);
    })
})


module.exports = router;