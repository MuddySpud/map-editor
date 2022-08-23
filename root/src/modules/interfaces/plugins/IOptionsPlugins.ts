import { VNode } from "hyperapp-local";

import IState from "../state/IState";
import INode from "../state/tree/INode";
import ILensUI from "../state/ui/UIs/ILensUI";
import { OptionType } from "../enums/OptionType";
import IOptionsPlugin from "./IOptionsPlugin";
import INodeBase from "../state/tree/INodeBase";


export default interface IOptionsPlugins {

    currentPlugin: IOptionsPlugin | null;
    defaultOptionPlugin: IOptionsPlugin;
    plugins: Array<IOptionsPlugin>;

    toggleEnableOptionPlugins(state: IState): void;
    getPluginName(OptionType: OptionType): string;
    pluginsOnRenderFinished(): void;
    validate(node: INodeBase): boolean;
    checkForNoChanges(node: INodeBase): boolean;

    buildOptionsView(
        state: IState,
        lensNode: INode<ILensUI>,
        optionsHeader: string,
        optionText: string,
        showAddRemove: boolean
    ): VNode | null;

    buildOptionButtonsView(
        state: IState,
        lensNode: INode<ILensUI>,
        option: INode<ILensUI>
    ): VNode[];

    setUp(
        state: IState,
        lensNode: INode<ILensUI>,
        optionType: OptionType
    ): void;

    tearDown(
        state: IState,
        lensNode: INode<ILensUI>,
        optionType: OptionType
    ): void;

    toJson(
        state: IState,
        lensNode: INode<ILensUI>
    ): void;

    checkMatch(
        state: IState,
        lensNode: INode<ILensUI>
    ): boolean;

    reHydrate(
        state: IState,
        lensNode: INode<ILensUI>
    ): void;

    checkCurrent(
        state: IState,
        lensNode: INode<ILensUI>
    ): void;
}
