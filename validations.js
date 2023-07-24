const {body} = require('express-validator');

const loginValidation =[
    body('email','невірний формат пошти').isEmail(),
    body('password', 'пароль повинен бути мінімум 6 символів').isLength({min:6}),
]

const registerValidation = [
    body('email','невірний формат пошти').isEmail(),
    body('password', 'пароль повинен бути мінімум 6 символів').isLength({min:6}),
    body('fName', "Додайте ім'я").isLength({min:3}),
    body('sName', "Додайте прізвище").isLength({min:3})
]

const postValidation = [
    body('text','опис повинен бути довжиною мінімум 6 символів').isLength({min:6}).isString(),
    body('urgency', 'заповніть терміновість').isString(),
    body('problem', 'Неверная ссылка на изображение').isString(),
]

const carValidation =[
    body('brand','бренд повинен бути довжиною мінімум 6 символів').isLength({min:6}).isString(),
    body('carNumber', 'неправильно заповнений номер авто').isLength({min:6}).isString(),
]

const carlogValidation =[
]

module.exports= { loginValidation, registerValidation, postValidation, carValidation, carlogValidation}