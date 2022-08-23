import IOptionsPlugins from "../../interfaces/plugins/IOptionsPlugins";
import IDiscussionPlugins from "../../interfaces/plugins/IDiscussionPlugins";
import IScreen from "../../interfaces/window/IScreen";
import ITreeSolve from "../../interfaces/window/ITreeSolve";
import DiscussionPlugins from "../plugins/DiscussionPlugins";
import OptionsPlugins from "../plugins/OptionsPlugins";
import Screen from "./Screen";


export default class TreeSolve implements ITreeSolve {

    public screen: IScreen = new Screen();
    public discussionPlugins: IDiscussionPlugins = new DiscussionPlugins();
    public optionsPlugins: IOptionsPlugins = new OptionsPlugins();
}
