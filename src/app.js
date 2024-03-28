const express = require("express");
const dotenv = require('dotenv');
const cookie_parser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
const db = require("../config/mysql");
const { checkAuthentication } = require("./tokens");


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
    
    res.render("login",{error:''});
})

app.post("/login",async(req,res)=>{
    const data = req.body;
    try {
        
        let sql = `select * from users where email = ?`;
        const result = await db.query(sql,[data.email]);
        let salt = result[0][0]["salt"];
        const hashPwd = md5(data.password + salt);
        console.log(Object.keys(result[0][0]).length > 0)
        if(Object.keys(result[0][0]).length > 0){
            if(hashPwd !== result[0][0]["password"]){
                console.log(1)
                res.render("login",{error:"Invalid Password"})
            }
            else{
                console.log(2);
                let jwtSecretKey = process.env.ACCESS_TOKEN_SECRET;
                let id = result[0][0]["id"];
                let data1 = {id};
                const token = jwt.sign(data1,jwtSecretKey,{
                    expiresIn: '1h'
                });
                
                res.cookie('jwt',token);
                res.redirect("/task");
                
            }
        }
        else{
                res.render("login",{error:"Invalid Password or email"});
        }

    } catch (error) {
        console.log(error);
    }
   
})


app.get("/task",(req,res,next) =>{
    // console.log(req.params.token);
    // checkAuthentication(req,res,next);
    res.render("task");
})

app.get("/dynamictable",checkAuthentication,(req,res)=>{
    res.render("dynamictable");
})

app.get("/kukuCube",checkAuthentication,(req,res)=>{
    res.render("kukuCube");
})

app.get("/tic-tac-toe",checkAuthentication,(req,res)=>{
    res.render("tic-tac-toe");
})

app.get("/practical1",checkAuthentication,(req,res)=>{
    res.render("practical1");
})

app.get("/practical2",checkAuthentication,(req,res)=>{
    res.render("practical2");
})

app.get("/practical3",checkAuthentication,(req,res)=>{
    res.render("practical3");
})

let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})