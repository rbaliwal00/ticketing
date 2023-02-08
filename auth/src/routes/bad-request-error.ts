import { CustomError } from "@rbaliwaltickets/common";

export class BadRequestError extends CustomError{
    statusCode = 400;

    constructor(public message:string){
        super(message);

        Object.setPrototypeOf(this, BadRequestError.prototype);
    }

    serializeError(){
        return [{message: this.message}];
    }
}