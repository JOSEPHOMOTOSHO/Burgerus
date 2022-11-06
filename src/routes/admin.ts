import { Router } from 'express';
import * as controller from '../controller/admin';
import { validateMenuCreationPayload } from '../validations/menu';
import { validateDeleteUserPayload } from '../validations/user';

const adminRouter = Router();

adminRouter.post('/menu', validateMenuCreationPayload, controller.publishMenu);
adminRouter.delete('/user', validateDeleteUserPayload, controller.deleteUser);

export default adminRouter;
