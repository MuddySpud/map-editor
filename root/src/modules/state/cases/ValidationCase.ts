import IValidationCase from "../../interfaces/state/cases/IValidationCase";
import IValidationError from "../../interfaces/state/notifications/IValidationError";
import IValidationCircularRefResult from "../../interfaces/state/notifications/IValidationCircularRefResult";
import IPaginationDetails from "../../interfaces/state/ui/payloads/IPaginationDetails";
import PaginationDetails from "../ui/payloads/PaginationDetails";


export default class ValidationCase implements IValidationCase {
    
    constructor(defaultBatchSize: number) {
            
        this.circularRefPagination = new PaginationDetails(
            0,
            defaultBatchSize,
            0
        );
            
        this.errorsPagination = new PaginationDetails(
            0,
            defaultBatchSize,
            0
        );
    }

public fresh: boolean = true;
    public treeKey: string | null = null;
    public treeName: string | null = null;
    public treeToken: string | null = null;
    public selectedErrorID: number | null = null;
    public selectedCfReportID: number | null = null;
    public success: boolean = false;
    public timeTaken: number | null = null;
    public circularRefResult: Array<IValidationCircularRefResult> = [];
    public errors: Array<IValidationError> = [];
    public log: Array<string> = [];
    public circularRefPagination: IPaginationDetails;        
    public errorsPagination: IPaginationDetails;
}

