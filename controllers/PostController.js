import PostModel from '../models/Post.js'
import UserModel from "../models/User.js"

import CarModel from "../models/Car.js";
//import sessionUserData from '../middleware/UserSessionData.js';
import upload from '../middleware/DiskStorage.js';
import { Result } from 'express-validator';

//тут не працює в інсомнії підвантаження одного або кількох файлів

export const createPost = async (req,res)=>{
    try {
        console.log('user is '+ req.userId)
        const post = new PostModel({
            text:req.body.text,
            urgency:req.body.urgency,
            problem:req.body.problem,
            user:req.userId,
            car:null,
        })

        const newPost = await post.save();

        postDataUpdate(req,res,newPost);        
        res.json({newPost});    

    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'не вдалося додати пост'
        })
    }  
}


const  postDataUpdate= (req,res,newPost)=> {  
    
    UserModel.findOneAndUpdate({
      _id: req.userId
    },
      {
        $push: { posts: newPost._id }
      }).then().catch((err) => {
        console.log('An error occurred:', err);
        return  res.statu (500).json({
          message:'error with user updating'
        });
      });

   /*  CarModel.findOneAndUpdate({
      _id: res.locals.carID
    },
      {
        $push: { posts: newPost._id }
      }).then().catch((err) => {
        console.log('An error occurred:', err);
        res.send("error with car updating");
      })     */
  };

export const getAllPosts = async(req,res)=>{
    try {
        const posts = await PostModel.find().populate('user').exec();

        res.json(posts)
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message:'не знайти статті'
        })
    }  
  }

export const getOne = async (req, res) => {
    try {
      const postId = req.params.id;
  
      const post = await PostModel.findById(postId).populate('user');
      
      if (!post) {
        return res.status(404).json({
          message: 'Post not found'
        });
      }
  
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving post'
      });
    }
  };
  

export const remove = async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await PostModel.findByIdAndDelete(postId);
  
      if (!post) {
        return res.status(404).json({
          message: 'Post to delete was not found'
        });
      }
  
      res.json({
        success: true
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error deleting post'
      });
    }
  };
  