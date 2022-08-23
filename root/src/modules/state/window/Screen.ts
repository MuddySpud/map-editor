import IScreen from "../../interfaces/window/IScreen";


export default class Screen implements IScreen {
    
    public focusFilter: string | null = null;
    public lensScrollTop: number | null = null;
    public maxBranchDepth: number = 0;
}
