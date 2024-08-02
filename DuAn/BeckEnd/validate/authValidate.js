import Joi from 'joi';
export const userSchema = Joi.object({
    email : Joi.string().email().required(),
    password : Joi.string().required(),
    role: Joi.string().valid('member', 'admin').default('member'),
})
