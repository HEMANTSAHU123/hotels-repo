const mongoose=require("mongoose");
const menuschema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        requred:true
    },
    taste:{
        type:String,
        enum:['sweet','spicy','swear'],
        required:true
    },
    is_drinl:{
        type:Boolean,
        default:false
    },
    ingredients:{
        type:[String],
    default:[]
    },
    num_sales:{
        type:Number,
        default:0
    }

})
const menuitem=mongoose.model('menuitem',menuschema)
module.exports=menuitem;