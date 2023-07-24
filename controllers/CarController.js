import CarModel from '../models/Car.js'

export const addCar = async (req, res)=>{
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

export const deleteCar = async (req,res)=>{
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