import ISocketLoader from "./ISocketLoader";
import ISubtreeSys from "./ISubtreeSys";


export default interface ISocketTask extends ISocketLoader {

    ghostSubtree: ISubtreeSys;
    lensSubtree: ISubtreeSys;
}
