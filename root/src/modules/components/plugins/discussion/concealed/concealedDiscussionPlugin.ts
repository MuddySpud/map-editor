import { Children, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import { DiscussionType } from "../../../../interfaces/enums/DiscussionType";
import IDiscussionPlugin from "../../../../interfaces/plugins/IDiscussionPlugin";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import concealedDiscussionViews from "./views/concealedDiscussionViews";
import concealedDiscussionCode from "./code/concealedDiscussionCode";
import { OptionType } from "../../../../interfaces/enums/OptionType";


export default class concealedDiscussionPlugin implements IDiscussionPlugin {

    public name: string = "Concealed discussion and options";
    public type: DiscussionType = DiscussionType.ConcealedJson;

    buildDiscussionView(
        state: IState,
        lensNode: INode<ILensUI>): Children[] {

        return concealedDiscussionViews.buildDiscussionView(
            state,
            lensNode
        );
    }

    buildButtonsView(
        _state: IState,
        _lensNode: INode<ILensUI>): Children[] {

        return [];
    }

    setUp(
        state: IState,
        lensNode: INode<ILensUI>): void {

        concealedDiscussionCode.buildConcealedDiscussionJsonFromDiscussion(lensNode);

        window.TreeSolve.optionsPlugins.setUp(
            state,
            lensNode,
            OptionType.ConcealedJson);
    }

    tearDown(
        state: IState,
        lensNode: INode<ILensUI>): void {

        lensNode.ui.discussionJson = null;
        lensNode.ui.ghostDiscussionJson = null;

        window.TreeSolve.optionsPlugins.tearDown(
            state,
            lensNode,
            OptionType.ConcealedJson);
    }

    buildExpandedEditorView(_lensNode: INode<ILensUI> | null): VNode | null {

        return null;
    }

    checkMatch(lensNode: INode<ILensUI> | null): boolean {

        return concealedDiscussionCode.checkMatch(lensNode);
    }

    onRenderFinished(): void {

    }

    toJson(lensNode: INode<ILensUI>): void {

        concealedDiscussionCode.toJson(lensNode);
    }

    validate(lensNode: INode<ILensUI>): boolean {

        return concealedDiscussionCode.validate(lensNode);
    }

    runsInBackground(): boolean {

        return true;
    }
}
