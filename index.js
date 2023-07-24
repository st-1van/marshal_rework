const express = require( 'express');
const mongoose = require( 'mongoose');
const cors = require( 'cors');

const dotenv = require( 'dotenv');
dotenv.config()

const {registerValidation, postValidation, loginValidation} = require( './validations.js');
const {UserController, CarController, PostController} = require( './controllers/index.js');
const {checkAuth, handleValidationErrors} = require( './utils/index.js');
const upload = require( './middleware/DiskStorage.js');
const { deleteTrialFile } = require( './middleware/deleteTrialFile.js');
const { googleUpdate } = require( './controllers/googleApi.js');


const dbConnect = "mongodb+srv://"+process.env.ADMIN_NAME+":"+process.env.ADMIN_PASS+"@cluster0.nerrton.mongodb.net/"+process.env.DBNAME+"?retryWrites=true&w=majority";

mongoose.set('strictQuery', false);

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
app.get('/auth/me', checkAuth, UserController.checkUser);    
app.post('/auth/add-new-user', registerValidation, handleValidationErrors, UserController.addUser );

app.post('/manage/add-car', checkAuth, handleValidationErrors, CarController.addCar);
app.post('/manage/add-manager', registerValidation, handleValidationErrors, UserController.addManager );
app.delete('/manage/delete-car', checkAuth, handleValidationErrors, CarController.deleteCar);


app.get('/cabinet/posts', checkAuth, PostController.getAllPosts);
app.get('/cabinet/posts/:id', checkAuth, PostController.getOne);
app.post('/cabinet/posts', checkAuth, postValidation, handleValidationErrors, PostController.createPost);
app.delete('/cabinet/posts/:id', checkAuth, PostController.remove);

// app.put('/cabinet/take-car',checkAuth, takeCar);
// app.put('/cabinet/drop-car',checkAuth, dropCar);

app.post('/upload', checkAuth, upload.single('image'), (req,res)=>{
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