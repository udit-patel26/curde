const mongoose = require('mongoose')

const ProductSchema = new mongoose.Schema({
    product_id:{
        type:String,
        unique:true,
        trim:true,
        required:true,

    },
    title:{
        type:String,
        unique:true,
        trim:true
    },
    price:
    {
        type:Number,
        trim:true,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
   
    category:{
        type:String,
        required:true,
    },
    checked:{
        type:Boolean,
        default:false,
    },
    sold:{
        type:Boolean,
        default:false
    }
},{
    timestamps:true
})

const Product = mongoose.model('Products',ProductSchema)


module.exports=Product