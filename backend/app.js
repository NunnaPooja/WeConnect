const express= require('express');
const cors =require("cors");
const app= express();
const mongoose =require('mongoose');
const {mongoUrl } = require("./keys");
const PORT =5000;
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
require('./models/models')
require('./models/post')


app.use(require("./routes/auth"))
app.use(require("./routes/createPost"))

mongoose.connect(mongoUrl);
mongoose.connection.on("connected",()=>{
console.log("successfully connected to mongo")
})
mongoose.connection.on("error",()=>{
console.log("unable to connect to mongodb")
})

app.listen(PORT, ()=> {console.log("server is running on"+" " +PORT)
})