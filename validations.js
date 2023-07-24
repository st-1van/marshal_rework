import {body} from 'express-validator';

export const loginValidation =[
    body('email','невірний формат пошти').isEmail(),
    body('password', 'пароль повинен бути мінімум 6 символів').isLength({min:6}),
]

export const registerValidation = [
    body('email','невірний формат пошти').isEmail(),
    body('password', 'пароль повинен бути мінімум 6 символів').isLength({min:6}),
    body('fName', "Додайте ім'я").isLength({min:3}),
    body('sName', "Додайте прізвище").isLength({min:3})
]

export const postValidation = [
    body('text','опис повинен бути довжиною мінімум 6 символів').isLength({min:6}).isString(),
    body('urgency', 'заповніть терміновість').isString(),
    body('problem', 'Неверная ссылка на изображение').isString(),
]

export const carValidation =[
    body('brand','бренд повинен бути довжиною мінімум 6 символів').isLength({min:6}).isString(),
    body('carNumber', 'неправильно заповнений номер авто').isLength({min:6}).isString(),
]

export const carlogValidation =[
]