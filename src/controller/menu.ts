import { Request, Response } from 'express';
import {
  addMenuToCart,
  getUserCart,
  removeMenuFromCart,
  retrieveAllMenus,
} from '../services/menu.service';
import obj, { IGetUserAuthInfoRequest } from '../utilities/interface';
import { sendErrorResponse, sendSuccessResponse } from '../utilities/response';

//get all menu
const getAllMenus = async (req: Request, res: Response): Promise<any> => {
  try {
    const menus = await retrieveAllMenus();
    if (!menus.status) {
      return sendErrorResponse(req, res, menus.message, [], 400);
    }
    return sendSuccessResponse(res, menus.message, menus.data, 200);
  } catch (err) {
    return sendErrorResponse(req, res, 'UNKNOWN ERROR', [], 500);
  }
};

//addBurgerMenutoCart
const addBurgerMenuToCart = async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
  try {
    const menuAddedToCart = await addMenuToCart(req.user as obj, req.body);
    if (menuAddedToCart.status) {
      return sendSuccessResponse(res, menuAddedToCart.message, menuAddedToCart.data, 200);
    }
    return sendErrorResponse(req, res, menuAddedToCart.message, {}, 400);
  } catch (err) {
    return sendErrorResponse(req, res, 'UNKNOWN_ERROR', {}, 500);
  }
};

const removeBurgerMenuFromCart = async (
  req: IGetUserAuthInfoRequest,
  res: Response
): Promise<any> => {
  try {
    const removedMenu = await removeMenuFromCart(req.user as obj, req.body.menuId);
    if (removedMenu.status) {
      return sendSuccessResponse(res, removedMenu.message, removedMenu.data, 200);
    }
    return sendErrorResponse(req, res, removedMenu.message, {}, 400);
  } catch (err) {
    return sendErrorResponse(req, res, 'UNKNOWN_ERROR', {}, 500);
  }
};

const viewCart = async (req: IGetUserAuthInfoRequest, res: Response): Promise<any> => {
  try {
    const cart = await getUserCart(req.user as obj);
    if (cart.status) {
      return sendSuccessResponse(res, cart.message, cart.data, 200);
    }
    return sendErrorResponse(req, res, cart.message, {}, 400);
  } catch (err) {
    return sendErrorResponse(req, res, 'UNKNOWN ERROR', {}, 500);
  }
};

export { addBurgerMenuToCart, getAllMenus, removeBurgerMenuFromCart, viewCart };
