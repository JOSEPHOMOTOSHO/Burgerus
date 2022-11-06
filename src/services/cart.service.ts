import Cart from '../models/cart';
import Order from '../models/order';
import order from '../models/order';
import obj from '../utilities/interface';
import { generatePaymentSession } from '../utilities/payment';
import { generateResponse } from '../utilities/response';
import { findMenuById } from './menu.service';

//create a cart

const createUserCart = async (user: obj): Promise<any> => {
  const cart = await new Cart({ customer: user._id }).save();
  if (!cart) {
    return generateResponse(false, 'CART_CREATION_ERROR', {});
  }
  return generateResponse(true, 'CART_CREATION_SUCCESS', cart);
};

//find cart by customer Id
const findCartByMatch = async (match: obj): Promise<any> => {
  return await Cart.findOne(match);
};

const pushToCartAndUpdateAmount = async (cartId: string, payload: obj): Promise<any> => {
  return await Cart.findOneAndUpdate(
    {
      _id: cartId,
    },
    {
      $push: {
        items: {
          $each: [payload.item],
          $position: 0,
        },
      },
      totalQuantity: payload.totalQuantity,
      totalAmount: payload.totalAmount,
    },
    {
      new: true,
    }
  );
};

const checkoutCart = async (user: obj): Promise<any> => {
  let cart = await findCartByMatch({ customer: user._id });
  console.log(cart, 'll');
  if (!cart) {
    return generateResponse(false, 'CART_NOT_FOUND', {});
  }
  if (cart.items.length === 0) {
    return generateResponse(false, 'CART_EMPTY', {});
  }

  let totalCostOfBurger = 0;
  let totalCostOfShipping = 0;
  let orderItems = [];
  let stripeItems = [];

  for (let i = 0; i < cart.items.length; i++) {
    let item = cart.items[i];
    let menu = await findMenuById(item.menu);
    if (!menu) {
      return generateResponse(false, 'MENU_NOT_FOUND', {});
    }
    let quantity = item.quantity;
    let cost = menu.price * quantity;
    totalCostOfBurger += cost;
    totalCostOfShipping += quantity * menu.shipping;
    orderItems.push({
      name: menu.name,
      price: cost,
      shipping: menu.shipping * quantity,
      quantity: menu.quantity,
      menu: menu._id,
    });

    stripeItems.push({
      price_data: {
        currency: 'usd',
        product_data: {
          name: menu.name,
        },
        unit_amount: cost + menu.shipping * quantity,
      },
      quantity: 1,
    }); //to-do complete =>>>>

    item.remove();
  }

  let totalAmount = totalCostOfBurger + totalCostOfShipping;
  //do the payment sessions for the stripe Items here =>>>
  console.log('egg');
  const paymentSession = await generatePaymentSession(stripeItems);
  console.log('pppp');
  cart.items = [];
  cart.totalAmount = 0;
  cart.totalQuantity = 0;

  let order = await new Order({
    customer: user._id,
    items: orderItems,
    totalAmount,
    totalShipping: totalCostOfShipping,
    config: 1, //to-do : payment config, remove 1 later
    delivery: user.address,
  }).save();

  cart = await cart.save();
  if (!cart) {
    return generateResponse(false, 'CHECKOUT_ERROR', {});
  }
  return generateResponse(true, 'CHECKOUT_SUCCESS', {
    pamentLink: paymentSession[0],
    order,
    config: paymentSession[1],
  });
};
export { createUserCart, findCartByMatch, pushToCartAndUpdateAmount, checkoutCart };
