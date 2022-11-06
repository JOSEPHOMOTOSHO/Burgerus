import { Stripe } from 'stripe';
import obj from './interface';

const stripe = new Stripe(process.env.STRIPE_KEY as string, {
  apiVersion: '2022-08-01',
});

const generatePaymentSession = async (data: Array<obj>): Promise<any> => {
  console.log('beans');
  const config = {
    payment_method_types: ['card'] as Stripe.Checkout.SessionCreateParams.PaymentMethodType[],
    line_items: data,
    mode: 'payment' as Stripe.Checkout.Session.Mode,
    // Set a success and cancel URL we will send customers to
    // They are complete urls
    success_url: `${process.env.APP_URL}/success`,
    cancel_url: `${process.env.APP_URL}/cancel`,
  };
  let session = await stripe.checkout.sessions.create(config);
  console.log('I am in the session', session);
  return [session?.url, config];
};

export { generatePaymentSession };
