import { Application } from 'express';

import userRouter from './user';
import adminRouter from './admin';
import menuRouter from './menu';
import baseRouter from './base';

const index = (app: Application) => {
  app.use(userRouter);
  app.use('/admin', adminRouter);
  app.use(menuRouter);
  app.use(baseRouter);
};

export default index;
