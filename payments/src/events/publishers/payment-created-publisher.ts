import { Subjects,Publisher, PaymentCreatedEvent } from "@rbaliwaltickets/common";

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
    subject: Subjects.PaymentCreated = Subjects.PaymentCreated;
}