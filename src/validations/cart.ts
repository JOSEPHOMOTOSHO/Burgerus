import { NextFunction, Request, Response } from 'express';
import Joi from 'joi';
import obj from '../utilities/interface';
import { handleValidationError } from '../utilities/response';

//validate payload from user

const addMenuToSchemaValidator = (payload: obj) => {
  const schema = Joi.object({
    menuId: Joi.string().required(),
    quantity: Joi.number().required(),
  }).required();

  return schema.validate(payload, { allowUnknown: true });
};

const validateAddMenuToCart = (req: Request, res: Response, next: NextFunction) => {
  const validated = addMenuToSchemaValidator(req.body);
  if (validated.error) {
    return handleValidationError(req as any, validated, res);
  }
  return next();
};

const removeMenuFromCartSchemaValidator = (payload: obj) => {
  const schema = Joi.object({
    menuId: Joi.string().required(),
  });
  return schema.validate(payload, { allowUnknown: true });
};

const validateRemoveMenufromCart = (req: Request, res: Response, next: NextFunction) => {
  const validated = removeMenuFromCartSchemaValidator(req.body);
  if (validated.error) {
    return handleValidationError(req as any, validated, res);
  }
  return next();
};

export { validateAddMenuToCart, validateRemoveMenufromCart };
