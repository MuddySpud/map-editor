import ITreeTab from "../../../interfaces/state/ui/tabs/ITreeTab";
import IStageBehaviour from "../../../interfaces/behaviours/IStageBehaviour";
import gStageCode from "../../../global/code/gStageCode";
import ITreeSys from "../../../interfaces/state/tree/ITreeSys";
import ITreeStats from "../../../interfaces/state/tree/ITreeStats";
import ISubtreeSys from "../../../interfaces/state/tree/ISubtreeSys";
import INodeBase from "../../../interfaces/state/tree/INodeBase";
import { TabType } from "../../../interfaces/enums/TabType";


export default class TreeTab implements ITreeTab {

    public type: TabType = TabType.Tree;
    public enableSave: boolean = false;
    public saveLock: boolean = false;
    public display: boolean = false;
    public loadingKey: string | null = null;
    public ghostTree: ITreeSys | null = null;
    public cloneOriginalTree: ITreeSys | null = null;
    public lensTree: ITreeSys | null = null;
    public ghostSubtree: ISubtreeSys | null = null;
    public lensSubtree: ISubtreeSys | null = null;
    public holes: Array<INodeBase> = [];
    public stageBehaviour: IStageBehaviour = gStageCode.buildTreeHubStages();
    public stats: ITreeStats | null = null
}
