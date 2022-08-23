import IFailedAncestors from "../../interfaces/state/tree/IFailedAncestors";
import IAncestorKey from "../../interfaces/state/tree/IAncestorKey";


export default class FailedAncestors implements IFailedAncestors {

    public completed: boolean = false;
    public ancestorKeys: Array<IAncestorKey> = [];
}
