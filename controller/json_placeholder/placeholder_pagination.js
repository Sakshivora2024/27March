const pagination = (req,res) =>{
    res.render("pagination");
}

const comment = (req,res)=>{
    res.render("comment");
}

module.exports = {pagination,comment}