import { h, VNode } from "hyperapp-local";

import inputViews from "./inputViews";
import IBranchTask from "../../../../../../../interfaces/state/tree/IBranchTask";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import { LensStage } from "../../../../../../../interfaces/enums/LensStage";
import overlayViews from "../../../../../lens/views/overlayViews";
import branchTaskActions from "../../../actions/branchTaskActions";
import INodeLoader from "../../../../../../../interfaces/state/tree/INodeLoader";
import IState from "../../../../../../../interfaces/state/IState";


const selectNodeViews = {

    buildOverlayView: (
        state: IState,
        clickSelect: boolean,
        closeTooltip: string,
        className: string,
        instruction: string,
        buttonAction: (state: IState) => IState,
        closeAction: (state: IState) => IState): void => {

        if (clickSelect === true) {

            const overlayDelegate = (): VNode => {

                return overlayViews.buildButtonOverlayView(
                    instruction,
                    "Enter values manually",
                    closeTooltip,
                    className,
                    buttonAction,
                    closeAction
                );
            }

            state.lens.overlayDelegate = overlayDelegate;
        }
    },

    buildDetailsView: (
        state: IState,
        branchTask: IBranchTask,
        stageBehaviour: IStageBehaviour,
        optionSelectInstruction: string,
        targetSelectInstruction: string,
        targetRaw: boolean,
        optionRaw: boolean): VNode | null => {

        const stage: LensStage = stageBehaviour.getStage();

        if (stage === LensStage.SelectBranchTaskTarget) {

            return selectNodeViews.buildTargetDetailsView(
                state,
                branchTask.targetLoader,
                targetSelectInstruction,
                targetRaw);
        }
        else if (stage === LensStage.SelectBranchTaskOption) {

            return selectNodeViews.buildOptionDetailsView(
                state,
                branchTask.optionLoader,
                optionSelectInstruction,
                optionRaw);
        }

        return null;
    },

    buildRootDetailsView: (
        state: IState,
        option: INodeLoader,
        selectInstruction: string,
        raw: boolean): VNode => {

        selectNodeViews.buildOverlayView(
            state,
            option.ui.clickSelect,
            "Clear select root",
            "overlay-option",
            selectInstruction, //"Select the option to move",
            branchTaskActions.cancelOptionClickSelect,
            branchTaskActions.cancelOptionClickSelect // TODO TEMP!!!
        );

        const detailsView: VNode =

            h("div", {}, [

                inputViews.buildTargetErrorInputView(
                    option,
                    raw)
            ]);

        return detailsView;
    },

    buildOptionDetailsView: (
        state: IState,
        option: INodeLoader,
        selectInstruction: string,
        raw: boolean): VNode => {

        selectNodeViews.buildOverlayView(
            state,
            option.ui.clickSelect,
            "Clear select option",
            "overlay-option",
            selectInstruction,
            branchTaskActions.cancelOptionClickSelect,
            branchTaskActions.cancelOptionClickSelect // TODO TEMP!!!
        );

        const detailsView: VNode =

            h("div", {}, [

                ...inputViews.buildOptionInputView(
                    state,
                    option,
                    raw)
            ]);

        return detailsView;
    },

    buildTargetDetailsView: (
        state: IState,
        target: INodeLoader,
        selectInstruction: string,
        raw: boolean): VNode => {

            selectNodeViews.buildOverlayView(
                state,
                target.ui.clickSelect,
                "Clear select target",
                "overlay-target",
                selectInstruction,
                branchTaskActions.cancelTargetClickSelect,
                branchTaskActions.cancelTargetClickSelect // TODO TEMP!!!
            );

        const detailsView: VNode =

            h("div", {}, [

                inputViews.buildTargetErrorInputView(
                    target,
                    raw)
            ]);

        return detailsView;
    }
};

export default selectNodeViews;


