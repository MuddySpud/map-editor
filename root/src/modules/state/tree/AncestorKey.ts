import IAncestorKey from "../../interfaces/state/tree/IAncestorKey";


export default class AncestorKey implements IAncestorKey {

    constructor(
        nodeKey: string,
        ancestorKey: string) {
            this.nodeKey = nodeKey;
            this.ancestorKey = ancestorKey;
        }

    public nodeKey: string;
    public ancestorKey: string;
}
