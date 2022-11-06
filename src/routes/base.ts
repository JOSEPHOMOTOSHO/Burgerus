import { Router } from 'express';
import * as controller from '../controller/base';
const baseRouter = Router();

baseRouter.get('/', controller.base);
baseRouter.get('/success', controller.PaymentSuccess);
baseRouter.get('/cancel', controller.PaymentCancelled);

export default baseRouter;
