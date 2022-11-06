import obj from './interface';

class Message {
  messages: obj;

  constructor() {
    this.messages = {
      UNKNOWN_ERROR: 'An unknown error occurred',
      REGISTER_SUCCESS: 'Successfully registered user',
      REGISTER_FAILED: 'Error occured while registering user',
      TOKEN_ERROR: 'User token is required',
      INVALID_TOKEN: 'Invalid user token provided',
      EMAIL_DUPLICATE: 'Email already exists',
      USER_NOT_FOUND: 'User not found',
      INVALID_CREDENTIALS: 'Invalid sign in credentials',
      LOGIN_SUCCESS: 'Successfully logged in',
      UPDATE_SUCCESS: 'Successfully updated user',
      USER_FOUND: 'User found',
      USER_NOT_DELETED: 'error deleting user',
      USER_DELETE_SUCCESS: 'Successfully deleted user',
      MENU_NOT_FOUND: 'Menus are unavailable',
      MENUS_QUERY_SUCCESS: 'Successfully queried menus',
      CART_QUERY_SUCCESS: 'Successfully queried cart',
      MENU_NOT_CREATED: 'Error occured while creating menu',
      MENU_CREATED_SUCCESSFULLY: 'Successfully created menu',
      CART_CREATION_ERROR: 'Error occured while creating cart',
      CART_UPDATE_ERROR: 'Error occured while updating cart',
      CART_UPDATE_SUCCESS: 'Successfully updated cart',
      MENU_NOT_FOUND_IN_CART: 'Menu not found in cart',
      // CART_EMPTY: 'Cart is empty',
      // CHECKOUT_ERROR: 'Error occured while checking out',
      // CHECKOUT_SUCCESS: 'Successfully checked out',
    };
  }

  getMessage(message: string): string {
    return this.messages[message];
  }
}

export default new Message();
