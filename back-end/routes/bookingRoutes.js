const express=require('express')
const bookingRouter=express.Router()
const booking=require('../model/bookingSchema')
const CheckAuth=require('../middlewares/CheckAuth')
const loginDb=require('../model/LoginSchema')
let path = require('path');
const { default: mongoose } = require('mongoose')




bookingRouter.post('/add-booking',CheckAuth,(req,res)=>{
    const Data=new booking({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        bikename:req.body.bikename,
        bookingdate:req.body.bookingdate,
        deliveryDate:req.body.deliveryDate,
        userName:req.userData.userName,

    })
    Data.save()
    .then((Data)=>{
        return res.status(201).json({
            success:true,
            error:true,
            data:Data
        })
    })
    .catch((error)=>{
        return res.status(400).json({
            success:false,
            error:true,
            Message:"Booking is not added"
        }

        )
    })
})
bookingRouter.get('/view-booking',CheckAuth,(req,res)=>{
    booking.find()
    .then((data)=>{
        return res.status(201).json({
           success:true,
           error:false,
           data:data 
        })
    })
    .catch((err)=>{
        return res.status(400).json({
            success:false,
            error:true,
            Message:"Booking is not show"
        })
    })
})
bookingRouter.get('/user-booking', CheckAuth, (req, res) => {
  booking.aggregate([
    {
      $match: {
        userName: req.userData.userName,
      },
    },
    {
      $project: {
        _id: 1, // Include the _id field if needed
        name:1,
        email:1,
        phone:1,
        bikename: 1,
        bookingdate: 1,
        status:1,
        deliveryDate: 1,
      },
    },
  ])
    .then((data) => {
      return res.status(201).json({
        success: true,
        error: false,
        data: data,
      });
    })
    .catch((err) => console.log(err));
});

bookingRouter.put('/reject-booking/:id', (req, res) => {
  const bookingId = req.params.id;

  booking.findByIdAndUpdate(
    bookingId,
    { status: 'rejected' }, 
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          success: false,
          error: true,
          message: 'Booking not found',
        });
      }
      return res.status(200).json({
        success: true,
        error: false,
        data: data,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'Booking rejection failed',
      });
    });
});

// Add route to approve a booking
bookingRouter.put('/approve-booking/:id', (req, res) => {
  const bookingId = req.params.id;

  booking.findByIdAndUpdate(
    bookingId,
    { status: 'approved', deliveryDate: new Date() }, 
    { new: true }
  )
    .then((data) => {
      if (!data) {
        return res.status(404).json({
          success: false,
          error: true,
          message: 'Booking not found',
        });
      }
      return res.status(200).json({
        success: true,
        error: false,
        data: data,
      });
    })
    .catch((err) => {
      return res.status(400).json({
        success: false,
        error: true,
        message: 'Booking approval failed',
      });
    });
});


module.exports=bookingRouter;


