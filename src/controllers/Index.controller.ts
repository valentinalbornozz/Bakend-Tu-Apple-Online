// controllers/index.ts
import register from './Register.controller';
import login from './Login.controller';
import getUserById from './GetUserById.controller';
import processPayment from './Stripe.controller';

const controllers = {
    register,
    login,
    getUserById,
    processPayment,
};

export default controllers;
