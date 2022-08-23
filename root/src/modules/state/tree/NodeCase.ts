import INodeAlts from "../../interfaces/state/tree/INodeAlts";
import INodeCase from "../../interfaces/state/tree/INodeCase";


export default class NodeCase implements INodeCase {

    public alts: INodeAlts | null = null;
}
