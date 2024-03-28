const arr = [
    {a:'1',b:'2',c:'3'},
    {a:'4',b:'2',c:'5'},
    {a:'6',b:'7',c:'8'},
];

// let key = 'b';

const group = (arr,key) =>{
    let obj = {};
    
    arr.forEach((res) => {
        
        if(Object.keys(obj).indexOf(res[key]) == -1){
            obj[res[key]] = [];
        }
        let temp = {};

        Object.keys(obj).forEach(item =>{
            if(item.localeCompare(key) != 0){
                temp[item] =res[item];
            }
        });

        obj[res[key]].push(temp);
    });

    
    return obj;
    
}

let key = 'b';
let result = group(arr,key);
console.log(result);