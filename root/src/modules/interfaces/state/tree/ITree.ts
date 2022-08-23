import INode from "./INode";
import ITreeBase from "./ITreeBase";


export default interface ITree<T> extends ITreeBase {

    root: INode<T>;
    isSubtree: boolean;
    isBot: boolean;
}
