const express = require("express");

const bodyParser = require('body-parser');

const route = require("./routes/index")
const dotenv = require('dotenv');
const cookie_parser = require('cookie-parser');
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
dotenv.config()
app.set('view engine', 'ejs');  
app.use(express.static('public'));
app.use(cookie_parser());

app.use(route)

let port = process.env.PORT || 3000;
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})
