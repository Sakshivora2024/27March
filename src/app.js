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

app.get("/student_list", async (req,res) =>{
    const page = req.query.page || 1;
    const limit = 20;

    var obf = req.query.obf;
    var ord = req.query.ord;
    if((obf && ord) == undefined){
        obf = 'student_Id';
        ord = 'asc';
    }
    const offset = (page - 1) * limit;
    try {
        const sql = `SELECT * FROM user_details ORDER BY ${obf} ${ord} limit ${offset}, ${limit}`;
        const [data] = await db.query(sql)
        console.log(sql);
        console.log(data);
        res.render("student_list",{data,page,limit,ord,obf,offset})
    } catch (error) {
        console.log(error)
    }
});

app.get("/stud_attend",async (req,res) =>{
    const page = req.query.page || 1;
    const limit = 20;
    var month_year = req.query.value || 1;
    let obf = req.query.obf;
    let ord = req.query.ord;

    if((obf && ord) == undefined){
        obf = 'student_Id';
        ord = 'asc';
    }
    
    var month_yr = {
        1 : {"month" : "December","year" : "2023"},
        2 : {"month" : "January","year" : "2024"},
        3 : {"month" : "February","year" : "2024"}
    };

    var my = (month_yr[month_year]);
    let month = (my["month"]);
    let year = (my["year"]);
    console.log(my["year"]);
    const offset = (page - 1) * limit;
    try {
        const sql = `select student_master.student_Id,CONCAT(name," ",surname) as fullname,sum(attendance) as days,concat(round((sum(attendance)/count(attendance)*100),2),'%') as percentage from student_master join student_attend on
        student_master.student_Id = student_attend.student_Id where monthname(attendancedate) = "${month}" and year(attendancedate) = "${year}" group by student_Id order by ${obf} ${ord} limit ${offset},${limit} `;

        const [data] = await db.query(sql)
        console.log(data)
        res.render('stud_attend',{student:data,page:page,limit:limit,offset:offset,month_year:month_year,obf:obf,ord:ord});
    } catch (error) {
        console.log(error);
    }
});

app.get("/stud_result",async (req,res) =>{

    const page = req.query.page || 1;
    const limit = 20;
    const offset = (page - 1) * limit;
    try {
        let sql = `select student_master.student_Id,CONCAT(name," ",surname) as fullname,sum(obtained_practical_marks) as practical,sum(obtained_theory_marks) as theory from student_master join student_exam on student_master.student_Id = student_exam.student_Id where exam_type = "T" group by student_Id limit ${offset},${limit}`;
        const [data] = await db.query(sql);

        let sql1 = `select sum(obtained_practical_marks) as practical,sum(obtained_theory_marks) as theory from student_master join student_exam on student_master.student_Id = student_exam.student_Id where exam_type = "P" group by student_master.student_Id limit ${offset},${limit}`;
        const [result] = await db.query(sql1);

        let sql2 = `select sum(obtained_practical_marks) as practical,sum(obtained_theory_marks) as theory from student_master join student_exam on student_master.student_Id = student_exam.student_Id where exam_type = "E" group by student_master.student_Id limit ${offset},${limit}`;
        const [rlt] = await db.query(sql2);

        let sql3 = `select student_Id,sum(obtained_practical_marks + obtained_theory_marks) as total from student_exam group by student_Id;`
        const [ttl] = await db.query(sql3);

        res.render('stud_result',{student:data,student1:result,stud:rlt,total:ttl,page:page,limit:limit,offset:offset});
    } catch (error) {
        console.log(error)
    }              
});

