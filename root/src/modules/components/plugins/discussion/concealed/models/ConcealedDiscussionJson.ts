import IConcealedDiscussionJson from "../interfaces/IConcealedDiscussionJson";
import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";


export default class ConcealedDiscussionJson implements IConcealedDiscussionJson {
    
    public type: DiscussionType = DiscussionType.ConcealedJson;
    public error: string = "";
}
