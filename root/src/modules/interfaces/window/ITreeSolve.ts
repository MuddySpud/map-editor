import IScreen from "./IScreen";
import IDiscussionPlugins from "../plugins/IDiscussionPlugins";
import IOptionsPlugins from "../plugins/IOptionsPlugins";


export default interface ITreeSolve {
    // this can be accessed both from the hyperApp code and the html

    screen: IScreen;
    discussionPlugins: IDiscussionPlugins;
    optionsPlugins: IOptionsPlugins;
}
