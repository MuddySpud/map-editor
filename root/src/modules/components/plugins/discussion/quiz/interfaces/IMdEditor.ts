import Editor from "@toast-ui/editor";

import IPluginEditor from "../../../../../interfaces/window/IPluginEditor";


export default interface IMdEditor extends IPluginEditor {
    
    editor: Editor | null;
}
