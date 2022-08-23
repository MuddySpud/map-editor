import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import gTooltipActions from "../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../state/ui/payloads/StringEvent";
import INodeBase from "../../../../interfaces/state/tree/INodeBase";


const buttonViews = {

    //#region Press buttons

    buildPressButtonView: (
        buttonText: string,
        tooltip: string,
        clickActionDelegate: (state: IState) => IState
    ): VNode => {

        return buttonViews.buildButtonView(
            buttonText,
            tooltip,
            "button-press",
            clickActionDelegate
        );
    },

    buildPressDataButtonView: (
        buttonText: string,
        tooltip: string,
        clickActionDelegate: (
            state: IState,
            data: any) => IState,
        data: any = null
    ): VNode => {

        return buttonViews.buildDataButtonView(
            buttonText,
            tooltip,
            clickActionDelegate,
            data,
            "button-press",
        );
    },
    //#endregion

    //#region Type buttons

    buildTypeButtonView: (
        buttonText: string,
        tooltip: string,
        iconClass: string,
        clickActionDelegate: (state: IState) => IStateAnyArray
    ): VNode => {

        return buttonViews.buildIconButtonView(
            buttonText,
            tooltip,
            "button-type",
            iconClass,
            clickActionDelegate
        );
    },

    buildTypeDataButtonView: (
        buttonText: string,
        tooltip: string,
        iconClass: string,
        clickActionDelegate: (
            state: IState,
            data: any) => IState,
        data: any = null
    ): VNode => {

        return buttonViews.buildDataIconButtonView(
            buttonText,
            tooltip,
            "button-type",
            iconClass,
            clickActionDelegate,
            data
        );
    },
    //#endregion

    //#region base methods

    buildButtonView: (
        buttonText: string,
        tooltip: string,
        className: string,
        clickActionDelegate: (state: IState) => IState
    ): VNode => {

        const view: VNode =

            h("div", { class: `${className}` }, [
                h("button",
                    {
                        type: "button",
                        class: "click-select",
                        onClick: clickActionDelegate,
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    tooltip,
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    `${buttonText}`
                ),
            ]);

        return view;
    },

    buildIconButtonView: (
        buttonText: string,
        tooltip: string,
        className: string,
        iconClass: string,
        clickActionDelegate: (state: IState) => IStateAnyArray
    ): VNode => {

        const view: VNode =

            h("div", { class: `${className}` }, [
                h("button",
                    {
                        type: "button",
                        class: "click-select",
                        onClick: clickActionDelegate,
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    tooltip,
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    [
                        h("div", { class: `${iconClass}` }, ""),
                        h("span", {}, `${buttonText}`)
                    ]
                ),
            ]);

        return view;
    },

    buildDataButtonView: (
        buttonText: string,
        tooltip: string,
        clickActionDelegate: (
            state: IState,
            data: any) => IStateAnyArray,
        data: any,
        wrapperClassName: string,
        buttonClassName: string = "click-select"
    ): VNode => {

        const view: VNode =

            h("div", { class: `${wrapperClassName}` }, [
                h("button",
                    {
                        type: "button",
                        class: `${buttonClassName}`,
                        onClick: [
                            clickActionDelegate,
                            (_event: any) => data
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    tooltip,
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    `${buttonText}`
                ),
            ]);

        return view;
    },

    buildTdDataButtonView: (
        buttonText: string,
        tooltip: string,
        clickActionDelegate: (
            state: IState,
            data: any) => IStateAnyArray,
        data: any,
        wrapperClassName: string,
        buttonClassName: string = "click-select"
    ): VNode => {

        const view: VNode =

            h("td", { class: `${wrapperClassName}` }, [
                h("button",
                    {
                        type: "button",
                        class: `${buttonClassName}`,
                        onClick: [
                            clickActionDelegate,
                            (_event: any) => data
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    tooltip,
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    `${buttonText}`
                ),
            ]);

        return view;
    },

    buildDataIconButtonView: (
        buttonText: string,
        tooltip: string,
        className: string,
        iconClass: string,
        clickActionDelegate: (
            state: IState,
            data: any) => IState,
        data: any
    ): VNode => {

        const view: VNode =

            h("div", { class: `${className}` }, [

                buttonViews.buildDataIconButton(
                    buttonText,
                    tooltip,
                    iconClass,
                    clickActionDelegate,
                    data
                )
            ]);

        return view;
    },

    buildDataIconButton: (
        buttonText: string,
        tooltip: string,
        iconClass: string,
        clickActionDelegate: (
            state: IState,
            data: any) => IState,
        data: any
    ): VNode => {

        const view: VNode =

            h("button",
                {
                    type: "button",
                    onClick: [
                        clickActionDelegate,
                        (_event: any) => data
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                tooltip,
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: `${iconClass}` }, ""),
                    h("span", {}, `${buttonText}`)
                ]
            );

        return view;
    },

    buildIconButton: (
        buttonText: string,
        tooltip: string,
        iconClass: string,
        clickActionDelegate: (state: IState) => IStateAnyArray
    ): VNode => {

        const view: VNode =

            h("button",
                {
                    type: "button",
                    onClick: clickActionDelegate,
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                tooltip,
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: `${iconClass}` }, ""),
                    h("span", {}, `${buttonText}`)
                ]
            );

        return view;
    },

    buildHollowButton: (
        tooltip: string,
        buttonClass: string,
        contentsArray: any[],
        clickActionDelegate: (state: IState) => IState
    ): VNode => {

        const view: VNode =

            h("button",
                {
                    type: "button",
                    class: buttonClass,
                    onClick: clickActionDelegate,
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                tooltip,
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                contentsArray
            );

        return view;
    },

    buildDisabledButton: (
        buttonText: string,
        tooltip: string
    ): VNode => {

        const view: VNode =

            h("button",
                {
                    type: "button",
                    class: "disabled",
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                tooltip,
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("span", {}, `${buttonText}`)
                ]
            );

        return view;
    },

    buildOpenInBranchesViewButton: (
        node: INodeBase,
        tooltip: string,
        buttonClassName: string,
        iconActionDelegate: (
            state: IState,
            node: INodeBase) => IStateAnyArray
    ): VNode => {

        return buttonViews.buildDataButtonView(
            '',
            tooltip,
            iconActionDelegate,
            node,
            "icon",
            buttonClassName);
    },

    buildTdOpenInBranchesViewButton: (
        node: INodeBase,
        tooltip: string,
        buttonClassName: string,
        iconActionDelegate: (
            state: IState,
            node: INodeBase) => IStateAnyArray
    ): VNode => {

        return buttonViews.buildTdDataButtonView(
            '',
            tooltip,
            iconActionDelegate,
            node,
            "icon",
            buttonClassName);
    },

    //#endregion
};

export default buttonViews;


