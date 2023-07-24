const mongoose = require('mongoose');

var carSchema = new mongoose.Schema({
    brand: String,
    carNumber:{
      type:String,
      required:true,
      unique: true,
    } ,
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    company: {
      type: String,
      enum: ['Marshal Trans', 'Marshal UA'],      
    },
    posts: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post'
    }],
  
  },{
    timestamps:true,
});


module.exports = mongoose.model('Car', carSchema);