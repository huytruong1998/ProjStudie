const db = require('../database')
const uniqueString = require('unique-string');

class Product {
    static addproduct(uniqueID, name, price, brand, type, stocks, image,tag,discount, callback) {
        db.query(
            `INSERT INTO public.products( id,name, price,brand,type,stocks,image,tag,discount ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9);`,
            [uniqueID, name, price, brand, type, stocks,image,tag,discount], (err, res) => {
                if (err.errors) {
                    return callback(err)
                }
                callback(res)
            }
        );
    }

    static deleteproduct(productid,callback){
        db.query(`DELETE from public.products where id = $1;`,[productid],(err,res)=>{
            if(err.errors){
                return callback(err)
            }
            callback(res)
        }
        );
    }

    static getproduct(id, callback) {
        db.query('SELECT * FROM public.products WHERE id =$1', [id], (err, res) => {
            if (err.errors) {
                return callback(err)
            }
            callback(res)
        })
    }

    static showallproducts(callback){
        db.query('SELECT * FROM public.products',(err,res)=>{
            if(err.errors){
                return callback(err)
            }
            callback(res)
        })
    }

    static buyproduct(productid,quanitty,callback){
        db.query('SELECT stocks from public.products WHERE id=$1',[productid],(err,res)=>{
            if (err.errors) {
                return callback(err)
            }
            if (parseInt(res[0].stocks) >= parseInt(quanitty)) {
                db.query('UPDATE public.products SET stocks = stocks -$1 WHERE id=$2;', [quanitty, productid],(error,result)=>{
                    if (error.errors) {
                        return callback(err)
                    }
                    callback('Successfully buy item')
                })
            }
            else{
                callback('Not enough in stocks')
            }
        })
    }

    static checkstock(productid,quanitty, callback){
        db.query('SELECT stocks from public.products WHERE id=$1', [productid], (err, res) => {
            if (err.errors) {
                return callback(err)
            }
            if (parseInt(res[0].stocks) >= parseInt(quanitty)) {
                callback('true')
            }
            else {
                callback('false')
            }
        })
    }

    static editproduct(productid,name,price,brand,discount,type,description,country,image,tag,stocks,callback){
        db.query('UPDATE public.products SET name = $1,price =$2, brand =$3, discount=$4, type=$5, description =$6, country=$7, image=$8,tag=$9, stocks = $10 WHERE id = $11',[name,price,brand,discount,type,description,country,image,tag,stocks,productid],(error)=>{
            if (error.errors) {
                return callback(error)
            }
            callback('Successfully update item')
        })
    }

    
}

module.exports = Product;