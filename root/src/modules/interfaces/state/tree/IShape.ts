import ITreeBase from "./ITreeBase";
import ISubtreeUI from "../ui/UIs/ISubtreeUI";


export default interface IShape {

    id: string;
    count: number;
    tree: ITreeBase;
    ui: ISubtreeUI;
    subShapes: Array<IShape>;
}
