import { ActionType } from "../../enums/ActionType";


export default interface ITreeBase {
    
    key: string | null;
    r: string;
    name: string;
    title: string;
    description: string;
    notes: string;
    token: string | null;
    created: Date | null;
    owner: string | null;
    tags: string;
    isFlat: boolean;
    isLoop: boolean;
    allowDiscussionPlugins: boolean;
    allowOptionPlugins: boolean;
    allowDiscussionPluginAudio: boolean;
    errors: Array<string>;
    action: ActionType;
    folders: string;
}