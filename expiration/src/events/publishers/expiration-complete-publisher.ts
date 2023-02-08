import { ExpirationComplete, Publisher, Subjects } from "@rbaliwaltickets/common";

export class ExpirationCompletePublisher extends Publisher<ExpirationComplete>{
    subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
}