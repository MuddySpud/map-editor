import ITreeBase from "./ITreeBase";
import ISubtreeUI from "../ui/UIs/ISubtreeUI";


export default interface ISpread {

    id: string;
    count: number;
    tree: ITreeBase;
    ui: ISubtreeUI;
    subSpreads: Array<ISpread>;
}
