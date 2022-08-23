import IDiscussionJson from "../../../../../interfaces/state/ui/IDiscussionJson";


export default interface IMarkdownJson extends IDiscussionJson {
    
    text: string;
    markdown: string;
    textError: string;
    markdownError: string;
}
