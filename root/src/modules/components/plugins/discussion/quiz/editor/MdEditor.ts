import Editor from "@toast-ui/editor";

import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";
import IMdEditor from "../interfaces/IMdEditor";
import PluginEditor from "../../../../../state/window/PluginEditor";


export default class MdEditor extends PluginEditor implements IMdEditor {
    
    constructor() {

        super(DiscussionType.MarkdownJson);
    }
    
    public editor: Editor | null = null;
}
