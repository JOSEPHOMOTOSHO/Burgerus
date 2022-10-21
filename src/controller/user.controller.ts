import { Request, response, Response } from "express";
import { registerUser, loginUser, updateUser } from "../services/user.service";
import obj, { IGetUserAuthInfoRequest } from "../utilities/interface";
import { sendErrorResponse, sendSuccessResponse } from "../utilities/response";


const register = async (req: Request, res: Response): Promise<any> => {
    try {
        const create = await registerUser(req.body)
        if (create.status) {
            return sendSuccessResponse(res, create.message, create.data, 201)
        }
        console.log("berrr")
        return sendErrorResponse(req,res, create.message, {}, 400)
    } catch (err: any) {
        return sendErrorResponse(req, res, "UNKNOWN_ERROR", {}, 500)
    }
}

const login = async (req: Request, res: Response): Promise<any> => {
    try {
        let login = await loginUser(req.body);
        if (login.status) {
           return sendSuccessResponse(res, login.message, login.data, 200);
        }
        return sendErrorResponse(req,res, login.message, {}, 400)
    } catch (err) {
        return sendErrorResponse(req, res, "UNKNOWN_ERROR", {}, 500)
    }
}

const update = async(req: IGetUserAuthInfoRequest , res: Response): Promise<any> => {
    try{
        let user = await updateUser(req.user as obj , req.body);
        if(user.status){
            return sendSuccessResponse(res, user.message, user.data, 201)
        }
        return sendErrorResponse(req,res, user.message, {}, 400)
    }catch(err){
        console.log("kkk")
        return sendErrorResponse(req,res, "UNKNOWN_ERROR", {}, 500)
    }
}

export {
    register,
    login,
    update
}