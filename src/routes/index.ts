import { Application } from "express";

import userRouter from "./user.routes";
import  adminRouter  from "./admin.routes";


const index = (app: Application) => {
    app.use(userRouter)
    app.use("/admin", adminRouter)
}


export default index