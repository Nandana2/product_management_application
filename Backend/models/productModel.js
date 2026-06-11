const mongoose=require('mongoose')

const productSchema=new mongoose.Schema({

    title:{
        type:String,
        required:true
    },

    description:String,

    subCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'subcategories'
    },

    image:[String],

    variants:[
        {
            ram:String,
            price:Number,
            qty:Number
        }
    ]

},{timestamps:true})

module.exports=mongoose.model('products',productSchema)