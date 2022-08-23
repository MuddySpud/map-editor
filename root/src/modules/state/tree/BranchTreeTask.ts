import IBranchTreeTask from "../../interfaces/state/tree/IBranchTreeTask";
import ISocketLoader from "../../interfaces/state/tree/ISocketLoader";
import SocketLoader from "./SocketLoader";
import ISubtreeLoader from "../../interfaces/state/tree/ISubtreeLoader";
import SubtreeLoader from "./SubtreeLoader";
import { ActionType } from "../../interfaces/enums/ActionType";


export default class BranchTreeTask implements IBranchTreeTask {

    constructor(
        key: string,
        token: string) {

            this.subtreeLoader = new SubtreeLoader(key);

            this.socketLoader = new SocketLoader(
                '',
                token,
                ''
            );
        }

    public socketLoader: ISocketLoader;
    public subtreeLoader: ISubtreeLoader;
    public action: ActionType = ActionType.None;

}
