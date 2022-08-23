import IReloadedNodeResult from "../../interfaces/state/tree/IReloadedNodeResult";
import INodeBase from "../../interfaces/state/tree/INodeBase";


export default class ReloadedNodeResult implements IReloadedNodeResult {

    constructor(
        newRawOptions: any[],
        deletedOptions: Array<INodeBase>
    ) {
        this.newRawOptions = newRawOptions;
        this.deletedOptions = deletedOptions;
    }

    public newRawOptions: any[];
    public deletedOptions: Array<INodeBase>;
}
