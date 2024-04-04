const db = require("../../database/mysql");

const stud_result = async (req,res) =>{

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
}

const stud_details = async(req,res) =>{
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
                        
}

module.exports = {stud_result,stud_details}