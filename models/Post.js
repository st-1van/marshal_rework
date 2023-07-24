import mongoose from 'mongoose';

var postSchema = new mongoose.Schema({
    text: String,
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car'
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    urgency: {
      type: String,
      enum: ['терміново', 'важливо', 'неважливо'],
      required: true,
    },
    problem: []
  }, { timestamps: true }
  );
  
  export default mongoose.model('Post', postSchema);
