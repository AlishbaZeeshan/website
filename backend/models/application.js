import mongoose from "mongoose";

const learnifyApplicationStructure=mongoose.Schema({
    // --- Authentication & Application Fields ---
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true }, // IMPORTANT: Added unique constraint
    password: { type: String, required: true },
    dob: String,
    field: String,
    education: String,
    
    // --- Admin Flag (CRITICAL FIX) ---
    // This allows you to differentiate admin users in the database
    isAdmin: { type: Boolean, default: false },

    // --- Subscription Fields (CRITICAL FIX for Stripe) ---
    stripeCustomerId: { type: String, default: null }, // Stripe's ID for the customer
    stripeSubscriptionId: { type: String, default: null }, // Stripe's ID for the subscription
    isSubscribed: { type: Boolean, default: false }, // Simple flag for access control
    subscriptionStatus: { type: String, default: 'none' }, // e.g., 'active', 'canceled', 'trialing'
}, { timestamps: true });

const learnifyApplicationModel=mongoose.model('Application Users',learnifyApplicationStructure);
export default learnifyApplicationModel;