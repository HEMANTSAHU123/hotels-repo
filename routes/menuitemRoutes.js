const express=require("express");
const route=express.Router();
const menuitem=require('./../models/menu');


route.post('/',async(req,res)=>{
    try {
        const data=req.body;
        const newmenu=new menuitem(data);
        const response=await newmenu.save();
        console.log('data saved');
        res.status(200).json(response);

        
    } catch (error) {
        console.log(error);
        res.status(500).json({error:"enternal server error"})
        
    }
})

route.get('/',async(req,res)=>{
    try {
        const data=await menuitem.find();
        console.log("data saved");
         res.status(500).json(data)
        
    } catch (error) {
         console.log(error);
        res.status(500).json({error:"enternal server error"})
    }
})
 module.exports=route
 