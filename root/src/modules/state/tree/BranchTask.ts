import IBranchTask from "../../interfaces/state/tree/IBranchTask";
import INodeLoader from "../../interfaces/state/tree/INodeLoader";
import NodeLoader from "./NodeLoader";
import { ActionType } from "../../interfaces/enums/ActionType";


export default class BranchTask implements IBranchTask {

    public optionLoader: INodeLoader = new NodeLoader();
    public targetLoader: INodeLoader = new NodeLoader();
    public action: ActionType = ActionType.None;
}
