import { NextFunction, Request, Response } from "express"
import Joi from "joi"
import { handleValidationError } from "../utilities/response"


const createMenuValidator = (payload: object) => {
    const schema = Joi.object({
        name: Joi.string().required(),
        price: Joi.number().required(),
        shipping: Joi.number().required(),
        description: Joi.string().required()
    }).required()
    return schema.validate(payload, {allowUnknown:true})
}

const validateMenuCreationPayload = (req: Request, res: Response, next: NextFunction) => {
 const validated = createMenuValidator(req.body);
 console.log(typeof validated.value.price)
 if(validated.error){
    return handleValidationError(req as any, validated, res)
 }
 return next()
}

export {
    validateMenuCreationPayload
}