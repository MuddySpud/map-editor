import { DiscussionType } from "../enums/DiscussionType";


export default interface IPluginEditor {
    
    showEditor: boolean;
    type: DiscussionType;
    text: string;
}
