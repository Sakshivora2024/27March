const jwt = require('jsonwebtoken');

const checkAuthentication = (req,res,next) =>{
    let accessTK = process.env.ACCESS_TOKEN_SECRET;
    try {
        let token = req.cookies.jwt;
        // console.log(token);
        
        const verified = jwt.verify(token,accessTK);
        
        if(verified){
            next()
        }
        else{
            return res.render("login",{error:"Page not found"})
        }
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    checkAuthentication
}