import {Publisher, OrderCreatedEvent, Subjects} from '@rbaliwaltickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}