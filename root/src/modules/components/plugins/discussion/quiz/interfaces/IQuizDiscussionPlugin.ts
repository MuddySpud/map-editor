import IDiscussionPlugin from "../../../../../interfaces/plugins/IDiscussionPlugin";
import IMdEditor from "../../markdown/interfaces/IMdEditor";


export default interface IQuizDiscussionPlugin extends IDiscussionPlugin {

    mdEditor: IMdEditor | null;
}
