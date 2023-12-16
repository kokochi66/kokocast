import express from 'express'
import Joi from 'joi'
import ExpressValidation from 'express-joi-validation'
import { verifyToken } from "../middleware/auth.js"
import { getChannelSettings } from "../controller/controllers.js"

const router = express.Router()

const validator = ExpressValidation.createValidator({})

router.get('/channel', verifyToken, getChannelSettings)

export default router;