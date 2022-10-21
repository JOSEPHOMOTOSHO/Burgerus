import { Application } from "express";

import userRouter from "./user.routes";


const index = (app: Application) => {
    app.use(userRouter)
}


export default index