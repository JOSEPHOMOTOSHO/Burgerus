"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Message {
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
            // LOGIN_SUCCESS: 'Successfully logged in',
            UPDATE_SUCCESS: 'Successfully updated user',
            // USER_QUERY_SUCCESS: 'Successfully queried user',
            // USER_DELETE_SUCCESS: 'Successfully deleted user',
            // MENUS_UNAVAILABLE: 'Menus are unavailable',
            // MENUS_QUERY_SUCCESS: 'Successfully queried menus',
            // CART_QUERY_SUCCESS: 'Successfully queried cart',
            // MENU_CREATION_ERROR: 'Error occured while creating menu',
            // MENU_CREATION_SUCCESS: 'Successfully created menu',
            // CART_CREATION_ERROR: 'Error occured while creating cart',
            // MENU_NOT_FOUND: 'Menu not found',
            // CART_UPDATE_ERROR: 'Error occured while updating cart',
            // CART_UPDATE_SUCCESS: 'Successfully updated cart',
            // MENU_NOT_FOUND_IN_CART: 'Menu not found in cart',
            // CART_EMPTY: 'Cart is empty',
            // CHECKOUT_ERROR: 'Error occured while checking out',
            // CHECKOUT_SUCCESS: 'Successfully checked out',
        };
    }
    getMessage(message) {
        return this.messages[message];
    }
}
exports.default = new Message();
//# sourceMappingURL=message.js.map