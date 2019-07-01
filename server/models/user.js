const db = require('../database')

class User{
    static register(email, password,uniqueID,callback){
        db.query(
            `INSERT INTO public.authuser( email, password,userid ) VALUES ($1,$2,$3);`,
            [email, password, uniqueID],(err,res)=>{
                if(err.errors){
                    return callback(err)
                }
                callback(res)
            }
        );
    }  

    static addprofile(id,profileinfo,callback){
        db.query(
            `UPDATE public.authuser SET info=$1 WHERE userid =$2`, [profileinfo,id], (err) => {
                if (err.errors) {
                    return callback(error)
                }
                callback('Successfully update profile')
            })
        
    }

    static getprofile(id,callback){
        db.query(
            `SELECT info FROM public.authuser WHERE userid =$1`, [id], (err,profile) => {
                if (err.errors) {
                    return callback(error)
                }
                callback(profile[0].info)
            })
    }
}

module.exports = User;