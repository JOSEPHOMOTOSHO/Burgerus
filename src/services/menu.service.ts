import { generateResponse } from '../utilities/response';
import Menu from '../models/menu';
import obj from '../utilities/interface';
import { createUserCart, findCartByMatch, pushToCartAndUpdateAmount } from './cart.service';

const createMenu = async (payload: obj): Promise<any> => {
  const menu = await new Menu(payload).save();
  if (!menu) {
    return generateResponse(false, 'MENU_NOT_CREATED', {});
  }
  return generateResponse(true, 'MENU_CREATED_SUCCESSFULLY', menu);
};

const findMenuById = async (Id: string): Promise<any> => {
  return await Menu.findById(Id);
};

const getAllMenus = async (): Promise<any> => {
  return await Menu.find();
};

const addMenuToCart = async (user: obj, payload: obj): Promise<any> => {
  let cart = await findCartByMatch({ customer: user._id });
  if (!cart) {
    //CREATE A CART IF THE USER DOESN'T HAVE ONE
    cart = await createUserCart(user);
    if (!cart.status) {
      return cart;
    }
    cart = cart.data;
  }
  const menu = await findMenuById(payload.menuId);
  if (!menu) {
    return generateResponse(false, 'MENU_NOT_FOUND', {});
  }
  const totalBurgerCost: number = payload.quantity * menu.price;
  const cartItem = {
    item: {
      name: menu.name,
      shipping: menu.shipping,
      menu: menu._id,
      price: menu.price,
      quantity: payload.quantity,
    },
    totalQuantity: cart.totalQuantity + payload.quantity,
    totalAmount: cart.totalAmount + totalBurgerCost + menu.shipping * payload.quantity,
  };
  const duplicate = cart.items.find((item: obj) => {
    return item.menu.toString() === menu._id.toString();
  });

  if (duplicate) {
    console.log('garrui');
    duplicate.shipping = cartItem.item.shipping;
    duplicate.quantity += cartItem.item.quantity;
    duplicate.price = cartItem.item.price;
    cart.totalQuantity = cartItem.totalQuantity;
    cart.totalAmount = cartItem.totalAmount;
    cart = await cart.save();
    if (!cart) {
      return generateResponse(false, 'CART_UPDATE_ERROR', {});
    }
    return generateResponse(true, 'CART_UPDATE_SUCCESS', cart);
  }

  cart = await pushToCartAndUpdateAmount(cart._id, cartItem);
  if (!cart) {
    return generateResponse(false, 'CART_UPDATE_ERROR', {});
  }
  return generateResponse(true, 'CART_UPDATE_SUCCESS', cart);
};

const retrieveAllMenus = async (): Promise<any> => {
  const menus = await getAllMenus();
  if (!menus.length) {
    return generateResponse(false, 'MENU_NOT_FOUND', []);
  }
  return generateResponse(true, 'MENUS_QUERY_SUCCESS', menus);
};

const removeMenuFromCart = async (user: obj, menuId: string): Promise<any> => {
  let cart = await findCartByMatch({ customer: user._id });
  if (!cart) {
    return generateResponse(false, 'CART_NOT_FOUND', {});
  }

  const menu = await findMenuById(menuId);
  if (!menu) {
    return generateResponse(false, 'MENU_NOT_FOUND', {});
  }

  const duplicate = cart.items.find((item: obj) => {
    return item.menu.toString() === menu._id.toString();
  });

  if (!duplicate) {
    return generateResponse(false, 'MENU_NOT_FOUND_IN_CART', {});
  }

  cart.totalAmount =
    cart.totalAmount -
    duplicate.price * duplicate.quantity -
    duplicate.shipping * duplicate.quantity;

  cart.totalQuantity = cart.totalQuantity - duplicate.quantity;

  duplicate.remove();
  if (cart.items.length === 0) {
    cart.totalQuantity = 0;
    cart.totalAmount = 0;
  }
  await cart.save();

  if (!cart) {
    return generateResponse(false, 'CART_UPDATE_ERROR', {});
  }
  return generateResponse(true, 'CART_UPDATE_SUCCESS', cart);
};

const getUserCart = async (user: obj): Promise<any> => {
  let userCart = await findCartByMatch({ customer: user._id });
  if (!userCart) {
    userCart = await createUserCart(user);
    if (!userCart.status) {
      return generateResponse(false, userCart.message, {});
    }
    return generateResponse(true, 'CART_QUERY_SUCCESS', userCart);
  }
  return generateResponse(true, 'CART_QUERY_SUCCESS', userCart);
};
export {
  createMenu,
  addMenuToCart,
  retrieveAllMenus,
  removeMenuFromCart,
  getUserCart,
  findMenuById,
};
