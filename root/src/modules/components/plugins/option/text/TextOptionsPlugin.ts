import { VNode } from "hyperapp-local";

import { OptionType } from "../../../../interfaces/enums/OptionType";
import IOptionsPlugin from "../../../../interfaces/plugins/IOptionsPlugin";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import textOptionViews from "./views/textOptionViews";
import textOptionCode from "./code/textOptionCode";
import INodeBase from "../../../../interfaces/state/tree/INodeBase";
import IState from "../../../../interfaces/state/IState";


export default class TextOptionsPlugin implements IOptionsPlugin {

    public name: string = "text";
    public type: OptionType = OptionType.Text;
    public enabled: boolean = false;
    public buttonsClassName: string = '';

    buildOptionView(
        _lensNode: INode<ILensUI>,
        option: INodeBase,
        optionText: string,
        tooltip: string): VNode | null {

        return textOptionViews.buildInnerOptionView(
            option,
            optionText,
            tooltip);
    }

    buildOptionButtonViews(
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

    toggleEnable(
        _state: IState,
        _lensNode: INode<ILensUI> | null): boolean {

        return false;
    }

    checkMatch(lensNode: INode<ILensUI> | null): boolean {

        return textOptionCode.checkMatch(lensNode);
    }

    reHydrate(
        _state: IState,
        _lensNode: INode<ILensUI>): boolean {

        // Default check is fine
        return false;
    }

    onRenderFinished(): void {

    }

    toJson(lensNode: INode<ILensUI>): void {

        textOptionCode.toJson(lensNode);
    }

    validate(_lensNode: INode<ILensUI>): boolean {

        // Default check is fine
        return true;
    }

    checkForNoChanges(_lensNode: INode<ILensUI>): boolean {

        // Default check is fine
        return true;
    }
}
