import TreeRoot from "./TreeRoot";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import ITreeUI from "../../interfaces/state/ui/UIs/ITreeUI";
import TreeUI from "../ui/UIs/TreeUI";


export default class TreeSys extends TreeRoot implements ITreeSys {

    constructor(key: string) {

        super(key);
    }

    public isSubtree: boolean = false;
    public deleteLock: boolean = false;
    public isBot: boolean = false;

    public ui: ITreeUI = new TreeUI();
}
