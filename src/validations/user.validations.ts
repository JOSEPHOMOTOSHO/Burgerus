import Joi from "joi"
import { Request, Response, NextFunction } from "express"
import { handleValidationError, sendErrorResponse } from "../utilities/response"
import { verifyToken } from "../services/user.service"
import { IGetUserAuthInfoRequest } from "../utilities/interface"

const registerPayloadValidation = (payload: object) => {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        address: Joi.string().required(),
        password: Joi.string().required(),
    }).required()

    return schema.validate(payload, { allowUnknown: true })
}

const loginPayloadValidation = (payload: object) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }).required()

    return schema.validate(payload, { allowUnknown: true })
}

const validateRegisterPayload = (req: Request, res: Response, next: NextFunction) => {
    const validated = registerPayloadValidation(req.body);
    console.log("kdkndk")
    if (validated.error) {
        return handleValidationError(req as any,validated, res)
    }
    return next()
}

const validateLoginPayload = (req: Request, res: Response, next: NextFunction) => {
    const validated = loginPayloadValidation(req.body);
    if (validated.error) {
        return handleValidationError(req as any,validated, res)
    }
    return next()
}

//verifyAuthentication
//verifyToken

const verifyAuthentication = async (req: IGetUserAuthInfoRequest, res: Response, next: NextFunction) => {
   let token = req.headers.authorization;
   if(!token){
    return sendErrorResponse(req,res,"TOKEN_ERROR",{},401);
   }
   let verified = await verifyToken(token.split(" ")[1]);
   if(!verified.status){
    return sendErrorResponse(req,res,verified.message,{},401);
   }
   
   req.user = verified.data;
   return next()
}

export {
    validateRegisterPayload,
    validateLoginPayload,
    verifyAuthentication
}