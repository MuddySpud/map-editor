import INodeAlts from "../../interfaces/state/tree/INodeAlts";
import IKeyValuePair from "../../interfaces/state/tree/IKeyValuePair";


export default class NodeAlts implements INodeAlts {

    public key: string = "-1";
    public r: string = "-1";
    public alts: Array<IKeyValuePair> = [];
}
