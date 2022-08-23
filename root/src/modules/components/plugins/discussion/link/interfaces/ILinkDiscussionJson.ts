import IDiscussionJson from "../../../../../interfaces/state/ui/IDiscussionJson";


export default interface ILinkDiscussionJson extends IDiscussionJson {
    
    error: string;
    link: string;
}
