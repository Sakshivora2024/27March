const db = require("../../database/mysql");

const getForm = (req,res) =>{
    res.render("form",{submit:'',id:0});
}

const postForm = (req,res) =>{
    let data = req.body;
    console.log(data);

    let insert_details = async()=>{
        try {
            let sql = `insert into employee_details(firstname,lastname,designation,email,phoneno,gender,relationship_status,address1,address2,city,state,zipcode,dateofbirth) values(?,?,?,?,?,?,?,?,?,?,?,?,?)`;
            const result = await db.query(sql,[data.firstname,data.lastname,data.designation,data.email,data.phoneno,data.gender,data.relationship_status,data.address1,data.address2,data.city,data.state,data.zipcode,data.dateofbirth]);
            const employee_Id = result[0].insertId;

            
                var work1 = [data.education,data.nameOfboard_course,data.passingyear,data.percentage];
                var keys1 = ["education","board_course","passingyear","percentage"];
                
                function obj(work, keys) {
                    let arr = [];
                    for (let i = 0; i < work[0].length; i++) {
                        let obj1 = {};
                        for (j = 0; j < keys.length; j++)
                            obj1[keys[j]] = work[j][i];
                        arr.push(obj1);
        
                    }
                    return arr;
                }
        
                let arr = obj(work1,keys1);
           
                arr.forEach( async (ele )=>{
                    let sql1 = `insert into educational_master(employee_Id,education,nameofboard_course,passingyear,percentage) values(?,?,?,?,?)`;
                    const data = await db.query(sql1,[employee_Id,ele.education,ele.board_course,ele.passingyear,ele.percentage]);
                    
                })

                var work = [data.company_name,data.desig,data.date_from,data.date_to];
                var keys = ["company_name","designation","date_from","date_to"];
                function obj2(work, keys) {
                    let arr = [];
                    for (let i = 0; i < work[0].length; i++) {
                        let obj1 = {};
                        for (j = 0; j < keys.length; j++)
                            obj1[keys[j]] = work[j][i];
                        arr.push(obj1);
            
                    }
                    return arr;
                }
               let arr1 = obj2(work,keys);
        
                arr1.forEach( async (ele )=>{
                    let sql1 = `insert into work_experience(employee_Id,company_name,designation,date_from,date_to) values(?,?,?,?,?)`;
                    const data = await db.query(sql1,[employee_Id,ele.company_name,ele.designation,ele.date_from,ele.date_to]);
                    
                })
                data.lang.forEach( async (ele )=>{
                    let sql1 = `insert into language_master(employee_Id,language,is_read,is_write,is_speak) values(?,?,?,?,?)`;
                    const data = await db.query(sql1,[employee_Id,ele.language,ele.is_read,ele.is_write,ele.is_speak]);
                    
                })

                var work2 = [data.php_tech_level,data.mysql_tech_level,data.laravel_tech_level,data.oracle_tech_level];
                var keys2 = ["tech_level"];
               
                function obj4(work, keys) {
                    let arr = [];
                    for (let i = 0; i < work.length; i++) {
                        let obj1 = {};
                            obj1[keys] = work[i];
                        arr.push(obj1);

                    }
                    return arr;
                }

                let arr3 = obj4(work2,keys2);
            
                let technology = [data.php_technology,data.mysql_technology,data.laravel_technology,data.oracle_technology];
                let key = ["technology"]
                arr3.forEach((obj,idx) =>{
                    obj[key] = technology[idx];
                })
                

                arr3.forEach( async (ele )=>{
                    let sql1 = `insert into technology_master(employee_Id,technology,tech_level) values(?,?,?)`;
                    const data = await db.query(sql1,[employee_Id,ele.technology,ele.tech_level]);
                    
                })

                data.ref.forEach( async (ele )=>{
                    let sql1 = `insert into reference_contact(employee_Id,name,contactNo,relation) values(?,?,?,?)`;
                    const data = await db.query(sql1,[employee_Id,ele.name,ele.contactNo,ele.relation]);
                   
                })

                let location = data.location;
                let key1 = ["location"]
                data.pref.forEach((obj,idx) =>{
                    obj[key1] = location.join(",");
                })

                data.pref.forEach( async (ele )=>{
                    let sql1 = `insert into prefernce(employee_Id,location,notice_period,expected_ctc,current_ctc,department) values(?,?,?,?,?,?)`;
                    const data = await db.query(sql1,[employee_Id,ele.location,ele.notice_period,ele.expected_ctc,ele.current_ctc,ele.department]);
                   
                })
                
            return true;
        } catch (error) {
            console.log(error);
        }
    }
    insert_details();
    res.send("Data inserted successfully")
}

const display = (req,res) =>{
    // db.query("select * from employee_details",function(err,result){
    //     res.render("display",{result});
    // })
    let display = async () =>{
        const [result] = await db.query(`Select * from employee_details`);
        console.log(result);
        res.render("display",{result});
    }
    display();
}

const update_get = (req,res)=>{
    let id = req.params.id;
    console.log(id);
    res.render("form",{submit:"Update",id:id})
}

