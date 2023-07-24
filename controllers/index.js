const {deleteCar, addCar, getAllCars, getFreeCars, takeCar, dropCar} = require("./CarController.js");
const { createPost, getAllPosts, getOne, remove } = require("./PostController.js");
const {addManager, addUser, login, checkUser} = require("./UserController.js");


exports.CarController = {deleteCar, addCar, getAllCars, getFreeCars, takeCar, dropCar};
exports.PostController = {createPost, getAllPosts, getOne, remove};
exports.UserController = {addManager, addUser, login, checkUser};


