import INodeLoader from "../../interfaces/state/tree/INodeLoader";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import INodeLoaderUI from "../../interfaces/state/ui/UIs/INodeLoaderUI";
import NodeLoaderUI from "../ui/UIs/NodeLoaderUI";


export default class NodeLoader implements INodeLoader {

    public key: string = "";
    public token: string = "";

    public node: INodeBase | null = null;
    public errors: Array<string> = [];
    public ui: INodeLoaderUI = new NodeLoaderUI();
}
