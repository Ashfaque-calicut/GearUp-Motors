const mongoose = require('mongoose');
const Schema = mongoose.Schema; //schema definition

const RegisterSchema = new Schema({
  login_id: { type: Schema.Types.ObjectId, ref: 'login_tb', required: true },
  name:{type:String, required:true},
  email: { type: String, required: true },
  phone:{type:String, required:true},
  role: { type: Number, required: true }
});

var Registerdata = mongoose.model('register_tb', RegisterSchema); //model creation
module.exports = Registerdata;
