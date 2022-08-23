import { Children, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import { DiscussionType } from "../../../../interfaces/enums/DiscussionType";
import IDiscussionPlugin from "../../../../interfaces/plugins/IDiscussionPlugin";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import textDiscussionViews from "./views/textDiscussionViews";
import textDiscussionCode from "./code/textDiscussionCode";


export default class TextDiscussionPlugin implements IDiscussionPlugin {

    public name: string = "Text discussion";
    public type: DiscussionType = DiscussionType.Text;

    buildDiscussionView(
        state: IState,
        lensNode: INode<ILensUI>): VNode[] {

        return textDiscussionViews.buildDiscussionView(
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
        _lensNode: INode<ILensUI>): void {
    }

    tearDown(
        _state: IState,
        _lensNode: INode<ILensUI>): void {
    }

    buildExpandedEditorView(_lensNode: INode<ILensUI> | null): VNode | null {

        return null;
    }

    checkMatch(lensNode: INode<ILensUI> | null): boolean {

        return textDiscussionCode.checkMatch(lensNode);
    }

    onRenderFinished(): void {

    }

    toJson(lensNode: INode<ILensUI>): void {

        textDiscussionCode.toJson(lensNode);
    }

    validate(lensNode: INode<ILensUI>): boolean {

        return textDiscussionCode.validate(lensNode);
    }

    runsInBackground(): boolean {

        return false;
    }
}
