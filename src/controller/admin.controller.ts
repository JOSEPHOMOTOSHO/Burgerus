import { Request, Response } from "express";
import { sendErrorResponse, sendSuccessResponse } from "../utilities/response";
import { createMenu } from "../services/menu.service";


// admin publishes menu
const publishMenu =  async (req: Request , res: Response): Promise<any> => {
    try{
        const publishMenu = await createMenu(req.body);
        if(publishMenu.status){
            return sendSuccessResponse(res, publishMenu.message, publishMenu.data, 200)
        }
        return sendErrorResponse(req, res,publishMenu.message, {}, 400)
    }catch(err:any){
        return sendErrorResponse(req, res,"UNKNOWN_ERROR", {}, 500)
    }

}

export {
    publishMenu
}