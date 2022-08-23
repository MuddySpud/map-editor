import IValidationError from "../../interfaces/state/notifications/IValidationError";
import { ValidationErrorType } from "../../interfaces/enums/ValidationErrorType";
import IDocumentError from "../../interfaces/state/notifications/IDocumentError";


export default class ValidationError implements IValidationError {

    constructor(
        id: number,
        message: string,
        errorType: ValidationErrorType,
        document: IDocumentError) {

            this.id = id;
            this.message = message;
            this.errorType = errorType;
            this.document = document;
        }

    public id: number;
    public message: string;
    public errorType: ValidationErrorType;
    public document: IDocumentError;
}

