import ISocketLoader from "./ISocketLoader";
import ISubtreeLoader from "./ISubtreeLoader";
import { ActionType } from "../../enums/ActionType";


export default interface IBranchTreeTask {

    socketLoader: ISocketLoader;
    subtreeLoader: ISubtreeLoader;
    action: ActionType;
}
