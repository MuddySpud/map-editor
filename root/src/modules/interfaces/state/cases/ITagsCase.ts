import ITreeSys from "../tree/ITreeSys";
import IDataCase from "./IDataCase";
import IPaginationDetails from "../ui/payloads/IPaginationDetails";


export default interface ITagsCase extends IDataCase {
    
    selectedKey: string;
    kin: Array<ITreeSys>;
    paginationDetails: IPaginationDetails;
}
