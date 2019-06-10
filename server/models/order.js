const db = require('../database');
const _ = require('lodash')

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

    static changestatus(status,orderid,callback){
        if(status === 'delete'){
            db.query('DELETE FROM public.order WHERE orderid=$1',[orderid],(err)=>{
                if(err.errors){
                    return callback(error)
                }
                callback('Successfully delete item')
            })
        }else{
            db.query('UPDATE public.order SET status =$1 WHERE orderid=$2', [status, orderid], (err) => {
                if (err.errors) {
                    return callback(error)
                }
                callback('Successfully update status')
            })
        }
        
    }
}

module.exports = Order;