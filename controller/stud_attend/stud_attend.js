const db = require("../../database/mysql");

const stud_attend = async (req,res) =>{
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
} 

module.exports = {stud_attend}