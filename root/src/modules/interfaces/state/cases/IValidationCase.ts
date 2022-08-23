import IValidationError from "../notifications/IValidationError";
import IValidationCircularRefResult from "../notifications/IValidationCircularRefResult";
import IDataCase from "./IDataCase";
import IPaginationDetails from "../ui/payloads/IPaginationDetails";


export default interface IValidationCase extends IDataCase {
    
    treeKey: string | null;
    treeName: string | null;
    treeToken: string | null;
    selectedErrorID: number | null;
    selectedCfReportID: number | null;
    success: boolean;
    timeTaken: number | null;
    circularRefResult: Array<IValidationCircularRefResult>;
    circularRefPagination: IPaginationDetails;
    errorsPagination: IPaginationDetails;
    errors: Array<IValidationError>;
    log: Array<string>;
}
