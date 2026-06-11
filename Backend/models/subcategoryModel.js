const mongoose=require('mongoose')

const subCategorySchema=new mongoose.Schema({

    categoryId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'categories'
    },

    subCategoryName:{
        type:String,
        required:true
    }

})

module.exports=mongoose.model('subcategories',subCategorySchema)