import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import BoolElement from "../../../../state/ui/payloads/BoolElement";
import IBoolElement from "../../../../interfaces/state/ui/payloads/IBoolElement";
import ITabSave from "../../../../interfaces/state/ui/tabs/ITabSave";
import gTabCode from "../../../../global/code/gTabCode";
import gTooltipActions from "../../../../global/actions/gTooltipActions";


const lensButtonsViews = {

    buildNextButtonView: (
        tab: ITabSave,
        action: (
            state: IState,
            payload: IBoolElement) => IState,
        nextTooltip: string,
        disabledTooltip: string
    ): VNode => {

        let tooltip: string;
        let disabled: boolean = false;

        if (gTabCode.canSave(tab) === false) {

            tooltip = disabledTooltip;
            disabled = true;
        }
        else {
            tooltip = nextTooltip;
        }

        const view: VNode =

            h("button",
                {
                    type: "button",
                    class: "save",
                    onClick: [
                        action,
                        (event: any) => {
                            return new BoolElement(
                                event.target,
                                disabled
                            );
                        }
                    ],
                    disabled: disabled,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => tooltip
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                "Next"
            );

        return view;
    },

    buildSaveButtonView: (
        tab: ITabSave,
        action: (state: IState) => IStateAnyArray,
        saveTooltip: string,
        disabledTooltip: string
    ): VNode => {

        let tooltip: string;
        let disabled: boolean = false;

        if (gTabCode.canSave(tab) === false) {

            tooltip = disabledTooltip;
            disabled = true;
        }
        else {
            tooltip = saveTooltip;
        }

        const view: VNode =

            h("button",
                {
                    type: "button",
                    class: "save",
                    onClick: action,
                    disabled: disabled,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => tooltip
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                "Save"
            );

        return view;
    },

    buildRightStateActionButtonView: (
        cancelAction: (state: IState) => IStateAnyArray,
        buttonText: string,
        tooltip: string
    ): VNode => {

        const view: VNode =

            h("button",
                {
                    type: "button",
                    class: "cancel",
                    onClick: cancelAction,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => tooltip
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                buttonText
            );

        return view;
    },

    buildActionButtonView: (
        tab: ITabSave,
        action: (state: IState) => IStateAnyArray,
        buttonText: string,
        actionTooltip: string,
        disabledTooltip: string
    ): VNode => {

        let tooltip: string;
        let disabled: boolean = false;

        if (gTabCode.canSave(tab) === false) {

            tooltip = disabledTooltip;
            disabled = true;
        }
        else {
            tooltip = actionTooltip;
        }

        const view: VNode =

            h("button",
                {
                    type: "button",
                    class: "save",
                    onClick: action,
                    disabled: disabled,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => tooltip
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                buttonText
            );

        return view;
    },

    buildDeleteButtonView: (
        state: IState,
        tab: ITabSave,
        deleteAction: (state: IState) => IState,
        tooltip: string
    ): VNode | null => {

        if (!gTabCode.canDelete(state, tab)) {

            return null;
        }

        return lensButtonsViews.buildRightStateActionButtonView(
            deleteAction,
            "Delete",
            tooltip
        );
    },

    buildCancelButtonView: (
        closeTabAction: (state: IState) => IStateAnyArray,
        tooltip: string
    ): VNode => {

        return lensButtonsViews.buildRightStateActionButtonView(
            closeTabAction,
            "Cancel",
            tooltip
        );
    },

    buildSaveCancelView: (
        tab: ITabSave,
        saveAction: (state: IState) => IStateAnyArray,
        closeTabAction: (state: IState) => IStateAnyArray,
        saveTooltip: string,
        disabledTooltip: string,
        cancelTooltip: string
    ): VNode => {

        const view: VNode =

            h("div",
                {
                    class: {
                        "lens-actions": true
                    }
                },
                [
                    lensButtonsViews.buildSaveButtonView(
                        tab,
                        saveAction,
                        saveTooltip,
                        disabledTooltip
                    ),

                    lensButtonsViews.buildCancelButtonView(
                        closeTabAction,
                        cancelTooltip
                    )
                ]
            );

        return view;
    },

    buildNextCancelView: (
        tab: ITabSave,
        action: (
            state: IState,
            payload: IBoolElement) => IState,
        closeTabAction: (state: IState) => IState,
        nextTooltip: string,
        disabledTooltip: string,
        cancelTooltip: string
    ): VNode => {

        const view: VNode =

            h("div",
                {
                    class: {
                        "lens-actions": true
                    }
                },
                [
                    lensButtonsViews.buildNextButtonView(
                        tab,
                        action,
                        nextTooltip,
                        disabledTooltip
                    ),

                    lensButtonsViews.buildCancelButtonView(
                        closeTabAction,
                        cancelTooltip)
                ]
            );

        return view;
    },

    buildSaveDeleteView: (
        state: IState,
        tab: ITabSave,
        saveAction: (state: IState) => IState,
        deleteAction: (state: IState) => IState,
        saveTooltip: string,
        disabledTooltip: string,
        deleteTooltip: string
    ): VNode => {

        const view: VNode =

            h("div",
                {
                    class: {
                        "lens-actions": true
                    }
                },
                [
                    lensButtonsViews.buildSaveButtonView(
                        tab,
                        saveAction,
                        saveTooltip,
                        disabledTooltip
                    ),

                    lensButtonsViews.buildDeleteButtonView(
                        state,
                        tab,
                        deleteAction,
                        deleteTooltip)
                ]
            );

        return view;
    },

    buildSaveCancelActionView: (
        tab: ITabSave,
        saveAction: (state: IState) => IStateAnyArray,
        cancelAction: (state: IState) => IStateAnyArray,
        buttonText: string,
        saveTooltip: string,
        disabledTooltip: string,
        cancelTooltip: string
    ): VNode => {

        const view: VNode =

            h("div",
                {
                    class: {
                        "lens-actions": true
                    }
                },
                [
                    lensButtonsViews.buildSaveButtonView(
                        tab,
                        saveAction,
                        saveTooltip,
                        disabledTooltip
                    ),

                    lensButtonsViews.buildRightStateActionButtonView(
                        cancelAction,
                        buttonText,
                        cancelTooltip
                    )
                ]
            );

        return view;
    },

    buildActionCancelView: (
        tab: ITabSave,
        action: (state: IState) => IStateAnyArray,
        buttonText: string,
        closeTabAction: (state: IState) => IStateAnyArray,
        actionTooltip: string,
        disabledTooltip: string,
        cancelTooltip: string
    ): VNode => {

        const view =

            h("div",
                {
                    class: {
                        "lens-actions": true
                    }
                },
                [
                    lensButtonsViews.buildActionButtonView(
                        tab,
                        action,
                        buttonText,
                        actionTooltip,
                        disabledTooltip
                    ),

                    lensButtonsViews.buildCancelButtonView(
                        closeTabAction,
                        cancelTooltip)
                ]
            );

        return view;
    }
};

export default lensButtonsViews;


