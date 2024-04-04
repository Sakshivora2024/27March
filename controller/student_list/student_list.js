const db = require("../../database/mysql");

const student_list = async (req,res) =>{
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
}

module.exports = {student_list}