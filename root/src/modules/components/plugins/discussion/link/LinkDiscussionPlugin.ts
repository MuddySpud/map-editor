import { Children, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import { DiscussionType } from "../../../../interfaces/enums/DiscussionType";
import IDiscussionPlugin from "../../../../interfaces/plugins/IDiscussionPlugin";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import linkDiscussionViews from "./views/linkDiscussionViews";
import linkJsonDiscussionCode from "./code/linkDiscussionCode";


export default class LinkDiscussionPlugin implements IDiscussionPlugin {

    public name: string = "Link discussion";
    public type: DiscussionType = DiscussionType.LinkJson;

    buildDiscussionView(
        state: IState,
        lensNode: INode<ILensUI>): Children[] {

        return linkDiscussionViews.buildDiscussionView(
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

        linkJsonDiscussionCode.buildLinkJsonFromDiscussion(lensNode);
    }

    tearDown(
        _state: IState,
        _lensNode: INode<ILensUI>): void {
    }

    buildExpandedEditorView(_lensNode: INode<ILensUI> | null): VNode | null {

        return null;
    }

    checkMatch(lensNode: INode<ILensUI> | null): boolean {

        return linkJsonDiscussionCode.checkMatch(lensNode);
    }

    onRenderFinished(): void {

    }

    toJson(lensNode: INode<ILensUI>): void {

        linkJsonDiscussionCode.toJson(lensNode);
    }

    validate(lensNode: INode<ILensUI>): boolean {

        return linkJsonDiscussionCode.validate(lensNode);
    }

    runsInBackground(): boolean {

        return false;
    }
}
