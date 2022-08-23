import INode from "../../../interfaces/state/tree/INode";
import ILensUI from "../../../interfaces/state/ui/UIs/ILensUI";
import IBranchTask from "../../../interfaces/state/tree/IBranchTask";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import gStageCode from "../../../global/code/gStageCode";
import IBranchTreeTask from "../../../interfaces/state/tree/IBranchTreeTask";
import INodeTab from "../../../interfaces/state/ui/tabs/INodeTab";
import ISocketTask from "../../../interfaces/state/tree/ISocketTask";
import { TabType } from "../../../interfaces/enums/TabType";
import ITreeStats from "../../../interfaces/state/tree/ITreeStats";
import IBookmarkNavigation from "../../../interfaces/state/tree/IBookmarkNavigation";


export default class NodeTab implements INodeTab {

    public type: TabType = TabType.Node;
    public enableSave: boolean = false;
    public saveLock: boolean = false;
    public lensNode: INode<ILensUI> | null = null;
    public lensSocketTask: ISocketTask | null = null;
    public lensBranchTask: IBranchTask | null = null;
    public lensBranchTreeTask: IBranchTreeTask | null = null;
    public lensBookmarkNavigation: IBookmarkNavigation | null = null;

    public stageBehaviour: IStageBehaviour = gStageCode.buildEditNodeStages();
    public altsStageBehaviour: IStageBehaviour = gStageCode.buildEditNodeStages();
    public treeStats: ITreeStats | null = null;
}
