import ITreeSys from "../../tree/ITreeSys";
import ITabSave from "./ITabSave";
import ITreeStats from "../../tree/ITreeStats";
import ISubtreeSys from "../../tree/ISubtreeSys";
import INodeBase from "../../tree/INodeBase";


export default interface ITreeTab extends ITabSave {

    display: boolean;
    loadingKey: string | null;
    ghostTree: ITreeSys | null;
    cloneOriginalTree: ITreeSys | null;
    lensTree: ITreeSys | null;
    ghostSubtree: ISubtreeSys | null;
    lensSubtree: ISubtreeSys | null;
    holes: Array<INodeBase>;
    stats: ITreeStats | null;
}