app.get('/student_details',async(req,res) =>{
    let userid = req.query.studentid;

    try {
        let sql = `Select CONCAT('StudentId',' ',student_Id) as student_Id,CONCAT(name,' ',surname) as name from student_master where student_Id = ${userid}`
        const [result] = await db.query(sql);

        let sql1 = `select student_subject_master.name, sum(if(exam_type = "T",obtained_practical_marks,0))as prac1,sum(if (exam_type = "T",obtained_theory_marks,0)) as theory1,
            sum(if(exam_type = "P",obtained_practical_marks,0))as prac2,sum(if (exam_type = "P",obtained_theory_marks,0)) as theory2,
            sum(if(exam_type="E",obtained_practical_marks,0)) as prac3,sum(if(exam_type="E",obtained_theory_marks,0)) as theory3 from student_exam join student_subject_master on student_exam.subject_Id = student_subject_master.subject_Id and student_subject_master.subject_Id=1 
            join student_master on student_exam.student_Id = student_master.student_Id and student_master.student_Id = ${userid} group by student_subject_master.subject_Id;`
        const [result2] = await db.query(sql1);

        let sql2 = `select student_subject_master.name, sum(if(exam_type = "T",obtained_practical_marks,0))as prac1,sum(if (exam_type = "T",obtained_theory_marks,0)) as theory1,
                sum(if(exam_type = "P",obtained_practical_marks,0))as prac2,sum(if (exam_type = "P",obtained_theory_marks,0)) as theory2,
                sum(if(exam_type="E",obtained_practical_marks,0)) as prac3,sum(if(exam_type="E",obtained_theory_marks,0)) as theory3 from student_exam join student_subject_master on student_exam.subject_Id = student_subject_master.subject_Id and student_subject_master.subject_Id=2
                join student_master on student_exam.student_Id = student_master.student_Id and student_master.student_Id = ${userid} group by student_subject_master.subject_Id;`
        const [result3] = await db.query(sql2);

        let sql3 = `select student_subject_master.name, sum(if(exam_type = "T",obtained_practical_marks,0))as prac1,sum(if (exam_type = "T",obtained_theory_marks,0)) as theory1,
        sum(if(exam_type = "P",obtained_practical_marks,0))as prac2,sum(if (exam_type = "P",obtained_theory_marks,0)) as theory2,
        sum(if(exam_type="E",obtained_practical_marks,0)) as prac3,sum(if(exam_type="E",obtained_theory_marks,0)) as theory3 from student_exam join student_subject_master on student_exam.subject_Id = student_subject_master.subject_Id and student_subject_master.subject_Id=3
        join student_master on student_exam.student_Id = student_master.student_Id and student_master.student_Id = ${userid} group by student_subject_master.subject_Id;`
        const [result4] = await db.query(sql3);

        let sql4 = `select student_subject_master.name, sum(if(exam_type = "T",obtained_practical_marks,0))as prac1,sum(if (exam_type = "T",obtained_theory_marks,0)) as theory1,
        sum(if(exam_type = "P",obtained_practical_marks,0))as prac2,sum(if (exam_type = "P",obtained_theory_marks,0)) as theory2,
        sum(if(exam_type="E",obtained_practical_marks,0)) as prac3,sum(if(exam_type="E",obtained_theory_marks,0)) as theory3 from student_exam join student_subject_master on student_exam.subject_Id = student_subject_master.subject_Id and student_subject_master.subject_Id=4
        join student_master on student_exam.student_Id = student_master.student_Id and student_master.student_Id = ${userid} group by student_subject_master.subject_Id;`
        const [result5] = await db.query(sql4);

        let sql5 = `select student_subject_master.name, sum(if(exam_type = "T",obtained_practical_marks,0))as prac1,sum(if (exam_type = "T",obtained_theory_marks,0)) as theory1,
        sum(if(exam_type = "P",obtained_practical_marks,0))as prac2,sum(if (exam_type = "P",obtained_theory_marks,0)) as theory2,
        sum(if(exam_type="E",obtained_practical_marks,0)) as prac3,sum(if(exam_type="E",obtained_theory_marks,0)) as theory3 from student_exam join student_subject_master on student_exam.subject_Id = student_subject_master.subject_Id and student_subject_master.subject_Id=5
        join student_master on student_exam.student_Id = student_master.student_Id and student_master.student_Id = ${userid} group by student_subject_master.subject_Id;`
        const [result6] = await db.query(sql5);

        let sql6 = `select student_subject_master.name, sum(if(exam_type = "T",obtained_practical_marks,0))as prac1,sum(if (exam_type = "T",obtained_theory_marks,0)) as theory1,
        sum(if(exam_type = "P",obtained_practical_marks,0))as prac2,sum(if (exam_type = "P",obtained_theory_marks,0)) as theory2,
        sum(if(exam_type="E",obtained_practical_marks,0)) as prac3,sum(if(exam_type="E",obtained_theory_marks,0)) as theory3 from student_exam join student_subject_master on student_exam.subject_Id = student_subject_master.subject_Id and student_subject_master.subject_Id=6
        join student_master on student_exam.student_Id = student_master.student_Id and student_master.student_Id = ${userid} group by student_subject_master.subject_Id;`
        const [result7] = await db.query(sql6);

        let sql7 = `select concat(round((sum(obtained_practical_marks + total_theory_marks)/300*100),2),'%') as result from student_exam where student_Id = ${userid} and exam_type = "T"`;
        const [result8] = await db.query(sql7);

        let sql8 = `select concat(round((sum(obtained_practical_marks + total_theory_marks)/300*100),2),'%') as result from student_exam where student_Id = ${userid} and exam_type = "P"`;
        const [result9] = await db.query(sql8);

        let sql9 = `select concat(round((sum(obtained_practical_marks + total_theory_marks)/600*100),2),'%') as result from student_exam where student_Id = ${userid} and exam_type = "E"`;
        const [result10] = await db.query(sql9);

        let sql10 = `select concat(round((sum(obtained_practical_marks + total_theory_marks)/1200*100),2),'%') as result from student_exam where student_Id = ${userid}`;
        const [result11] = await db.query(sql10);


        let users = {};
        users.student_Id = result[0].student_Id;
        users.name = result[0].name;
        users.prac1 = result2[0].prac1;
        users.theory1 = result2[0].theory1;
        users.prac2 = result2[0].prac2;
        users.theory2 = result2[0].theory2;
        users.prac3 = result2[0].prac3;
        users.theory3 = result2[0].theory3;
        users.prac4 = result3[0].prac1;
        users.theory4 = result3[0].theory1;
        users.prac5 = result3[0].prac2;
        users.theory5 = result3[0].theory2;
        users.prac6 = result3[0].prac3;
        users.theory6 = result3[0].theory3;
        users.prac7 = result4[0].prac1;
        users.theory7 = result4[0].theory1;
        users.prac8 = result4[0].prac2;
        users.theory8 = result4[0].theory2;
        users.prac9 = result4[0].prac3;
        users.theory9 = result4[0].theory3;
        users.prac10 = result5[0].prac1;
        users.theory10 = result5[0].theory1;
        users.prac11 = result5[0].prac2;
        users.theory11 = result5[0].theory2;
        users.prac12 = result5[0].prac3;
        users.theory12 = result5[0].theory3;
        users.prac13 = result6[0].prac1;
        users.theory13 = result6[0].theory1;
        users.prac14 = result6[0].prac2;
        users.theory14 = result6[0].theory2;
        users.prac15 = result6[0].prac3;
        users.theory15 = result6[0].theory3;
        users.prac16 = result7[0].prac1;
        users.theory16 = result7[0].theory1;
        users.prac17 = result7[0].prac2;
        users.theory17 = result7[0].theory2;
        users.prac18 = result7[0].prac3;
        users.theory18 = result7[0].theory3;
        users.t_res = result8[0].result;
        users.p_res = result9[0].result;
        users.e_res = result10[0].result;
        users.f_res = result11[0].result;

        res.render('student_details',{users});

    } catch (error) {
        console.log(error);
    }
                        
})

let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})