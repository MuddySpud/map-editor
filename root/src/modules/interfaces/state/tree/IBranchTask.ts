import INodeLoader from "./INodeLoader";
import { ActionType } from "../../enums/ActionType";


export default interface IBranchTask {

    optionLoader: INodeLoader;
    targetLoader: INodeLoader;
    action: ActionType;
}
