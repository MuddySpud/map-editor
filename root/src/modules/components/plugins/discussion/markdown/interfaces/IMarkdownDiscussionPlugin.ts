import IDiscussionPlugin from "../../../../../interfaces/plugins/IDiscussionPlugin";
import IMdEditor from "./IMdEditor";


export default interface IMarkdownDiscussionPlugin extends IDiscussionPlugin {

    mdEditor: IMdEditor | null;
}
