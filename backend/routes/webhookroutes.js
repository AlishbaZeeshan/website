// routes/webhookRoutes.js
import express from 'express';
import Stripe from 'stripe';
import dotenv from 'dotenv';
import User from '../models/userModel.js';

dotenv.config();

const router = express.Router();
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

// ⚠️ Important: This route must use raw body parser in index.js
router.post('/', async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed.', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    switch (event.type) {
      // Triggered when subscription payment succeeds and checkout completes
      case 'checkout.session.completed': {
        const session = event.data.object;
        if (session.mode === 'subscription' && session.payment_status === 'paid') {
          const userId = session.client_reference_id;
          const customerId = session.customer;
          const subscriptionId = session.subscription;

          await User.findByIdAndUpdate(userId, {
            stripeCustomerId: customerId,
            stripeSubscriptionId: subscriptionId,
            isSubscribed: true,
            subscriptionStatus: 'active',
          });

          console.log(`✅ Subscription created for user: ${userId}`);
        }
        break;
      }

      // Triggered on subscription updates (renewals, plan changes)
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const status = subscription.status;
        const customerId = subscription.customer;

        await User.findOneAndUpdate(
          { stripeCustomerId: customerId },
          {
            subscriptionStatus: status,
            isSubscribed: status === 'active' || status === 'trialing',
          }
        );

        console.log(`ℹ️ Subscription updated for customer: ${customerId}, status: ${status}`);
        break;
      }

      // Triggered on subscription cancellations
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        await User.findOneAndUpdate(
          { stripeCustomerId: customerId },
          { subscriptionStatus: 'canceled', isSubscribed: false }
        );

        console.log(`❌ Subscription canceled for customer: ${customerId}`);
        break;
      }

      default:
        console.log(`⚠️ Unhandled event type: ${event.type}`);
    }
  } catch (err) {
    console.error('Error handling webhook event:', err);
  }

  res.status(200).json({ received: true });
});

export default router;
