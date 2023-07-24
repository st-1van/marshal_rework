const PostModel = require('../models/Post.js');
const UserModel = require('../models/User.js');
const CarModel = require('../models/Car.js');
const upload = require('../middleware/DiskStorage.js');
const { Result } = require('express-validator');

//тут не працює в інсомнії підвантаження одного або кількох файлів

const createPost = async (req,res)=>{
    try {
        console.log('user is '+ req.userId);
        console.log('car is'+  req.carId);
        const post = new PostModel({
            text:req.body.text,
            urgency:req.body.urgency,
            problem:req.body.problem,
            user:req.userId,
            car: null,
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


const  postDataUpdate = (req,res,newPost)=> {  
    
    UserModel.findOneAndUpdate({
      _id: req.userId
    },
      {
        $push: { posts: newPost._id }
      }).then().catch((err) => {
        console.log('An error occurred:', err);
        return  res.status (500).json({
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

const getAllPosts = async(req,res)=>{
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

const getOne = async (req, res) => {
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
  

const remove = async (req, res) => {
    try {
      const postId = req.params.id;
      const post = await PostModel.findByIdAndDelete(postId);
  
      if (!post) {
        return res.status(404).json({
          message: 'Post to delete was not found'
        });
      }
  
      res.json({
        success: 'post was deleted'
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        message: 'Error deleting post'
      });
    }
  };
  
module.exports= { createPost, getAllPosts, getOne, remove }