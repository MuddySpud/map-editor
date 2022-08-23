import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import { ActionType } from "../../interfaces/enums/ActionType";


export default class TreeBase implements ITreeBase {

    public key: string | null = null;
    public r: string = "-1";
    public name: string = '';
    public title: string = '';
    public description: string = '';
    public notes: string = '';
    public token: string | null = null;
    public created: Date | null = null;
    public owner: string | null = null;
    public tags: string = "";
    public isFlat: boolean = false;
    public isLoop: boolean = false;
    public allowDiscussionPlugins: boolean = false;
    public allowOptionPlugins: boolean = true;
    public allowDiscussionPluginAudio: boolean = false;
    public errors: Array<string> = [];
    public action: ActionType = ActionType.None;
    public folders: string = "";
}
