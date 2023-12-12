import express from 'express'
import Joi from 'joi'
import ExpressValidation from 'express-joi-validation'
import { postLogin, postRegister } from '../controller/controllers.js'

const router = express.Router()

const validator = ExpressValidation.createValidator({})

const registerSchema = Joi.object({
    // Joi 오브젝트 스키마를 등록함으로 써 특정 필드에 대한 validation을 넣을 수 있다.
    username: Joi.string().min(3).max(12).required(),
    password: Joi.string().min(6).max(12).required(),
    email: Joi.string().email().required(),
})

const loginSchema = Joi.object({
    password: Joi.string().min(6).max(12).required(),
    email: Joi.string().email().required(),
})

router.post('/register', validator.body(registerSchema), postRegister)

router.post('/login', validator.body(loginSchema), postLogin)

export default router;