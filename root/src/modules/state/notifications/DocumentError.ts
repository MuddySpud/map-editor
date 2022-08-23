import IDocumentError from "../../interfaces/state/notifications/IDocumentError";
import { DocType } from "../../interfaces/enums/DocType";


export default class DocumentError implements IDocumentError {

    constructor(
        identifier: string,
        docType: DocType,
        json: string) {

            this.identifier = identifier;
            this.docType = docType;
            this.json = json;
        }

    public identifier: string;
    public docType: DocType;
    public json: string;
}