const fetch = async (req,res) =>{
    let id = req.params.id;
    try {
        let sql = `select * from employee_details where id = ?`;
        let [emp] = await db.query(sql,[id]);
        // console.log(emp);

        let sql1 = `select * from educational_master where employee_Id = ?`;
        let [edu] = await db.query(sql1,[id]);
        // console.log(edu);
        let sql2 = `select * from work_experience where employee_Id = ?`;
        let [work_exp] = await db.query(sql2,[id]);
        // console.log(work_exp);
        let sql3 = `select * from language_master where employee_Id = ?`;
        let [lang] = await db.query(sql3,[id]);
        // console.log(lang);
        let sql4 = `select * from technology_master where employee_Id = ?`; 
        let [tech] = await db.query(sql4,[id]);
        // console.log(tech);
        let sql5 = `select * from reference_contact where employee_Id = ?`;
        let [ref] = await db.query(sql5,[id]);
        // console.log(ref);
        let sql6 = `select * from prefernce where employee_Id = ?`;
        let [pref] = await db.query(sql6,[id]);
        // console.log(pref);

        let result = [emp,edu,work_exp,lang,tech,ref,pref];
        console.log(result); 
        res.json(result);
    } catch (error) {
        console.log(error);
    }
}

const update_post = (req,res) =>{
    let id = req.params.id;
    var data = req.body;
    console.log(id);   
    console.log(data);
    let update_data = async () =>{
        try {
            let sql = `update employee_details set firstname = ? , lastname = ?, designation = ?, email = ?, phoneno = ?,gender = ?,relationship_status = ?,address1 = ?,address2 = ?,city = ?,state = ?,zipcode = ?, dateofbirth = ? where id = ?`;
            const result = await db.query(sql,[data.firstname,data.lastname,data.designation,data.email,data.phoneno,data.gender,data.relationship_status,data.address1,data.address2,data.city,data.state,data.zipcode,data.dateofbirth,id]);
            console.log(sql);

            var work1 = [data.education,data.nameOfboard_course,data.passingyear,data.percentage];
            var keys1 = ["education","board_course","passingyear","percentage"];
            
            function obj(work, keys) {
                let arr = [];
                for (let i = 0; i < work[0].length; i++) {
                    let obj1 = {};
                    for (j = 0; j < keys.length; j++)
                        obj1[keys[j]] = work[j][i];
                    arr.push(obj1);
    
                }
                return arr;
            }
    
            let arr = obj(work1,keys1);
            let [edu] = await db.query(`select education from educational_master where employee_Id = ?`,[id]);
            console.log(edu);

            let sql1 = `delete from educational_master where employee_Id = ?`;
            const result1 = await db.query(sql1,[id]);
            
            arr.forEach( async (ele )=>{
                let sql1 = `insert into educational_master(employee_Id,education,nameofboard_course,passingyear,percentage) values(?,?,?,?,?)`;
                const result1 = await db.query(sql1,[id,ele.education,ele.board_course,ele.passingyear,ele.percentage]);
                
            })

            var work = [data.company_name,data.desig,data.date_from,data.date_to];
            var keys = ["company_name","designation","date_from","date_to"];
            function obj2(work, keys) {
                let arr = [];
                for (let i = 0; i < work[0].length; i++) {
                    let obj1 = {};
                    for (j = 0; j < keys.length; j++)
                        obj1[keys[j]] = work[j][i];
                    arr.push(obj1);
        
                }
                return arr;
            }
           let arr1 = obj2(work,keys);
    

           let sql2 = `delete from work_experience where employee_Id = ?`;
                const result2 = await db.query(sql2,[id]);
            arr1.forEach( async (ele )=>{

                

                let sql1 = `insert into work_experience(employee_Id,company_name,designation,date_from,date_to) values(?,?,?,?,?)`;
                const result1 = await db.query(sql1,[id,ele.company_name,ele.designation,ele.date_from,ele.date_to]);
                
            })

            data.lang.forEach( async (ele )=>{
                let sql = `update language_master set is_read = ?,is_write = ? , is_speak = ? where language = ? and employee_Id = ?`;
                const result = await db.query(sql,[ele.is_read,ele.is_write,ele.is_speak,ele.language,id]);
            })

            var work2 = [data.php_tech_level,data.mysql_tech_level,data.laravel_tech_level,data.oracle_tech_level];
            var keys2 = ["tech_level"];
           
            function obj4(work, keys) {
                let arr = [];
                for (let i = 0; i < work.length; i++) {
                    let obj1 = {};
                        obj1[keys] = work[i];
                    arr.push(obj1);

                }
                return arr;
            }

            let arr3 = obj4(work2,keys2);
        
            let technology = [data.php_technology,data.mysql_technology,data.laravel_technology,data.oracle_technology];
            let key = ["technology"]
            arr3.forEach((obj,idx) =>{
                obj[key] = technology[idx];
            })
            

            arr3.forEach( async (ele )=>{

                let sql = `update technology_master set technology = ?, tech_level = ? where technology = ? and employee_Id = ?`;
                const result = await db.query(sql,[ele.technology,ele.tech_level,ele.technology,id]);       
                
            })
           
            let location = data.location;
            let key1 = ["location"]
            data.pref.forEach((obj,idx) =>{
                obj[key1] = location.join(",");
            })

            let sql3 = `delete from reference_contact where employee_Id = ?`;
                const result3 = await db.query(sql3,[id]);
            data.ref.forEach( async (ele )=>{

                
                let sql1 = `insert into reference_contact(employee_Id,name,contactNo,relation) values(?,?,?,?)`;
                const result1 = await db.query(sql1,[id,ele.name,ele.contactNo,ele.relation]);
               
            })

            data.pref.forEach( async (ele )=>{
                let sql1 = `update prefernce set location = ?,notice_period = ?,expected_ctc = ?,current_ctc = ?,department = ? where employee_Id = ?`;
                const result = await db.query(sql1,[ele.location,ele.notice_period,ele.expected_ctc,ele.current_ctc,ele.department,id]);
               
            })
    
            res.send("Data Updated"); 
        } catch (error) {
            console.log(error);
        }
        
    }
    update_data();
    
}

module.exports = {getForm,postForm,display,update_get,fetch,update_post}