const db = require('../database')
const uniqueString = require('unique-string');

class Product {
    static addproduct(uniqueID, name, price, brand, type, stocknumber, image,tag, callback) {
        db.query(
            `INSERT INTO public.products( id,name, price,brand,type,stocknumber,image,tag ) VALUES ($1,$2,$3,$4,$5,$6,$7,$8);`,
            [uniqueID, name, price, brand, type, stocknumber,image,tag], (err, res) => {
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

    static showallproducts(callback){
        db.query('SELECT * FROM public.products',(err,res)=>{
            if(err.errors){
                return callback(err)
            }
            callback(res)
        })
    }
}

module.exports = Product;