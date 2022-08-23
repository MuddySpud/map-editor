import IDeed from "../notifications/IDeed";
import IDataCase from "./IDataCase";
import IPaginationDetails from "../ui/payloads/IPaginationDetails";


export default interface IHistoryCase extends IDataCase {
    
    selectedID: string;
    deeds: Array<IDeed>;
    paginationDetails: IPaginationDetails;
}
