import IDiscussionJson from "../../../../../interfaces/state/ui/IDiscussionJson";


export default interface ITitleTextDiscussionJson extends IDiscussionJson {
    
    error: string;
    title: string;
    text: string;
}
