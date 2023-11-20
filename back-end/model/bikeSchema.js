const mongoose=require('mongoose')
const bikeSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    description:{
        type:String,
        required:true,
    },
    price:{
        type:String,
        required:true,
    },
  
    image:{
        type:String,
        // require:true,
    }
});

module.exports=mongoose.model('bike',bikeSchema);