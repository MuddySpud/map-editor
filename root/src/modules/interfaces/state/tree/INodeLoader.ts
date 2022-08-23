import INodeBase from "./INodeBase";
import INodeLoaderUI from "../ui/UIs/INodeLoaderUI";


export default interface INodeLoader {

    key: string;
    token: string;

    node: INodeBase | null;
    errors: Array<string>;
    ui: INodeLoaderUI;
}
