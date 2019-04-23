const path = require('path');
const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan');

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const passport = require('passport');

const users = require('./api/users')

var db = require('./database')

const ENV = process.env.NODE_ENV;
const PORT = process.env.NODE_ENV || 5000;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:false}))

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'secret'
    // process.env.SECRET_OR_KEY
};
const strategy = new JwtStrategy(opts, (payload, next) => {
    // TODO GET USER FROM DB
    db.query('SELECT * FROM public.authuser WHERE email = $1 ;', [payload.email], (err, user) => {
        if (err.length == 'undefined') {
            res.status(404).json(err);
        }
        if (user.length > 0) {
            return next(null, user[0]);
        }
        return next(null, false);
    });
});

passport.use(strategy);
app.use(passport.initialize());

app.use(morgan('dev'));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});


app.use(express.static('dist'));
app.get('/api/getUsername', (req, res) => res.send({ username: os.userInfo().username }));

app.use('/api/users', users);

app.listen(PORT, ()=>{
    console.log(`Listening on port ${PORT}`);
})

module.exports = app;