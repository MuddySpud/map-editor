import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import IMdEditor from "../interfaces/IMdEditor";
import IMarkdownJson from "../interfaces/IMarkdownJson";
import markdownCode from "../code/markdownCode";


const mdEditorActions = {

    close: (state: IState): IState => {

        const mdEditor: IMdEditor | null = markdownCode.tryGetMdEditor();

        if (!mdEditor
            || !mdEditor.editor) {

            return state;
        }

        mdEditor.showEditor = false;

        return gStateCode.cloneState(state);
    },

    done: (state: IState): IState => {

        if (state
            && state.lens.nodeTab.lensNode) {

                const mdEditor: IMdEditor | null = markdownCode.tryGetMdEditor();

            if (mdEditor
                && mdEditor.editor) {

                const markdownJson: IMarkdownJson = state.lens.nodeTab.lensNode.ui.discussionJson as IMarkdownJson;

                if (markdownJson) {

                    markdownJson.markdown = mdEditor.editor.getMarkdown();
                    state.lens.nodeTab.lensNode.ui.raw = false;
                }

                mdEditor.showEditor = false;
            }
        }

        return gStateCode.cloneState(state);
    }
};

export default mdEditorActions;