const express=require('express')
const app=express()
const cors=require('cors')
require('dotenv').config()


const mongoose=require('mongoose')
const bikerouter=require('./routes/bikeRoutes') 
const bookingRouter=require('./routes/bookingRoutes')
const LoginRouter=require('./routes/LoginRouter')
const RegisterRouter=require('./routes/RegisterRouter')
const CheckAuth = require('./middlewares/CheckAuth')
const verifyAccess = require('./middlewares/verifyAccess')



app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{console.log("database connected")})
.catch((err)=>console.log(err))

app.use("/api/bike",bikerouter)
app.use("/api/booking",bookingRouter)
app.use("/api/login",LoginRouter)
app.use("/api/register",RegisterRouter)


app.get('/',()=>{
    res.send("server is started")
})
app.get('/check',CheckAuth,verifyAccess,(req,res)=>{
    res.send("this is authentication testing")
})

app.listen(process.env.PORT,function(){
    console.log("server started")
})
