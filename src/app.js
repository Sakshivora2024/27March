const express = require("express");
const dotenv = require('dotenv');
const cookie_parser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
const db = require("../config/mysql");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config()
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(cookie_parser());

// app.use(express.j)

app.get("/registration",(req,res)=>{
    
    res.render("registration");
})

app.post("/registration",async(req,res)=>{
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
        
        res.redirect("/login");
    } catch (error) {
        console.log(error);
    }
   
})

app.get("/login",(req,res)=>{
    
    res.render("login");
})

app.post("/login",async(req,res)=>{
    const data = req.body;
    try {
        
        let sql = `select * from users where email = ?`;
        const result = await db.query(sql,[data.email]);
        let salt = result[0][0]["salt"];
        const hashPwd = md5(data.password + salt);
        if(result[0][0]["email"] != data.email && hashPwd != result[0][0]["password"]){

            res.send("User does not exist")
        }
        else{
                let jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
                let id = result[0][0]["id"];
                // console.log(jwtSecretKey);
                let data1 = {id};
                const token = jwt.sign(data1,jwtSecretKey,{
                    expiresIn: '1h'
                });

                console.log(token);
                res.send({token});
            
        }
        
        
    } catch (error) {
        console.log(error);
    }
   
})


app.get("/task/:token",(req,res) =>{
    console.log("token",req.params.token)
    res.render("task");
})

let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})