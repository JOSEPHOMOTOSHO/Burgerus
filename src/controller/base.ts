import { Request, Response } from 'express';
import { sendSuccessResponse } from '../utilities/response';

const base = async (req: Request, res: Response): Promise<any> => {
  return sendSuccessResponse(res, 'Welcome to base Endpoint', {}, 200);
};

const PaymentSuccess = async (req: Request, res: Response): Promise<any> => {
  return sendSuccessResponse(res, 'Payment completed successfully', {}, 200);
};

const PaymentCancelled = async (req: Request, res: Response): Promise<any> => {
  return sendSuccessResponse(res, 'Payment cancelled', {}, 400);
};

export { base, PaymentSuccess, PaymentCancelled };
