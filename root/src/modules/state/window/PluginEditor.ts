import { DiscussionType } from "../../interfaces/enums/DiscussionType";
import IPluginEditor from "../../interfaces/window/IPluginEditor";


export default class PluginEditor implements IPluginEditor {
    
    constructor(type: DiscussionType) {
        
        this.type = type;
    }

    public showEditor: boolean = false;
    public type: DiscussionType;
    public text: string = "";
}
