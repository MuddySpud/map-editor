import ITreeResults from "../../interfaces/state/Search/ITreeResults";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";


export default class TreeResults implements ITreeResults {

    public selectedIndex: number = -1;
    public results: Array<ITreeBase> = new Array<ITreeBase>();
}
