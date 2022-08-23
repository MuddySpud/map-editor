import { DocType } from "../../enums/DocType";


export default interface IDocumentError {
    
    identifier: string;
    docType: DocType;
    json: string;
}
