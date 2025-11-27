import express from "express";
import Stripe from 'stripe';
import dotenv from 'dotenv';
import subscriptionModel from '../models/subscriptionModel.js';

dotenv.config();

const router = express.Router();

// Initialize Stripe using the Secret Key
const stripe = Stripe(process.env.STRIPE_SECRET_KEY); 

// Define your domain for redirect URLs (Frontend URL)
const YOUR_DOMAIN = process.env.NODE_ENV === 'production'
    ? 'https://yourdomain.com'
    : 'http://localhost:5173'; // Vite default port

// Dynamic price creation - no need for static mapping anymore

// Endpoint called by the client to initiate the checkout process
router.post('/', async (req, res) => {
    const { planId } = req.body;

    // Get user ID from JWT token (set by verifyToken middleware)
    let userId = req.user.id;

    // Handle admin case (admin tokens don't have id field)
    if (!userId && req.user.role === "admin") {
        userId = "admin";
    }


    if (!userId) {
        return res.status(401).json({ error: 'User ID missing. Authentication required.' });
    }

    try {
        // Fetch the subscription plan from database using MongoDB ObjectId
        const subscriptionPlan = await subscriptionModel.findById(planId);

        if (!subscriptionPlan) {
            return res.status(404).json({ error: 'Invalid subscription plan ID.' });
        }

        // Check if Stripe is configured
        if (!stripe || !process.env.STRIPE_SECRET_KEY) {
            return res.status(500).json({ error: 'Payment processing not configured. Please contact support.' });
        }

        // Create or get existing product and price for this subscription plan
        let stripePrice;
        try {
            // First, create or get the product
            const product = await stripe.products.create({
                name: subscriptionPlan.planName,
                description: subscriptionPlan.description,
            });

            // Create the price for this product
            stripePrice = await stripe.prices.create({
                product: product.id,
                unit_amount: Math.round(parseFloat(subscriptionPlan.price) * 100), // Convert to cents
                currency: 'usd',
                recurring: {
                    interval: 'month', // You can make this dynamic based on subscriptionPlan.duration
                },
            });

            console.log(`Created Stripe price: ${stripePrice.id} for plan: ${subscriptionPlan.planName}`);
        } catch (priceError) {
            console.error('Error creating Stripe price:', priceError);
            return res.status(500).json({ error: 'Failed to create payment configuration' });
        }

        // Create checkout session with the dynamic price
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription',
            line_items: [
                {
                    price: stripePrice.id,
                    quantity: 1,
                },
            ],
            client_reference_id: userId,
            success_url: `${YOUR_DOMAIN}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${YOUR_DOMAIN}/cancel`,
            metadata: {
                planId: subscriptionPlan._id.toString(),
                planName: subscriptionPlan.planName,
                userId: userId
            }
        });

        console.log(`Created checkout session: ${session.id} for user: ${userId}`);
        res.json({ url: session.url });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).send({ error: error.message });
    }
});

export default router;