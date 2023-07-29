const express = require("express")
const app = express()
require("dotenv").config({path:"./config/config.env"})
const port = process.env.port || 8000
const dbConnect = require("./config/dbConnect");
const Routes = require ("./routes/userRoutes");
const model = require ("./models/userModels");
 dbConnect();

 //middleware
app.use(express.json());

app.use("/api/users", Routes)





app.listen(port, ()=>{
    console.log(`server running on the port http://localhost:${port}`)
})