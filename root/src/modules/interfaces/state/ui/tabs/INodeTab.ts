import INode from "../../tree/INode";
import ILensUI from "../UIs/ILensUI";
import IBranchTask from "../../tree/IBranchTask";
import IStageBehaviour from "../../../behaviours/IStageBehaviour";
import IBranchTreeTask from "../../tree/IBranchTreeTask";
import ITabSave from "./ITabSave";
import ISocketTask from "../../tree/ISocketTask";
import ITreeStats from "../../tree/ITreeStats";
import IBookmarkNavigation from "../../tree/IBookmarkNavigation";


export default interface INodeTab extends ITabSave {

    enableSave: boolean;
    lensNode: INode<ILensUI> | null;
    lensSocketTask: ISocketTask | null;
    lensBranchTask: IBranchTask | null;
    lensBranchTreeTask: IBranchTreeTask | null;
    altsStageBehaviour: IStageBehaviour;
    lensBookmarkNavigation: IBookmarkNavigation | null;
    treeStats: ITreeStats | null;
}
