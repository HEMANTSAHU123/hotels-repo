const express=require("express");
const app=express();
 const db=require('./db')
 const bodyparser=require("body-parser")
 app.use(bodyparser.json());
app.get('/',(req,res)=>{
    res.send("welcome to our hotels");
})

const personroutes=require('./routes/personRoutes')
const menuroutes=require('./routes/menuitemRoutes')
app.use('/menu',menuroutes);
app.use('/person',personroutes)
app.listen(3000,(req,res)=>{
    console.log("this is installed at 3000")
});

