const mongoose=require("mongoose");
const bcrypt=require('bcrypt');
const personSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    age:{
        type:Number
    },
    work:{
        type:String,
        enum:['chef','waiter','manager'],
        required:true
    },
    mobile:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    address:{
        type:String,
        required:true
    },
    salary:{
        type:Number,
        required:true
    },
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }

})
personSchema.pre('save',async(next)=>{
    const person=this;
    //hash the password only if it hasbeen modified
    if(!person.isModified('person'))
    return next();

try {
    //password generation
    const salt=await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(person.password,salt);
    person.password=hashedpassword
    next();

    
} catch (error) {
    return next(error)
}
})
personSchema.method.comparepassword=async function(condidatepassword){
    try {
        const ismatch=await bcrypt.compare(condidatepassword,this.password);
        return ismatch
        
    } catch (error) {
        throw error
    }
} 
//prince-bcd78juilk
//login-agarwk
//dftrojiukjkhhsh->exact salt
//salt+agarwalk=hash->lkoiuhyhygtfrrtfddcvggjjg98iu0o65
const person=mongoose.model('person',personSchema)
module.exports=person