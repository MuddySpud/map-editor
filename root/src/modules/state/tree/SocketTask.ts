import ISocketTask from "../../interfaces/state/tree/ISocketTask";
import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import SocketLoader from "./SocketLoader";


export default class SocketTask extends SocketLoader implements ISocketTask {

    constructor(
        ghostSubtree: ISubtreeSys,
        lensSubtree: ISubtreeSys,
        optionKey: string,
        token: string,
        stSocketKey: string) {

        super(
            optionKey,
            token,
            stSocketKey
        );

        this.ghostSubtree = ghostSubtree;
        this.lensSubtree = lensSubtree;
    }

    public ghostSubtree: ISubtreeSys;
    public lensSubtree: ISubtreeSys;
}
