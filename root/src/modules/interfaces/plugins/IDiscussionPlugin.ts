import { Children, VNode } from "hyperapp-local";

import { DiscussionType } from "../enums/DiscussionType";
import IState from "../state/IState";
import INode from "../state/tree/INode";
import ILensUI from "../state/ui/UIs/ILensUI";


export default interface IDiscussionPlugin {

    name: string;
    type: DiscussionType;

    buildDiscussionView(
        state: IState,
        lensNode: INode<ILensUI>): Children[];

    buildButtonsView(
        state: IState,
        lensNode: INode<ILensUI>): Children[];

    setUp(
        state: IState,
        lensNode: INode<ILensUI>): void;

    tearDown(
        state: IState,
        lensNode: INode<ILensUI>): void;

    buildExpandedEditorView(lensNode: INode<ILensUI> | null): VNode | null;
    checkMatch(lensNode: INode<ILensUI> | null): boolean;
    onRenderFinished(): void;
    toJson(lensNode: INode<ILensUI>): void;
    validate(lensNode: INode<ILensUI>): boolean;
    runsInBackground(): boolean;
}
