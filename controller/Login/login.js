const db = require("../../database/mysql");
const jwt = require('jsonwebtoken');
const md5 = require("md5");

const log = (req,res)=>{
    
    return res.render("login",{error:''});
}

const login = async(req,res)=>{
    const data = req.body;
    try {
        
        let sql = `select * from users where email = ?`;
        const result = await db.query(sql,[data.email]);
        let salt = result[0][0]["salt"];
        const hashPwd = md5(data.password + salt);
        if(Object.keys(result[0][0]).length > 0){
            if(hashPwd !== result[0][0]["password"]){
                console.log(1)
                return res.render("login",{error:"Invalid Password"})
            }
            else{
                let jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
                let id = result[0][0]["id"];
                let data1 = {id};
                const token = jwt.sign(data1,jwtSecretKey,{
                    expiresIn: '1h'
                });
                
                res.cookie('jwt',token);
                return res.redirect("/task");
                
            }
        }
        else{
                return res.render("login",{error:"Invalid Password or email"});
        }

    } catch (error) {
        console.log(error);
    }
   
}

module.exports = {log,login}