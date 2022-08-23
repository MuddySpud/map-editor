import { Children, VNode } from "hyperapp-local";

import IState from "../state/IState";
import IDiscussionPlugin from "./IDiscussionPlugin";
import INode from "../state/tree/INode";
import ILensUI from "../state/ui/UIs/ILensUI";
import { DiscussionType } from "../enums/DiscussionType";
import INodeBase from "../state/tree/INodeBase";


export default interface IDiscussionPlugins {

    currentPlugin: IDiscussionPlugin | null;
    defaultDiscussionPlugin: IDiscussionPlugin;
    plugins: Array<IDiscussionPlugin>;

    buildDiscussionView(
        state: IState,
        lensNode: INode<ILensUI>,
        basicDiscussionView: boolean): Children[];

    buildButtonsView(
        state: IState,
        lensNode: INode<ILensUI>): Children[];

    buildExpandedEditorView(state: IState): VNode | null;
    getPluginName(discussionType: DiscussionType): string;
    pluginsOnRenderFinished(): void;
    validate(node: INodeBase): boolean;
    runsInBackground(): boolean;

    toJson(
        state: IState,
        lensNode: INode<ILensUI>): void;

    checkMatch(
        state: IState,
        lensNode: INode<ILensUI>): boolean;

    cleanUpForDeleteNode(
        state: IState,
        lensNode: INode<ILensUI>): void;

    checkCurrent(
        state: IState,
        lensNode: INode<ILensUI>): void;
}
