const mongoose = require("mongoose");


const dbConnect = ()=>{
    mongoose.connect(process.env.DATABASE).then((res)=>{
console.log(`connection successfull ${res.connection.host}`)
    })
}
    
module.exports = dbConnect;