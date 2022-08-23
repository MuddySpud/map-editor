import IVideoUrlJson from "../interfaces/IVideoUrlJson";
import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";


export default class VideoUrlJson implements IVideoUrlJson {
    
    public type: DiscussionType = DiscussionType.VideoUrlJson;
    public error: string = "";
    public url: string = "";
}
