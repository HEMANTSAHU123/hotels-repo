const express=require('express');
const router=express.Router()
const person=require('./../models/person');
const { findByIdAndUpdate } = require('../models/menu');

router.post('/',async(req,res)=>{
    try{
    const data=req.body
    const newperson=new person(data);
    const response= await newperson.save();
console.log("data saved");
res.status(200).json(response);
}
catch(error){
    console.log(error);
    res.status(500).json({error:"enternal server error"})
}
})
router.get('/',async(req,res)=>{
    try {
        const data =await person.find();
           console.log("data saved");
         res.status(500).json(data)
        
    } catch (error) {
         console.log(error);
        res.status(500).json({error:"enternal server error"})
    }
})

router.post('/:workType',async(req,res)=>{
    try{

        const worktype=req.params.workType;
        if(worktype=='chef'||worktype=='manager'|| worktype=='waiter'){
            const response=await person.find({work:worktype})
            console.log('response fetched');
            res.status(200).json(response)
    }
else{
    res.status(500).json({error:'invalid work type'})
}
    }

catch(error){
    console.log(error);
        res.status(500).json({error:"enternal server error"})
}
    

})



router.put('/',async(req,res)=>{
    try{
const personid=req.params.id;
const updatedpersondata=req.body;
const response=await person.findByIdAndUpdate(personid,updatedpersondata,{
new:true,
runValidators:true
})
if(!response){
    return res.status(404).json(error,'person not found')
}
console.log('data updated');
res.status(200).json(response);

    }
    catch(error){
 console.log(error);
        res.status(500).json({error:"enternal server error"})
    }
})


router.delete('/',async(req,res)=>{
    try{
        const persinid=req.params.id;
        const response=await person.findByIdAndDelete(personid)
        if(!response){
            return res.status(404).json(err,'person not found');

        } 
        else{
            console.log('data deleted');
            res.status(200).json('data deleted successfully')
        }
    }
    catch(error){
console.log(error);
        res.status(500).json({error:"enternal server error"})
    }
})
module.exports=router