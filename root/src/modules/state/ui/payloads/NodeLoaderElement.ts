import INodeLoaderElement from "../../../interfaces/state/ui/payloads/INodeLoaderElement";
import INodeLoader from "../../../interfaces/state/tree/INodeLoader";
import { LoaderType } from "../../../interfaces/enums/LoaderType";


export default class NodeLoaderElement implements INodeLoaderElement {

    constructor(
        nodeLoader: INodeLoader,
        element: HTMLElement,
        type: LoaderType) {

        this.nodeLoader = nodeLoader;
        this.element = element;
        this.type = type;
    }

    public nodeLoader: INodeLoader;
    public element: HTMLElement;
    public type: LoaderType;
}
