const db = require("../../database/mysql");

const dynamic = async (req,res) =>{

    const result = [];
    if(req.query.sql){
        let sql = req.query.sql;
        console.log()
        console.log(sql);
        let limit = 20;
        let page = req.query.page || 1;
        let offset = (page - 1) * limit;// calculation of offset

        console.log(sql.length);
        let str = `limit ${offset},${limit};` // limit string
        sql = sql.slice(0,-1);
        console.log();
        // let sql1 = sql.concat(str);
        console.log(sql);
        let obf = req.query.obf;// observation value
        let ord = req.query.ord;// order value
        if((obf && ord) == undefined){
            obf = 'student_Id';
            ord = 'asc';
        }
        let str1 = `order by ${obf} ${ord}`; // orderby string
        let sql1 = `${sql} ${str1} ${str}`;
      
        let [data] = await db.query(sql1);
        // main query
          
        // it is used to count total number of records
        let sq1 = `select count(*) as count from (${sql}) as subquery;`;
        let [result] = await db.query(sq1);
        console.log(result);
       
        let key = Object.keys(JSON.parse(JSON.stringify(data[0])));
        data = Object.values(JSON.parse(JSON.stringify(data)));
        let n = result[0].count; // to take value of particular record
        console.log(sql);
        console.log(sql.length);
        res.render('dynamic',{users:key,user:data,page:page,limit:limit,sql:sql1,offset:offset,n:n});
    }
    else{
        user=[]
        users=[];
        limit=0;
        page=1;
        sql = "/";
        n=0;
        res.render('dynamic',{result, users, user, limit, page,sql,n});
    }
    
}

module.exports = {dynamic}