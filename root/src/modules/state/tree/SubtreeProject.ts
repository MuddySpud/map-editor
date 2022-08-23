import ISubtreeProject from "../../interfaces/state/tree/ISubtreeProject";
import TreeProject from "./TreeProject";


export default class SubtreeProject extends TreeProject implements ISubtreeProject {

    constructor(key: string) {

        super(key);
    }

    public hasChildren: boolean = false;
}

