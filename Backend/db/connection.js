const mongoose = require('mongoose')

mongoose.connect(process.env.CONNECTION_STRING)
.then(()=>{
    console.log("Mongo Connected")
})
.catch(err=>{
    console.log(err)
})