import Razorpay from 'razorpay';

if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
  throw new Error('Razorpay keys not found');
}

const stripe = new Razorpay( process.env.RAZORPAY_KEY_SECRET, {
    api
);