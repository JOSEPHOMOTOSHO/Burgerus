import { Request, Response } from 'express';
import { sendErrorResponse, sendSuccessResponse } from '../utilities/response';
import { createMenu } from '../services/menu.service';
import { destroyUser } from '../services/user.service';

// admin publishes menu
const publishMenu = async (req: Request, res: Response): Promise<any> => {
  try {
    const publishMenu = await createMenu(req.body);
    if (publishMenu.status) {
      return sendSuccessResponse(res, publishMenu.message, publishMenu.data, 200);
    }
    return sendErrorResponse(req, res, publishMenu.message, {}, 400);
  } catch (err: any) {
    return sendErrorResponse(req, res, 'UNKNOWN_ERROR', {}, 500);
  }
};

//admin can delete a user

const deleteUser = async (req: Request, res: Response): Promise<any> => {
  try {
    const found = await destroyUser(req.body.email);
    if (found.status) {
      return sendSuccessResponse(res, found.message, {}, 200);
    }
    return sendErrorResponse(req, res, found.message, {}, 400);
  } catch (err) {
    return sendErrorResponse(req, res, 'UNKNOWN_ERROR', {}, 500);
  }
};

export { publishMenu, deleteUser };
