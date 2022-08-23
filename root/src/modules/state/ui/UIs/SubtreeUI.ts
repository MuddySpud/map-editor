import ISubtreeUI from "../../../interfaces/state/ui/UIs/ISubtreeUI";


export default class SubtreeUI implements ISubtreeUI {

    public expanded: boolean = true;
    public selected: boolean = false;
    public raw: boolean = true;
    public minimise: boolean = true;
    public minimiseCounts: boolean = true;
    public minimiseFlaws: boolean = true;
    public minimiseStRoot: boolean = true;
    public minimiseStSockets: boolean = true;
}
