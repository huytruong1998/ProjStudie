const db = require('../database')

class Order {
    static createOrder(uniqueID, startdate, item, status, enddate, userid, totalprice, callback) {
        db.query(
            `INSERT INTO public.order( orderid,startdate,item,status,enddate,userid,totalprice ) VALUES ($1,$2,$3,$4,$5,$6,$7);`,
            [uniqueID, startdate, item, status, enddate, userid, totalprice], (err, res) => {
                if (err.errors) {
                    return callback(err)
                }
                callback(res)
            }
        );
    }

    static getorder( callback) {
        db.query('SELECT item FROM public.order', (err, res) => {
            if (err.errors) {
                return callback(err)
            }
            callback(res)
        })
    }

    static getallorder(callback){
        db.query('SELECT * from public.order',(err,res)=>{
            if (err.errors) {
                return callback(err)
            }
            callback(res)
        })
    }
}

module.exports = Order;