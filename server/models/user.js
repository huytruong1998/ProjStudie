const db = require('../database')
const uniqueString = require('unique-string');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
class User{
    static register (email,password,callback){
        db.query(
            `INSERT INTO public.authuser( email, password ) VALUES ($1,$2);`,
            [email, password],(err,res)=>{
                if(err.errors){
                    return callback(err)
                }
                callback(res)
            }
        );
    }


    static login (email,password,callback){
        db.query('SELECT * public.authuser WHERE email = $1',[email],(err,res)=>{
            if (err.errors) {
                return callback(err)
            }
            callback(res)
        })
    }
}

module.exports = User;