const fs = require('fs');
const uuid = require('uuid');
const uniqueId = uuid.v4();
var filepath = __dirname + '/data.json';

const form_get = (req,res) =>{
    res.render('crud_fs/form');
}

const form_post = (req, res) => {
    let data = {uniqueId,...req.body};
    let userjson = fs.readFileSync(filepath,'utf-8');
    let users = JSON.parse(userjson);
    users.push(data);
    userjson = JSON.stringify(users);
    fs.writeFileSync(filepath,userjson,'utf-8');
    res.redirect('list');
    console.log(uniqueId);
    console.log(data);
}

const lists = (req,res) =>{
    const users = require(filepath);
    res.render('crud_fs/list',{users});
}

const userdetails = (req,res) =>{
    const users = require(filepath);

    users.forEach((users)=>{
        if(users["uniqueId"] == req.query["userid"])
        {
        res.render("crud_fs/userdetails", {users});
        }
    })
}

module.exports = {form_get,form_post,lists,userdetails}