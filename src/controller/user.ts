import { Request, response, Response } from 'express';
import { checkoutCart } from '../services/cart.service';
import { registerUser, loginUser, updateUser, findUser } from '../services/user.service';
import obj, { IGetUserAuthInfoRequest } from '../utilities/interface';
import { sendErrorResponse, sendSuccessResponse } from '../utilities/response';

const register = async (req: Request, res: Response): Promise<any> => {
  try {
    const create = await registerUser(req.body);
    if (create.status) {
      return sendSuccessResponse(res, create.message, create.data, 201);
    }
    console.log('berrr');
    return sendErrorResponse(req, res, create.message, {}, 400);
  } catch (err: any) {
    return sendErrorResponse(req, res, 'UNKNOWN_ERROR', {}, 500);
  }
};

const login = async (req: Request, res: Response): Promise<any> => {
  try {
    let login = await loginUser(req.body);
    if (login.status) {
      return sendSuccessResponse(res, login.message, login.data, 200);
    }
    return sendErrorResponse(req, res, login.message, {}, 400);
  } catch (err) {
    return sendErrorResponse(req, res, 'UNKNOWN_ERROR', {}, 500);
  }
};

const update = async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
  try {
    let user = await updateUser(req.user as obj, req.body);
    if (user.status) {
      return sendSuccessResponse(res, user.message, user.data, 201);
    }
    return sendErrorResponse(req, res, user.message, {}, 400);
  } catch (err) {
    console.log('kkk');
    return sendErrorResponse(req, res, 'UNKNOWN_ERROR', {}, 500);
  }
};

const getUser = async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
  try {
    const foundUser = await findUser({ _id: req.user && req.user._id });
    if (foundUser.status) {
      return sendSuccessResponse(res, foundUser.message, foundUser.data, 200);
    }
    return sendErrorResponse(req, res, foundUser.message, {}, 400);
  } catch (err) {
    return sendErrorResponse(req, res, 'UNKNOWN_ERROR', {}, 500);
  }
};

const checkoutUserCart = async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
  try {
    console.log('yam');
    const checkedOut = await checkoutCart(req.user as obj);
    console.log('beans');
    if (checkedOut.status) {
      return sendSuccessResponse(res, checkedOut.message, checkedOut.data, 200);
    }
    return sendErrorResponse(req, res, checkedOut.message, {}, 400);
  } catch (err) {
    return sendErrorResponse(req, res, 'UNKNOWN_ERROR', {}, 400);
  }
};
export { register, login, update, getUser, checkoutUserCart };
