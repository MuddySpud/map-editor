import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";
import IMarkdownJson from "../interfaces/IMarkdownJson";


export default class MarkdownJson implements IMarkdownJson {
    
    public type: DiscussionType = DiscussionType.MarkdownJson;
    public text: string = "";
    public markdown: string = "";
    public textError: string = "";
    public markdownError: string = "";
}
