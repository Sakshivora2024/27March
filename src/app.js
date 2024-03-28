const express = require("express");
const dotenv = require('dotenv');
const cookie_parser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const md5 = require("md5");
const bcrypt = require("bcryptjs");
const bodyParser = require('body-parser');
const db = require("../config/mysql");
const { checkAuthentication } = require("./tokens");
const fs = require('fs');
const uuid = require('uuid');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config()
app.set('view engine', 'ejs');  
app.use(express.static('public'));
app.use(cookie_parser());
const uniqueId = uuid.v4();
var filepath = __dirname + '/data.json';


// app.use(express.j)

app.get("/registration",(req,res)=>{
    
    return res.render("registration");
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
        
        return res.redirect("/login");
    } catch (error) {
        console.log(error);
    }
   
})

app.get("/login",(req,res)=>{
    
    return res.render("login",{error:''});
})

app.post("/login",async(req,res)=>{
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

app.get("/events",checkAuthentication,(req,res)=>{
    res.render("events");
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

app.get("/Job_app_form_1",checkAuthentication,(req,res)=>{
    res.render("Job_app_form_1");
})

app.get("/job_app_form2",checkAuthentication,(req,res)=>{
    res.render("job_app_form2");
})

app.get('/crud_fs/form',(req,res) =>{
res.render('crud_fs/form');
})

app.post('/crud_fs/form', (req, res) => {
    let data = {uniqueId,...req.body};
    let userjson = fs.readFileSync(filepath,'utf-8');
    let users = JSON.parse(userjson);
    users.push(data);
    userjson = JSON.stringify(users);
    fs.writeFileSync(filepath,userjson,'utf-8');
    res.redirect('list');
    console.log(uniqueId);
    console.log(data);
});
app.get('/crud_fs/list',(req,res) =>{
    const users = require(filepath);
    res.render('crud_fs/list',{users});
})
  
app.get('/userdetails',(req,res) =>{
    const users = require(filepath);

    users.forEach((users)=>{
        if(users["uniqueId"] == req.query["userid"])
        {
        res.render("crud_fs/userdetails", {users});
        }
    })
})

app.get('/crud_db/form',(req,res) =>{
    res.render('crud_db/form');
  });

app.post('/crud_db/form',async (req,res) =>{
    
    try {
        let firstname = req.body.firstname;
        let lastname = req.body.lastname;
        let age = req.body.age;
        let phoneno = req.body.phoneno;
        let email = req.body.email;
        let gender = req.body.gender;
        let hobbies = req.body.hobbies.join(", ");
        let address2 = req.body.address2;

        let sql = "INSERT INTO userdb(firstname,lastname,age,phoneno,email,gender,hobbies,address2) VALUES (?,?,?,?,?,?,?,?)";
        const data = await db.query(sql,[firstname,lastname,age,phoneno,email,gender,hobbies,address2]);

        res.redirect('list');
    } catch (error) {
        console.log(error);
    }


});

app.get('/crud_db/list',async (req,res) =>{
    let sql = `select * from userdb`;
    const [users] = await db.query(sql);
    res.render('crud_db/list',{users})
    
});

app.get('/userdetail',async (req,res) =>{
    console.log(1);
    try {
        
        let userid = req.query.userid;
        console.log(userid)
        let sql = `Select * from userdb where uniqueId = ?`
        const [users] = await db.query(sql,[userid]);
        console.log(users);
        res.render("crud_db/userdetail",{users});
    } catch (error) {
        console.log(error);
    }
    
})

let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})