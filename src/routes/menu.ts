import { Router } from 'express';
import { verifyAuthentication } from '../validations/user';
import * as controller from '../controller/menu';
import { validateAddMenuToCart, validateRemoveMenufromCart } from '../validations/cart';

const menuRouter = Router();

menuRouter.post(
  '/cart/add',
  [verifyAuthentication, validateAddMenuToCart],
  controller.addBurgerMenuToCart
);

menuRouter.get('/menus', [verifyAuthentication], controller.getAllMenus);
menuRouter.delete(
  '/cart/remove',
  [verifyAuthentication, validateRemoveMenufromCart],
  controller.removeBurgerMenuFromCart
);

menuRouter.get('/cart/view', [verifyAuthentication], controller.viewCart);

export default menuRouter;
