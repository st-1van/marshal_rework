const mongoose = require('mongoose');

var carLogSchema = new mongoose.Schema({
  
    type: {
      type: String,
      enum: ['приймаю', 'здаю'],
      required: true
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Car',
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    outLook: {
      front: String,
      right: String,
      left: String,
      back: String,
      salon: [],
      rating: [{
        type: Number,
        min: 1,
        max: 10
      }],
      note: String,
    },
    techConditions: {
      panel: String,
      oil: String,
      breaks: String,
  
    },
    tyreConditions: {
      fTyreRating: [{
        type: Number,
        min: 1,
        max: 10
      }],
      bTyreRating: [{
        type: Number,
        min: 1,
        max: 10
      }],
      outerDefects: [],
      tyreDefects: [],
      tNote: String,
    },
    docComplectation: {
      fuelCardDKV: Boolean,
      fuelCardTankPull: Boolean,
      licence: Boolean,
      sign: Boolean,
      techPasport: Boolean,
    },
    inventory: {
      crabs: Boolean,
      instrument1: Boolean,
    },
  }, { timestamps: true }
  );

module.exports = mongoose.model('CarLog', carLogSchema);