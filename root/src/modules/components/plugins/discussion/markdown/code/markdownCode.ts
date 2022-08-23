import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";
import gNodeCode from "../../../../../global/code/gNodeCode";
import U from "../../../../../global/gUtilities";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import IMarkdownJson from "../interfaces/IMarkdownJson";
import MarkdownJson from "../models/MarkdownJson";
import IMarkdownDiscussionPlugin from "../interfaces/IMarkdownDiscussionPlugin";
import IMdEditor from "../interfaces/IMdEditor";
import gPluginCode from "../../../../../global/code/gPluginCode";


const markdownCode = {

    tryGetMarkdownPlugin: (): IMarkdownDiscussionPlugin | null => {

        if (!window.TreeSolve.discussionPlugins.currentPlugin
            || window.TreeSolve.discussionPlugins.currentPlugin.type !== DiscussionType.MarkdownJson) {

            return null;
        }

        return window.TreeSolve.discussionPlugins.currentPlugin as IMarkdownDiscussionPlugin;
    },

    tryGetMdEditor: (): IMdEditor | null => {

        const markdownDiscussionPlugin: IMarkdownDiscussionPlugin | null = markdownCode.tryGetMarkdownPlugin();

        if (!markdownDiscussionPlugin) {

            return null;
        }

        return markdownDiscussionPlugin.mdEditor;
    },

    checkMatch: (node: INode<ILensUI> | null): boolean => {

        if (!node
            || !node.ui.discussionJson
            || node.ui.discussionJson.type !== DiscussionType.MarkdownJson) {

            return true;
        }

        const markdownJson: IMarkdownJson = node.ui.discussionJson as IMarkdownJson;
        const ghostMarkdownJson: IMarkdownJson = node.ui.ghostDiscussionJson as IMarkdownJson;

        if ((!markdownJson && ghostMarkdownJson)
            || (markdownJson && !ghostMarkdownJson)
            || markdownJson.markdown !== ghostMarkdownJson.markdown
            || markdownJson.text !== ghostMarkdownJson.text) {

            return false;
        }

        return true;
    },

    validate: (node: INode<ILensUI>): boolean => {

        if (!node) {

            return false;
        }

        const markdownJson: IMarkdownJson = node.ui.discussionJson as IMarkdownJson;

        if (!markdownJson) {

            return false;
        }

        const success: boolean = markdownCode.validateMarkdown(
            node,
            markdownJson
        );

        return markdownCode.validateText(
            node,
            markdownJson
        )
            && success;
    },

    validateMarkdown: (
        node: INode<ILensUI>,
        markdownJson: IMarkdownJson): boolean => {

        markdownJson.markdownError = "";

        if (U.isNullOrWhiteSpace(markdownJson.markdown)) {

            const errorMessage = `Discussion markdown cannot be an empty string`;

            gNodeCode.setError(
                node,
                errorMessage
            );

            markdownJson.markdownError = errorMessage;

            return false;
        }

        return true;
    },

    validateText: (
        node: INode<ILensUI>,
        markdownJson: IMarkdownJson): boolean => {

        markdownJson.textError = "";

        if (U.isNullOrWhiteSpace(markdownJson.text)) {

            const errorMessage = `Discussion text cannot be an empty string`;

            gNodeCode.setError(
                node,
                errorMessage
            );

            markdownJson.textError = errorMessage;

            return false;
        }

        return true;
    },

    buildMarkdownJsonFromDiscussion: (node: INode<ILensUI>): void => {

        if (node.ui.discussionJson?.type === DiscussionType.MarkdownJson) {
            return;
        }

        let markdownJson: IMarkdownJson;

        if (!node.ui.discussionJson
            && node.discussion.trim().startsWith("{")) {

            markdownJson = JSON.parse(node.discussion) as IMarkdownJson;
            markdownJson.type = DiscussionType.MarkdownJson;
        }
        else {
            markdownJson = new MarkdownJson();
            markdownJson.text = node.discussion;
        }

        markdownJson.markdown = !markdownJson.markdown ? "" : markdownJson.markdown;
        markdownJson.text = !markdownJson.text ? "" : markdownJson.text;
        
        node.ui.discussionJson = markdownJson;
        node.ui.ghostDiscussionJson = markdownCode.cloneMarkdown(markdownJson);
        gPluginCode.ensureBinDiscussionExists(node);
        node.bin.discussion.type = DiscussionType.MarkdownJson;
    },

    cleanMarkdown: (rawMarkdown: IMarkdownJson): IMarkdownJson => {

        const markdown: IMarkdownJson = new MarkdownJson();

        if (typeof (rawMarkdown.markdown) === "string"
            && !U.isNullOrWhiteSpace(rawMarkdown.markdown)) {

            markdown.markdown = `${rawMarkdown?.markdown}`;
        }

        if (typeof (rawMarkdown.text) === "string"
            && !U.isNullOrWhiteSpace(rawMarkdown.text)) {

            markdown.text = `${rawMarkdown?.text}`;
        }

        return markdown;
    },

    cloneMarkdown: (rawMarkdown: IMarkdownJson): IMarkdownJson => {

        const markdown: IMarkdownJson = new MarkdownJson();
        markdown.markdown = rawMarkdown.markdown;
        markdown.text = rawMarkdown.text;

        return markdown;
    },

    toJson: (node: INode<ILensUI>): void => {

        const markdownJson: IMarkdownJson = node.ui.discussionJson as IMarkdownJson;

        if (!markdownJson) {

            return;
        }

        const markdown = {

            markdown: markdownJson.markdown,
            text: markdownJson.text
        };

        node.discussion = JSON.stringify(markdown);

        if (!node.bin) {

            node.bin = {};
        }

        if (!node.bin.discussion) {

            node.bin.discussion = {};
        }

        node.bin.discussion.type = DiscussionType.MarkdownJson;
    }
}

export default markdownCode;
