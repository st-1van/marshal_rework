import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import * as dotenv from 'dotenv'
dotenv.config()

import {registerValidation, postValidation, loginValidation} from './validations.js'
import {UserController, CarController, PostController} from './controllers/index.js'
import {checkAuth, handleValidationErrors} from './utils/index.js';
import upload from './middleware/DiskStorage.js';
import { deleteTrialFile } from './middleware/deleteTrialFile.js';
import { googleUpdate } from './controllers/googleApi.js';


const dbConnect = "mongodb+srv://"+process.env.ADMIN_NAME+":"+process.env.ADMIN_PASS+"@cluster0.nerrton.mongodb.net/"+process.env.DBNAME+"?retryWrites=true&w=majority";


mongoose
    .connect(dbConnect)
    .then(()=>console.log('db ok'))
    .catch((err)=> console.log('Db error', err));


const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));

app.get('/', (req,res)=>{
    res.send('success')
})

app.post('/auth/login', loginValidation, handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth,UserController.checkUser);    
app.post('/auth/add-new-user', registerValidation, handleValidationErrors, UserController.addUser );

app.post('/manage/add-car', checkAuth, handleValidationErrors, CarController.addCar);
app.post('/manage/add-manager', registerValidation, handleValidationErrors, UserController.addManager );
app.delete('/manage/delete-car', checkAuth, handleValidationErrors, CarController.deleteCar);


app.get('/cabinet/posts', checkAuth, PostController.getAllPosts);
app.get('/cabinet/posts/:id', checkAuth, PostController.getOne);
app.post('/cabinet/posts', checkAuth, postValidation, handleValidationErrors, PostController.createPost);
app.delete('/cabinet/posts/:id', checkAuth, PostController.remove);

// app.update('/cabinet/take-car',checkAuth, takeCar);
// app.update('/cabinet/drop-car',checkAuth, dropCar);

app.post('/upload',checkAuth,  upload.single('image'), (req,res)=>{
    res.json({
        url:`uploads/${req.userId}/${req.file.filename}`,
    });
})
app.delete('/upload', checkAuth, deleteTrialFile);

// app.post('/uploads', checkAuth,  upload.array('image',5), (req,res)=>{
//     res.json({
//         url:`uploads/${req.userId}/${req.file.filename}`,
//     });
// });
// app.delete('/uploads', checkAuth, deleteTrialFiles);

app.post("/googleApi", googleUpdate, (req,res)=>{
    res.send('success');
})

 
app.listen(process.env.PORT, (err) => {
    
    if (err){
        return console.log(err)
    }
    console.log(`Server is running listening on port ${process.env.PORT}!`) 
});