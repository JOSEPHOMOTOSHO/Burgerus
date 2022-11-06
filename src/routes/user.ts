import { Router } from 'express';
import {
  validateRegisterPayload,
  validateLoginPayload,
  verifyAuthentication,
} from '../validations/user';

const userRouter = Router();

import * as controller from '../controller/user';

userRouter.post('/register', validateRegisterPayload, controller.register);
userRouter.post('/login', validateLoginPayload, controller.login);
userRouter.put('/update', verifyAuthentication, controller.update);
userRouter.get('/', verifyAuthentication, controller.getUser);
userRouter.get('/checkout', verifyAuthentication, controller.checkoutUserCart);

export default userRouter;
