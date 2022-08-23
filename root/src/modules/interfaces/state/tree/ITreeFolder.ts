import { FolderType } from "../../enums/FolderType";


export default interface ITreeFolder {
    
    name: string;
    type: FolderType;
    key: string | null;
    folders: Array<ITreeFolder>
}