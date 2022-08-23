import { Children, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import { DiscussionType } from "../../../../interfaces/enums/DiscussionType";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import markdownDiscussionViews from "./views/markdownDiscussionViews";
import mdEditorViews from "./views/mdEditorViews";
import markdownCode from "./code/markdownCode";
import markdownJsonOnRenderFinished from "./code/markdownJsonOnRenderFinished";
import IMarkdownDiscussionPlugin from "./interfaces/IMarkdownDiscussionPlugin";
import IMdEditor from "./interfaces/IMdEditor";


export default class MarkdownDiscussionPlugin implements IMarkdownDiscussionPlugin {

    public name: string = "Markdown discussion";
    public type: DiscussionType = DiscussionType.MarkdownJson;
    public mdEditor: IMdEditor | null = null;

    buildDiscussionView(
        state: IState,
        lensNode: INode<ILensUI>): VNode[] {

        // markdownCode.buildMarkdownJsonFromDiscussion(lensNode);

        return markdownDiscussionViews.buildDiscussionView(
            state,
            lensNode);
    }

    buildButtonsView(
        _state: IState,
        _lensNode: INode<ILensUI>): Children[] {

        return [];
    }

    setUp(
        _state: IState,
        lensNode: INode<ILensUI>): void {

        markdownCode.buildMarkdownJsonFromDiscussion(lensNode);
    }

    tearDown(
        _state: IState,
        _lensNode: INode<ILensUI>): void {
    }

    buildExpandedEditorView(): VNode | null {

        return mdEditorViews.buildView();
    }

    checkMatch(lensNode: INode<ILensUI> | null): boolean {

        return markdownCode.checkMatch(lensNode);
    }

    onRenderFinished(): void {

        return markdownJsonOnRenderFinished();
    }

    toJson(lensNode: INode<ILensUI>): void {

        markdownCode.toJson(lensNode);
    }

    validate(lensNode: INode<ILensUI>): boolean {

        return markdownCode.validate(lensNode);
    }

    runsInBackground(): boolean {

        return false;
    }
}
