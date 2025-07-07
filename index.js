const express=require("express");
const app=express();
 const db=require('./db')
 require('dotenv').config();
 const person=require('./models/person')
 const passport=require("passport");
 const localstrategy=require('passport-local').Strategy
 const bodyparser=require("body-parser")
 app.use(bodyparser.json());
 const port=process.env.PORT||3000
 const logrequest=(req,res,next)=>{
console.log(`[${new Date().toLocaleString()}] request made to: ${req.originalUrl}`);
 next();
 }
 app.use(logrequest);
 passport.use(new localstrategy(async(USERNAME,password,done)=>{
    try {
        console.log("recieved credential",USERNAME,password);
        const user= await person.findOne({username:USERNAME});
        if(!user)
            return done(null,false,{message:'incorrect username'});
            const ispasswordmatch= await user.comparepassword(password)
            if(ispasswordmatch){
                return done(null,user);
            }
            else {
                return done(null,false,{message:'incorrect password.'})
            }
        
    } catch (error) {
        return done(error);
    }
 }))
 app.use(passport.initialize())
const localAuthmiddleware=passport.authenticate('local',{session:false});

app.get('/' ,localAuthmiddleware,(req,res)=>{
    res.send("welcome to our hotels");
})

const personroutes=require('./routes/personRoutes')
const menuroutes=require('./routes/menuitemRoutes')
app.use('/menu',localAuthmiddleware,menuroutes);
app.use('/person',localAuthmiddleware,personroutes)

app.listen(port,(req,res)=>{
    console.log("this is installed at 3000")
});

