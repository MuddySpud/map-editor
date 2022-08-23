import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";
import ILinkDiscussionJson from "../interfaces/ILinkDiscussionJson";


export default class LinkDiscussionJson implements ILinkDiscussionJson {
    
    public type: DiscussionType = DiscussionType.LinkJson;
    public error: string = "";
    public link: string = "";
}
