const db = require('../database')
const express = require('express')

const uniqueString = require('unique-string');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const User = require('../models/user')

const router = express.Router();

router.get('/test', (req, res) => {
    db.query('SELECT * FROM public.authuser', (err, user) => {

        if (err.error){
            return res.status(404).json(err)
        }
        
          return res.json(user[0])
        
    });
});


router.post('/register', (req, res) => {
    db.query('SELECT * FROM public.authuser WHERE email = $1 ;', [req.body.email], (errors, user) => {
        if (user.length == 0) {
            let hashpass = req.body.password;
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(hashpass, salt, (err, hash) => {
                    if (err) throw err;
                    hashpass = hash;                  
                    User.register(req.body.email, hashpass, (err, user) => {
                        if (err.length = 0) {
                            return res.json(err)
                        }else{
                            return res.json({ hash })
                        }
                        
                    })
                });
            });
        } else {
            res.json({
                msg: 'this email already register'
            });
        }
    });
});

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({
        email: req.user.email,
    });
});



router.post('/login', (req, res) => {
    db.query('SELECT * FROM public.authuser WHERE email = $1 ;', [req.body.email], (err, user) => {
        if (err.length == 'undefined') {
            res.status(404).json(err);
        } else if (user.length > 0) {
            bcrypt.compare(req.body.password, user[0].password).then((isMatch) => {
                if (isMatch) {
                    const payload = {
                        email: user[0].email
                    };

                    jwt.sign(payload, 'secret', { expiresIn: 3600 }, (err, token) => {
                        res.json({
                            success: true,
                            token: `Bearer ${token}`
                        });
                    }); // log out in 1 hr
                } else {
                    res.json('fail');
                }
            });
        } else {
            res.json('There are no account exist');
        }
    });
})
module.exports = router;

