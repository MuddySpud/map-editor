import { VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import { DiscussionType } from "../../../../interfaces/enums/DiscussionType";
import IDiscussionPlugin from "../../../../interfaces/plugins/IDiscussionPlugin";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import videoDiscussionViews from "./views/videoDiscussionViews";
import videoCode from "./code/videoCode";


export default class VideoDiscussionPlugin implements IDiscussionPlugin {

    public name: string = "Video discussion";
    public type: DiscussionType = DiscussionType.VideoUrlJson;

    buildDiscussionView(
        state: IState,
        lensNode: INode<ILensUI>): VNode[] {

        videoCode.buildVideoUrlJsonFromDiscussion(lensNode);

        return videoDiscussionViews.buildDiscussionView(
            state,
            lensNode);
    }

    buildButtonsView(
        _state: IState,
        _lensNode: INode<ILensUI>): VNode[] {

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

        return videoCode.checkMatch(lensNode);
    }

    onRenderFinished(): void {

    }

    toJson(lensNode: INode<ILensUI>): void {

        return videoCode.toJson(lensNode);
    }

    validate(lensNode: INode<ILensUI>): boolean {

        return videoCode.validate(lensNode);
    }
        
    runsInBackground(): boolean {

        return false;
    }
}
