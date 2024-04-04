const db = require("../../database/mysql");
const bcrypt = require("bcryptjs");
const register = (req,res)=>{
    
    return res.render("registration");
}

const registration = async(req,res)=>{
    const data = req.body;
    console.log(data);
    try {
        
        let sql = `select * from users`;
        const result = await db.query(sql);
        console.log(result);
        if(result[0][0]["email"] == data.email){

            res.send("User is already present")
        }
        else{
            const salt = await bcrypt.genSalt(4);
            const hashPwd = md5(data.password + salt);
            let sql = `insert into users(firstname,lastname,email,password,salt) values(?,?,?,?,?)`;
            const res1 =await db.query(sql, [data.firstname,data.lastname,data.email,hashPwd,salt]);
            
        }
        
        return res.redirect("/login");
    } catch (error) {
        console.log(error);
    }
   
}

module.exports = {register,registration}