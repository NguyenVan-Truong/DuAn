import Joi from "joi";

export const productSchema = Joi.object({
    title : Joi.string().required().min(3).messages({
        "string.base": "Title should be a type of 'text'",
        "string.empty": "Title is required",
        "string.min": "Title should have a minimum length of {#limit}",
    }), 
    price : Joi.number().required().min(1).messages({
        "number.base": "Price should be a type of 'number'",
        "number.empty": "Price is required",
        "number.min": "Price should have a minimum value of {#limit}",
    }), 
    description : Joi.string().required().min(3).messages({
        "string.base": "Description should be a type of 'text'",
        "string.empty": "Description is required",
        "string.min": "Description should have a minimum length of {#limit}",
    }),
    categoryId : Joi.string().required().messages({
        "string.base": "Category Id should be a type of 'text'",
        "string.empty": "Category Id is required",
    }),
})