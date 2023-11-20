const express=require('express')
const bikerouter=express.Router()
const bike=require('../model/bikeSchema')
const multer=require('multer')
const CheckAuth=require('../middlewares/CheckAuth')
const registerDB = require('../model/RegisterSchema');
let path = require('path');
const loginDb=require('../model/LoginSchema')
const { default: mongoose } = require('mongoose')


const storage=multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,'../front-end/public/images/');

    },
    filename:function(req,file,cb){
        cb(null,file.originalname);
    }
});
const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if(allowedFileTypes.includes(file.mimetype)) {
      cb(null, true);
  } else {
      cb(null, false);
  }
}

const uploads=multer({storage, fileFilter });

bikerouter.post('/add-bike',uploads.single("image"),(req,res)=>{
    console.log('name',req.body.name);
    const Data=new bike({
        name:req.body.name,
        description:req.body.description,
        price:req.body.price,
       
       image:req.file.filename,
    })

        Data.save()
        .then((Data)=>{
            // console.log('data added successfully')
            // res.send(Data)
            return res.status(201).json({
              success:true,
              error:false,
              data:Data

            })
        })
        .catch((error)=>{
            return res.status(400).json({
                success:false,
                error:true,
                Message:"Bike is not added"
            }

            )
        })
    })
    bikerouter.delete('/delete-bike/:id',(req,res)=>{
      bike.deleteOne({
        _id:req.params.id
      })
        .then((data)=>{
            return res.status(201).json({
                success:true,
                error:false,
                data:data
  
              })
        })
        .catch((error)=>{
            return res.status(400).json({
                success:false,
                error:true,
                Message:"Bike is not added"
            }

            )
        })
    })
    
    bikerouter.get('/singlebike-bike/:id',(req,res) => {
        bike.findOne({
            _id:req.params.id,
        })
        .then((data)=>{
            
            return res.status(201).json({
                success:true,
                error:false,
                data:data
  
              })
        })
        .catch((err) => {  return res.status(400).json({
            success:false,
            error:true,
            Message:"Bike is not added"
        }

        )});
    });
    bikerouter.get('/view-bike',(req,res)=>{
        bike.find()
        .then((data)=>{
            return res.status(201).json({
                success:true,
                error:false,
                data:data
  
              })
        })
        .catch((err) => {
            return res.status(400).json({
                success:false,
                error:true,
                Message:"Bike is not added"
            }

            )
        });
    }) ; 

 
    bikerouter.put('/update-bike/:id', uploads.single("image"), (req, res) => {
      bike.findOne({ _id: req.params.id })
          .then((data) => {
              if (!data) {
                  return res.status(404).json({
                      success: false,
                      error: true,
                      Message: "Bike not found"
                  });
              }
  
              data.name = req.body.name;
              data.description = req.body.description;
              data.price = req.body.price;
  
              if (req.file && req.file.filename) {
                  data.image = req.file.filename;
              }
  
              data.save()
                  .then(() => {
                      return res.status(201).json({
                          success: true,
                          error: false,
                          data: data
                      });
                  })
                  .catch((error) => {
                      return res.status(400).json({
                          success: false,
                          error: true,
                          Message: "Bike update failed"
                      });
                  });
          })
          .catch((error) => {
              return res.status(500).json({
                  success: false,
                  error: true,
                  Message: "Server error"
              });
          });
  });
  

    bikerouter.get('/admin-auth',CheckAuth,(req,res)=>{
        return res.status(200).json({
            success:true,
            error:false,
            data:req.userData
        })
    })
    bikerouter.get('/profile', CheckAuth,(req, res) => {
      
        loginDb.aggregate(
          [
            {
              '$lookup' : {
                'from':'register_tbs',
                'localField':'_id',
                'foreignField':'login_id',
                'as':'results'
              }
            },{
              $unwind:'$results',
            },
            
            {
              $match:{
                _id:new mongoose.Types.ObjectId(req.userData.userId)
              }
            },
            {
              $group :{
                _id:'$_id',
                name:{$first:'$results.name'},
                phone:{$first:'$results.phone'},
                email:{$first:'$results.email'},
                username:{$first:'$username'},
                password:{$first:'$password'},
                role:{$first:'$role'}
              }

            },
          ]
        )  .then((data)=>{
            return res.status(201).json({
                success:true,
                error:false,
                data:data[0]
  
              })
          })
          .catch((err)=>console.log(err))
        })
        bikerouter.put('/update-profile/:id', (req, res) => {
       registerDB.findOne({
        login_id:req.params.id,
       })
       .then((data)=>{
        (data.name=req.body.name),
        (data.email=req.body.email),
        (data.phone=req.body.phone);

        data.save()
        .then((data)=>{
          return res.status(201).json({
            success:true,
            error:false,
            data:data,
          })
        })
        .catch((error)=>{
          return res.status(400).json({
            success:false,
            error:true,
            message:"Profile is not updated",
          })
        })
       })
       .catch((error)=>{
        return res.status(400).json({
          success:false,
          error:true,
          message:"Profile is not updated, error", 
        })
       })
      })
        






module.exports= bikerouter;