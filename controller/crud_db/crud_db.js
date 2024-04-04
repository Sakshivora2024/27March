const db = require("../../database/mysql");

const frm_get = (req,res) =>{
    res.render('crud_db/form');
}

const frm_post = async (req,res) =>{
    
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


}

const list = async (req,res) =>{
    let sql = `select * from userdb`;
    const [users] = await db.query(sql);
    res.render('crud_db/list',{users})
    
}

const userdetail = async (req,res) =>{
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
    
}
module.exports = {frm_get,frm_post,list,userdetail}