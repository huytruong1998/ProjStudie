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
}

module.exports = User;