import jwt from "jsonwebtoken";
import bcrypt from 'bcrypt';
import UserModel from '../models/User.js'
import ManagerModel from "../models/Manager.js";

export const addUser = async (req, res)=>{
    try {
    
        const password = req.body.password;
        const salt = await bcrypt.genSalt(process.env.SALT);
        const hash = await bcrypt.hash(password,salt)
    
        const doc = new UserModel({
            role:'driver',
            fName:req.body.fName,
            sName:req.body.sName,
            phone:req.body.phone,
            company:req.body.company,
            car:null,
            email:req.body.email, 
            passwordHash:hash,
            posts:[],            
        })
        
        const user = await doc.save();
        
        const token = jwt.sign({
            _id:user._id,
        }, process.env.SECRET,
        {
            expiresIn:'30d',
        }
        );

        const {passwordHash, ...userData}= user._doc;

        res.json({
            userData,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'не вдалося зареєструватися'
        })
    }       
}

export const login = async (req,res)=>{
    try {
        /* const user = await UserModel.findOne({email:req.body.email}); */
        const user = await UserModel.findOne({ email: req.body.email }) || await ManagerModel.findOne({ email: req.body.email });

        if(!user){
            return res.status(403).json({
                message:'неправильний пароль або email'
            });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user._doc.passwordHash)
        
        if (!isValidPass){
            return res.status(403).json({
                message:'неправильний пароль або email'
            })
        }

        const token = jwt.sign({
            _id:user._id,
        }, process.env.SECRET,
        {
            expiresIn:'30d',
        }
        );

        
        const {passwordHash, ...userData}= user._doc;

        res.json({
            ...userData,
            token
        })
        

    } catch (error) {
        console.log(error)
        res.status(403).json({
            message:'помилка авторизації'
        })
    }
}

export const checkUser = async(req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user){
            return res.status(404).json({
                message:"користувач не знайдений"
            })
        }

        const {passwordHash, ...userData}= user._doc;


        res.json(userData)
    } catch (error) {
        console.log(error)
        res.status(403).json({
            message:'помилка доступу'
        })        
    }
}

export const addManager = async (req, res)=>{
    try {
    
        const password = req.body.password;
        const salt = await bcrypt.genSalt(process.env.SALT);
        const hash = await bcrypt.hash(password,salt)
    
        const doc = new ManagerModel({
            role:'manager',
            fName:req.body.fName,
            sName:req.body.sName,
            phone:req.body.phone,
            company:req.body.company,
            email:req.body.email, 
            passwordHash:hash,            
        })
        
        const manager = await doc.save();
        
        const token = jwt.sign({
            _id:manager._id,
        }, process.env.SECRET,
        {
            expiresIn:'30d',
        }
        );

        const {passwordHash, ...managerData}= manager._doc;

        res.json({
            managerData,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'не вдалося зареєструватися'
        })
    }       
}