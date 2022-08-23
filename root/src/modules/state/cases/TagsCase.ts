import ITagsCase from "../../interfaces/state/cases/ITagsCase";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import IPaginationDetails from "../../interfaces/state/ui/payloads/IPaginationDetails";
import PaginationDetails from "../ui/payloads/PaginationDetails";


export default class TagsCase implements ITagsCase {

    constructor(defaultBatchSize: number) {

        this.paginationDetails = new PaginationDetails(
            0,
            defaultBatchSize,
            0
        );
    }

    public fresh: boolean = true;
    public selectedKey: string = "";
    public kin: Array<ITreeSys> = new Array<ITreeSys>();
    public paginationDetails: IPaginationDetails;
}

