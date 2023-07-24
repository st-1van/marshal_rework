const { json } = require('express');
const CarModel = require('../models/Car.js');
const UserModel = require('../models/User.js')

const addCar = async (req, res)=>{
    try {
   
        const doc = new CarModel({
            brand:req.body.brand,
            carNumber:req.body.carNumber,
            company:req.body.company,
            user:null,
        })
        
        const car = await doc.save();

        res.json({car})

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'не вдалося додати авто'
        })
    }       
}

const deleteCar = async (req,res)=>{
    try {
        const car = await CarModel.findOneAndDelete({carNumber:req.body.carNumber});

        if (!car){
            return res.status(404).json({
                message:"автомобіль не знайдений"
            })
        }
        
        res.json({
            message:'success'
        })
    } catch (error) {
        console.log(error)
        res.status(403).json({
            message:'помилка доступу'
        })        
    }
}
const getAllCars = async (req,res)=>{
    try {
        const cars = await CarModel.find({ /* company:res.locals.driverCompany */ }).populate('user').exec();

        res.json(cars)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'не знайшли авто'
        })
    }  

}

const getFreeCars = async (req,res)=>{
    var carList = [];
    var carIdList = [];
    var carNumberList = [];

    CarModel.find({ driver: null, /* company:res.locals.driverCompany */ })
    .then(
      (foundCars) => {
        foundCars.forEach((car) => {
          carList.push(car.brand);
          carIdList.push(car._id);
          carNumberList.push(car.carNumber)
        });

        res.json({ carIdList, carList, carNumberList});
      })
    .catch((error) => {
        console.log(error)
        res.status(500).json({
            message:'не знайшли авто'
        })
    })
}

const takeCar = async (req,res)=>{
    CarModel.findOneAndUpdate({
        _id: req.body.carId
      },
        {
        user: req.userId,
        }).then(() => {
          console.log('car was taken, info is updated');
        }).catch((err) => {
        console.log('An error occurred:', err);
        return  res.status (500).json({
          message:'error with car updating'
        });
        });
  
    UserModel.findOneAndUpdate({
        _id: req.userId
      },
        {
          car: req.body.carId,
        }).then(() => {
          console.log('user has took the car, info is updated');
        }).catch((err) => {
            console.log('An error occurred:', err);
            return  res.status (500).json({
              message:'error with user updating'
            });
        });
    res.send(json(
        "data was update. Carlog is adding"
    ))
}

const dropCar = (req, res) => {
  
    CarModel.findOneAndUpdate(
      {
        _id: carId
      },
      {
        user: null,
      }
    )
      .then(()=>{
        console.log('car data is updated');  
      })
      .catch((err) => {
        console.log('An error occurred here:', err);
      });
  
    driverModel.findByIdAndUpdate(
      {
        _id: req.userId
      },
      {
        car: null
      }
    )
    .then(()=>{
      console.log('driver data is updated');  
    })
      .catch((err) => {
        console.log('An error occurred:', err);
      });
    
      res.send(json(
        "data was update. Carlog is adding"
    ))

  };


module.exports={deleteCar, addCar, getAllCars, getFreeCars, takeCar, dropCar};