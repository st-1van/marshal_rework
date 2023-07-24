const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    role:String,
    fName: {
        type:String,
        required:true,
      },
      sName: {
        type:String,
        required:true,
      },
      email:{
        type:String,
        required:true,
        unique: true,
      } ,
      phone: String,
      passwordHash: {
          type:String,
          required:true,
        },
      company: {
        type: String,
        enum: ['Marshal Trans', 'Marshal UA'],
      },
      car: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Car'
      },
      posts: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Post'
      }],
    },{
      timestamps:true,
  });

module.exports = mongoose.model('User', UserSchema);