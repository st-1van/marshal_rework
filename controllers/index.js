const {deleteCar, addCar} = require("./CarController.js");
const { createPost, getAllPosts, getOne, remove } = require("./PostController.js");
const {addManager, addUser, login, checkUser} = require("./UserController.js");


exports.CarController = {deleteCar, addCar};
exports.PostController = {createPost, getAllPosts, getOne, remove};
exports.UserController = {addManager, addUser, login, checkUser};


