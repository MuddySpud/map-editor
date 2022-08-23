import ITreeProjectUI from "../../../interfaces/state/ui/UIs/ITreeProjectUI";


export default class TreeProjectUI implements ITreeProjectUI {

    public show: boolean = false;
    public treeDetailsMinimised: boolean = true;
    public expanded: boolean = false;
    public loaded: boolean = false;
}
