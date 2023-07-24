import mongoose from "mongoose";

const ManagerSchema = new mongoose.Schema({
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
    },{
      timestamps:true,
  });

export default mongoose.model('Manager', ManagerSchema);