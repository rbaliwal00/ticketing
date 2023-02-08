import { Publisher, Subjects, TicketUpdatedEvent } from "@rbaliwaltickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

};