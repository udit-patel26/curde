const mongoose = require('mongoose')


const CategorySchema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        unique:true,
        required:true
    }
},{
    timestamps:true
})



const Category= mongoose.model("Category",CategorySchema)

module.exports=Category