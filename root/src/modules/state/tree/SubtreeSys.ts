import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import StRoot from "./StRoot";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import IStRoot from "../../interfaces/state/tree/IStRoot";
import IStSocket from "../../interfaces/state/tree/IStSocket";
import { ActionType } from "../../interfaces/enums/ActionType";
import ISubtreeUI from "../../interfaces/state/ui/UIs/ISubtreeUI";
import SubtreeUI from "../ui/UIs/SubtreeUI";


export default class SubtreeSys implements ISubtreeSys {

    constructor(
        tree: ITreeSys,
        stRoot: IStRoot) {

        this.tree = tree;
        this.stRoot = stRoot;
        this.stSockets = [];
    }

    public tree: ITreeSys;
    public stRoot: IStRoot;
    public stSockets: Array<IStSocket> = [];

    public errors: Array<string> = [];
    public action: ActionType = ActionType.None;
    public ui: ISubtreeUI = new SubtreeUI();

    public static newSubtreeFromTree = (tree: ITreeSys): SubtreeSys => {

        return new SubtreeSys(
            tree,
            new StRoot());
    };
}
