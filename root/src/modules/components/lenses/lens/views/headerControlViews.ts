import { h, VNode } from "hyperapp-local";
import IState from "../../../../interfaces/state/IState";
import gTooltipActions from "../../../../global/actions/gTooltipActions";


const headerControlViews = {

    buildCloseDataButtonView: (
        closeTooltip: string,
        data: any,
        closeAction: (
            state: IState,
            data: any) => IState
    ): VNode => {

        const view: VNode =

            h("div",
                {
                    class: "close",
                    onClick: [
                        closeAction,
                        (_event: any) => data
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => closeTooltip
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return view;
    },

    buildCloseButtonView: (
        closeTooltip: string,
        closeAction: (state: IState) => IState
    ): VNode => {

        const view: VNode =

            h("div",
                {
                    class: "close",
                    onClick: closeAction,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => closeTooltip
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return view;
    },

    buildMinimiseDataButtonView: (
        minimiseTooltip: string,
        data: any,
        minimiseAction: (
            state: IState,
            data: any) => IState,
        isMinimised: boolean = false
    ): VNode => {

        const view: VNode =

            h("div",
                {
                    class: {
                        minimise: true,
                        'is-min': isMinimised === true
                    },
                    onClick: [
                        minimiseAction,
                        (_event: any) => data
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => minimiseTooltip // "Minimise the lens without clearing the data"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return view;
    },

    buildMinimiseButtonView: (
        minimiseTooltip: string,
        minimiseAction: (state: IState) => IState,
        isMinimised: boolean
    ): VNode => {

        const view: VNode =

            h("div",
                {
                    class: {
                        minimise: true,
                        'is-min': isMinimised === true
                    },
                    onClick: minimiseAction, // lensActions.toggleMinimise,
                    onMouseOver: [
                        gTooltipActions.showTooltip,
                        (_event: any) => minimiseTooltip // "Minimise the lens without clearing the data"
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );

        return view;
    },

    buildCloseDataView: (
        closeTooltip: string,
        data: any,
        closeAction: (
            state: IState,
            data: any) => IState
    ): VNode => {

        const view: VNode =

            h("div", { class: "box-controls" }, [

                headerControlViews.buildCloseDataButtonView(
                    closeTooltip,
                    data,
                    closeAction
                )
            ]);

        return view;
    },

    buildCloseView: (
        closeTooltip: string,
        closeAction: (state: IState) => IState
    ): VNode => {

        const view: VNode =

            h("div", { class: "controls-header" }, [

                headerControlViews.buildCloseButtonView(
                    closeTooltip,
                    closeAction
                )
            ]);

        return view;
    },

    buildMinimiseDataView: (
        minimiseTooltip: string,
        data: any,
        minimiseAction: (
            state: IState,
            data: any) => IState,
        isMinimised: boolean
    ): VNode => {

        const view: VNode =

            h("div", { class: "box-controls" }, [

                headerControlViews.buildMinimiseDataButtonView(
                    minimiseTooltip,
                    data,
                    minimiseAction,
                    isMinimised
                )
            ]);

        return view;
    },

    buildMinimiseView: (
        minimiseTooltip: string,
        minimiseAction: (state: IState) => IState,
        isMinimised: boolean
    ): VNode => {

        const view: VNode =

            h("div", { class: "controls-header" }, [

                headerControlViews.buildMinimiseButtonView(
                    minimiseTooltip,
                    minimiseAction,
                    isMinimised
                )
            ]);

        return view;
    },

    buildDataControlView: (
        minimiseTooltip: string,
        closeTooltip: string,
        data: any,
        minimiseAction: (
            state: IState,
            data: any) => IState,
        closeAction: (
            state: IState,
            data: any) => IState,
        isMinimised: boolean
    ): VNode => {

        const view: VNode =

            h("div", { class: "box-controls" }, [

                headerControlViews.buildCloseDataButtonView(
                    closeTooltip,
                    data,
                    closeAction
                ),

                headerControlViews.buildMinimiseDataButtonView(
                    minimiseTooltip,
                    data,
                    minimiseAction,
                    isMinimised
                )
            ]);

        return view;
    },

    buildLensControlView: (
        minimiseTooltip: string,
        closeTooltip: string,
        minimiseAction: (state: IState) => IState,
        closeAction: (state: IState) => IState,
        isMinimised: boolean
    ): VNode => {

        const view: VNode =

            h("div", { class: "controls-header" }, [

                headerControlViews.buildCloseButtonView(
                    closeTooltip,
                    closeAction
                ),

                headerControlViews.buildMinimiseButtonView(
                    minimiseTooltip,
                    minimiseAction,
                    isMinimised
                )
            ]);

        return view;
    }
};

export default headerControlViews;


