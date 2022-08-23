import { VNode } from "hyperapp-local";

import { OptionType } from "../../../../interfaces/enums/OptionType";
import IOptionsPlugin from "../../../../interfaces/plugins/IOptionsPlugin";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import concealedOptionViews from "./views/concealedOptionViews";
import concealedOptionCode from "./code/concealedOptionCode";
import IState from "../../../../interfaces/state/IState";


export default class ConcealedOptionsPlugin implements IOptionsPlugin {

    public name: string = "concealed";
    public type: OptionType = OptionType.ConcealedJson;
    public enabled: boolean = true;
    public buttonsClassName: string = "concealed-option"

    buildOptionView(
        _lensNode: INode<ILensUI>,
        option: INode<ILensUI>,
        _optionText: string,
        _tooltip: string): VNode | null {

        return concealedOptionViews.buildInnerOptionView(option);
    }

    buildOptionButtonViews(
        _state: IState,
        _lensNode: INode<ILensUI>): VNode[] {

        return [];
    }

    setUp(
        _state: IState,
        lensNode: INode<ILensUI>): void {

        concealedOptionCode.giveLensNodeNewConcealedOptionJson(lensNode);

        lensNode.nodes.forEach((option: INode<ILensUI>) => {

            if (!option.isHidden) {
                
                concealedOptionCode.ensureConcealedOptionJson(option);
            }
        });
    }

    tearDown(
        _state: IState,
        lensNode: INode<ILensUI>): void {

        lensNode.ui.optionJson = null;

        lensNode.nodes.forEach((option: INode<ILensUI>) => {

            option.ui.optionJson = null;
        });
    }

    toggleEnable(
        _state: IState,
        _lensNode: INode<ILensUI>): boolean {

        return true;
    }

    reHydrate(
        _state: IState,
        lensNode: INode<ILensUI>): boolean {

        this.enabled = concealedOptionCode.reHydrate(lensNode);

        return this.enabled;
    }

    checkMatch(lensNode: INode<ILensUI> | null): boolean {

        return concealedOptionCode.checkMatch(lensNode);
    }

    onRenderFinished(): void {

    }

    toJson(lensNode: INode<ILensUI>): void {

        concealedOptionCode.toJson(lensNode);
    }

    validate(lensNode: INode<ILensUI>): boolean {

        return concealedOptionCode.validate(lensNode);
    }

    checkForNoChanges(lensNode: INode<ILensUI>): boolean {

        return concealedOptionCode.checkForNoChanges(lensNode);
    }
}
