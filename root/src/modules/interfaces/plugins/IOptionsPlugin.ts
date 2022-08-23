import { VNode } from "hyperapp-local";

import { OptionType } from "../enums/OptionType";
import IState from "../state/IState";
import INode from "../state/tree/INode";
import ILensUI from "../state/ui/UIs/ILensUI";


export default interface IOptionsPlugin {

    name: string;
    type: OptionType;
    enabled: boolean;
    buttonsClassName: string;
    
    buildOptionView(
        lensNode: INode<ILensUI>,
        option: INode<ILensUI>,
        optionText: string,
        tooltip: string
    ): VNode | null;

    buildOptionButtonViews(
        state: IState,
        lensNode: INode<ILensUI>,
        option: INode<ILensUI>
    ): VNode[];

    toggleEnable(
        state: IState,
        lensNode: INode<ILensUI>
    ): boolean;

    setUp(
        state: IState,
        lensNode: INode<ILensUI>
    ): void;

    tearDown(
        state: IState,
        lensNode: INode<ILensUI>
    ): void;

    reHydrate(
        state: IState,
        lensNode: INode<ILensUI>
    ): boolean;

    toJson(lensNode: INode<ILensUI>): void;
    checkMatch(lensNode: INode<ILensUI> | null): boolean;
    onRenderFinished(): void;
    validate(lensNode: INode<ILensUI>): boolean;
    checkForNoChanges(lensNode: INode<ILensUI>): boolean;
}
