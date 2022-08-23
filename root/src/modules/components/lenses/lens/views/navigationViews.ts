import { h, VNode } from "hyperapp-local";

import gStageActions from "../../../../global/actions/gStageActions";
import IStageBehaviour from "../../../../interfaces/behaviours/IStageBehaviour";
import BoolElement from "../../../../state/ui/payloads/BoolElement";
import gTooltipActions from "../../../../global/actions/gTooltipActions";
import IState from "../../../../interfaces/state/IState";


const navigationViews = {

    buildNavControlsView: (stageBehaviour: IStageBehaviour): VNode => {

        const controlsView: VNode =

            h("div", { class: "child-controls" }, [
                navigationViews.buildForwardButton(stageBehaviour),
                navigationViews.buildBackButton(stageBehaviour)
            ]);

        return controlsView;
    },

    buildForwardButton: (
        stageBehaviour: IStageBehaviour | null,
        validationFailed: boolean = false): VNode | null => {

        if (!stageBehaviour) {

            return null;
        }

        let disabled: boolean =
            stageBehaviour.canForward() === false
            || validationFailed === true;

        const button: VNode =

            h("div",
                {
                    class: {
                        forward: true,
                        disabled: disabled
                    },
                    onClick: [
                        gStageActions.nextStage,
                        (event: any) => {
                            return new BoolElement(
                                event.target,
                                disabled
                            );
                        }
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Go to the next screen"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return button;
    },

    buildBackButton: (stageBehaviour: IStageBehaviour | null): VNode | null => {

        if (!stageBehaviour) {

            return null;
        }

        let disabled: boolean = stageBehaviour.canBackward() === false;

        const button: VNode =

            h("div",
                {
                    class: {
                        back: true,
                        disabled: disabled
                    },
                    onClick: [
                        gStageActions.previousStage,
                        (event: any) => {
                            return new BoolElement(
                                event.target,
                                disabled
                            );
                        }
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => "Go to the previous screen"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return button;
    },

    buildCloseButton: (
        tooltip: string,
        onClickAction: (state: IState) => IState): VNode => {

        const button: VNode =

            h("div",
                {
                    class: "close-view",
                    onClick: onClickAction,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => tooltip
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return button;
    }
};

export default navigationViews;


