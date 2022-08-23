import IShape from "../../interfaces/state/tree/IShape";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import ISubtreeUI from "../../interfaces/state/ui/UIs/ISubtreeUI";
import SubtreeUI from "../ui/UIs/SubtreeUI";


export default class Shape implements IShape {

    constructor(
        id: string,
        tree: ITreeSys,
        count: number) {

        this.id = id;
        this.tree = tree;
        this.count = count;
    }

    public id: string;
    public count: number;
    public tree: ITreeBase;
    public ui: ISubtreeUI = new SubtreeUI();
    public subShapes: Array<IShape> = [];
}
