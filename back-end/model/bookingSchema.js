const mongoose=require('mongoose')
const bookingSchema=new mongoose.Schema({
   name:{
    type:String,
    required:true,
   } ,
   email:{
    type:String,
    required:true,
   },
   phone:{
    type:Number,
    required:true,
   },
   bikename:{
    type:String,
    required:true,
   },
   bookingdate:{
    type:Date,
    required:true,
   },
   userName: {
      type: String, 
      required: true, 
    },
   status:{
      type:String,
      default:"pending",   
},
deliveryDate: {
   type: Date, 
 },
})
module.exports=mongoose.model('booking', bookingSchema)