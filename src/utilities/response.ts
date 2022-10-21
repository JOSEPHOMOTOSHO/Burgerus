import obj, { IGetUserAuthInfoRequest } from "./interface";
import { Response } from "express";
import handler from "./message";
import Sentry from "../sentry";

const generateResponse = (status: boolean, message: string, data: obj): obj => {
    return {
        status,
        message,
        data
    }
}

const sendSuccessResponse = (
    res: Response,
    message: string,
    data: object,
    statusCode: number = 200
) => {
    return res.status(statusCode).json({
        status: true,
        message: handler.getMessage(message) || message,
        data
    })
}

const sendErrorResponse = (
    req:Request | IGetUserAuthInfoRequest,
    res: Response,
    message: string,
    data: object,
    statusCode: number = 400
) => {
    Sentry.captureException(new Error(`There was an error, here is the request payload ${JSON.stringify(req.body)}`));
    console.log("ebbebe")
    return res.status(statusCode).json({
        status: false,
        message: handler.getMessage(message) || message,
        data
    })
}

const handleValidationError = (req:Request, validatedData: obj, res: Response) => {
    const message = validatedData.error.details[0].message;
    console.log(message)
    return sendErrorResponse(req,res, message, {}, 400)
}

export {
    generateResponse,
    sendErrorResponse,
    sendSuccessResponse,
    handleValidationError
}