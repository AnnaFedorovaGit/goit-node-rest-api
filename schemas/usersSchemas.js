import Joi from "joi";
import { emailRegepxp } from "../constants/user-constants.js"


export const userSignupSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegepxp).required(),
    subscription: Joi.string(),
    token: Joi.string()
})

export const userSigninSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegepxp).required(),
    subscription: Joi.string(),
    token: Joi.string()
})
