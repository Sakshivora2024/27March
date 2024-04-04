const logout = (req,res)=>{
    res.clearCookie("jwt").status(200).redirect("/login");
}

module.exports = {logout}