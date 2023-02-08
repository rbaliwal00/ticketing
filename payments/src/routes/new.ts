import express, { Request, Response } from 'express';
import { body } from 'express-validator';
import {
    requireAuth,
    validateRequest,
    NotFoundError,
    NotAuthorized,
    OrderStatus
} from '@rbaliwaltickets/common';
import { Order } from '../models/order';
import { stripe } from '../stripe';
import { PaymentCreatedPublisher } from '../events/publishers/payment-created-publisher';
import { Payment } from '../models/payment';
import { natsWrapper } from '../nats-wrapper';

const router = express.Router();

router.post('/api/payments', requireAuth, 
[
    body('token')
        .not()
        .isEmpty(),
    body('orderId')
        .not()
        .isEmpty()

],
validateRequest,
 async (req: Request, res: Response) => {
    const {token, orderId} = req.body;

    const order = await Order.findById(orderId);

    if(!order){
        throw new NotFoundError();
    }

    if(order.userId !== req.currentUser!.id){
        throw new NotAuthorized();
    }

    if(order.status === OrderStatus.Cancelled){
        throw new Error('Cannot pay for an cancelled order');
    }

    const charge = await stripe.paymentIntents.create({
        currency: 'usd',
        amount: order.price,
        payment_method_types: ['card'],
    });

    const payment = Payment.build({
        orderId,
        stripeId: charge.id
    });

    await payment.save();

    new PaymentCreatedPublisher(natsWrapper.client).publish({
        id: payment.id,
        orderId: payment.orderId,
        stripeId: payment.stripeId
    });

    res.status(201).send(payment);
})

export {router as createChargeRouter};