
import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    // Existing user fields
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    // ** New Stripe Fields for Subscription Management **
    stripeCustomerId: { type: String, default: null }, // Stripe's ID for the customer
    stripeSubscriptionId: { type: String, default: null }, // Stripe's ID for the subscription
    isSubscribed: { type: Boolean, default: false }, // Simple flag for access control
    subscriptionStatus: { type: String, default: 'none' }, // e.g., 'active', 'canceled', 'trialing'
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;