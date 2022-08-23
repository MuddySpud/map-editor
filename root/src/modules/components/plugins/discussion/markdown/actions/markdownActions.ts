import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";
import IMdEditor from "../interfaces/IMdEditor";
import INodeBaseElement from "../../../../../interfaces/state/ui/payloads/INodeBaseElement";
import IMarkdownJson from "../interfaces/IMarkdownJson";
import IMarkdownDiscussionPlugin from "../interfaces/IMarkdownDiscussionPlugin";
import markdownCode from "../code/markdownCode";
import MdEditor from "../editor/MdEditor";


const markdownActions = {

    showMarkdownEditor: (
        state: IState,
        markdown: string): IState => {

        if (!state.lens.nodeTab.lensNode) {

            return state;
        }

        const markdownDiscussionPlugin: IMarkdownDiscussionPlugin | null = markdownCode.tryGetMarkdownPlugin();

        if (!markdownDiscussionPlugin) {

            return state;
        }

        const mdEditor: IMdEditor = new MdEditor();
        markdownDiscussionPlugin.mdEditor = mdEditor;
        mdEditor.showEditor = true;
        mdEditor.text = markdown;

        return gStateCode.cloneState(state);
    },

    setDiscussionMarkdown: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (state.lens.nodeTab.lensNode?.ui.discussionJson
            && state.lens.nodeTab.lensNode?.ui.discussionJson.type === DiscussionType.MarkdownJson) {

            const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
            const markdownJson: IMarkdownJson = state.lens.nodeTab.lensNode.ui.discussionJson as IMarkdownJson;
            markdownJson.markdown = `${textarea.value}`;
            state.lens.nodeTab.lensNode.ui.raw = false;
        }

        return gStateCode.cloneState(state);
    },

    setDiscussionText: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (state.lens.nodeTab.lensNode?.ui.discussionJson
            && state.lens.nodeTab.lensNode?.ui.discussionJson.type === DiscussionType.MarkdownJson) {

            const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
            const markdownJson: IMarkdownJson = state.lens.nodeTab.lensNode.ui.discussionJson as IMarkdownJson;
            markdownJson.text = `${textarea.value}`;
            state.lens.nodeTab.lensNode.ui.raw = false;
        }

        return gStateCode.cloneState(state);
    }
};

export default markdownActions;
