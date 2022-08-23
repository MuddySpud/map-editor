import INodeLoader from "../../tree/INodeLoader";
import { LoaderType } from "../../../enums/LoaderType";


export default interface INodeLoaderElement {
    
    nodeLoader: INodeLoader;
    element: HTMLElement;
    type: LoaderType;
}
