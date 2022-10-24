import { Router } from "express";
import * as controller from "../controller/admin.controller"
import { validateMenuCreationPayload } from "../validations/menu.validation";


const adminRouter = Router()

adminRouter.post("/menu", validateMenuCreationPayload, controller.publishMenu)

export default adminRouter