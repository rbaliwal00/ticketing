import {Publisher, Subjects, OrderCancelledEvent} from '@rbaliwaltickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}