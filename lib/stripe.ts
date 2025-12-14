import Stripe from 'stripe';

const stripeSecret = process.env.STRIPE_SECRET_KEY || '';
export const stripe = new Stripe(stripeSecret, { apiVersion: '2023-08-16' });

export function weeklyPriceToCents(price: number) {
  return Math.round(price * 100);
}
