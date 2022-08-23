import ISubtreeProject from "../../interfaces/state/tree/ISubtreeProject";
import ITreeFolder from "../../interfaces/state/tree/ITreeFolder";
import ITreeProjectUI from "../../interfaces/state/ui/UIs/ITreeProjectUI";
import ITreeProject from "../../interfaces/state/tree/ITreeProject";
import TreeProjectUI from "../ui/UIs/TreeProjectUI";
import TreeRoot from "./TreeRoot";


export default class TreeProject extends TreeRoot implements ITreeProject {

    constructor(key: string) {

        super(key);
    }

    public isSubtree: boolean = false;
    public deleteLock: boolean = false;
    public isBot: boolean = false;

    public aux: Array<ITreeFolder> = [];
    public subtrees: Array<ISubtreeProject> = [];

    public ui: ITreeProjectUI = new TreeProjectUI();
}

