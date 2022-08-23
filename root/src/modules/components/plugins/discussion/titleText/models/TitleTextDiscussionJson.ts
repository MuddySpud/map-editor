import ITitleTextDiscussionJson from "../interfaces/ITitleTextDiscussionJson";
import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";


export default class TitleTextDiscussionJson implements ITitleTextDiscussionJson {
    
    public type: DiscussionType = DiscussionType.TitleTextJson;
    public error: string = "";
    public title: string = "";
    public text: string = "";
}
