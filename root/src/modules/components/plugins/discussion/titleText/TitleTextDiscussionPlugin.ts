import { Children, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import { DiscussionType } from "../../../../interfaces/enums/DiscussionType";
import IDiscussionPlugin from "../../../../interfaces/plugins/IDiscussionPlugin";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import titleTextDiscussionViews from "./views/titleTextDiscussionViews";
import titleTextDiscussionCode from "./code/titleTextDiscussionCode";
import imagesButtonViews from "./views/imagesButtonViews";


export default class TitleTextDiscussionPlugin implements IDiscussionPlugin {

    public name: string = "Title text discussion and options";
    public type: DiscussionType = DiscussionType.TitleTextJson;

    buildDiscussionView(
        state: IState,
        lensNode: INode<ILensUI>): Children[] {

        return titleTextDiscussionViews.buildDiscussionView(
            state,
            lensNode);
    }

    buildButtonsView(
        _state: IState,
        lensNode: INode<ILensUI>): Children[] {

        return imagesButtonViews.buildShowImagesViewButton(lensNode);
    }

    setUp(
        _state: IState,
        lensNode: INode<ILensUI>): void {

        titleTextDiscussionCode.buildTitleTextJsonFromDiscussion(lensNode);
    }

    tearDown(
        _state: IState,
        _lensNode: INode<ILensUI>): void {
    }

    buildExpandedEditorView(_lensNode: INode<ILensUI> | null): VNode | null {

        return null;
    }

    checkMatch(lensNode: INode<ILensUI> | null): boolean {

        return titleTextDiscussionCode.checkMatch(lensNode);
    }

    onRenderFinished(): void {

    }

    toJson(lensNode: INode<ILensUI>): void {

        titleTextDiscussionCode.toJson(lensNode);
    }

    validate(lensNode: INode<ILensUI>): boolean {

        return titleTextDiscussionCode.validate(lensNode);
    }

    runsInBackground(): boolean {

        return false;
    }
}
