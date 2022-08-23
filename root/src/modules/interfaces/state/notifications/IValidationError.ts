import { ValidationErrorType } from "../../../interfaces/enums/ValidationErrorType";
import IDocumentError from "./IDocumentError";


export default interface IValidationError {
    
    id: number;
    message: string;
    errorType: ValidationErrorType;
    document: IDocumentError;
}
