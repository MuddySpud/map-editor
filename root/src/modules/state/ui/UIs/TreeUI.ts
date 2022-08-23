import ITreeUI from "../../../interfaces/state/ui/UIs/ITreeUI";


export default class TreeUI implements ITreeUI {

    public show: boolean = false;
    public raw: boolean = true;
    public minimise: boolean = true;
    public nodesChanged: boolean = false;
}
