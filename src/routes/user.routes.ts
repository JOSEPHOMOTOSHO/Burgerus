import { Router } from "express";
import { validateRegisterPayload , validateLoginPayload, verifyAuthentication } from "../validations/user.validations";


const userRouter = Router()

import * as controller from "../controller/user.controller"

userRouter.post('/register', validateRegisterPayload, controller.register);
userRouter.post('/login', validateLoginPayload, controller.login );
userRouter.put('/update', verifyAuthentication, controller.update);
userRouter.get("/",verifyAuthentication,controller.getUser);

export default userRouter