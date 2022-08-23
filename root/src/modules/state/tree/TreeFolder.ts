import { FolderType } from "../../interfaces/enums/FolderType";
import ITreeFolder from "../../interfaces/state/tree/ITreeFolder";


export default class TreeFolder implements ITreeFolder {

    constructor(name: string) {

        this.name = name;
    }

    public name: string;
    public key: string | null = null;
    public type: FolderType = FolderType.None;
    public folders: Array<ITreeFolder> = [];
}
