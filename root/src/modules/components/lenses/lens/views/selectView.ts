import { h, VNode, Children } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";


const selectView = {

    buildClearButtonView: (
        showClear: boolean,
        clearActionDelegate: (state: IState, data: any) => IStateAnyArray,
        data: any = null
    ): VNode | null => {

        if (showClear === false) {

            return null;
        }

        const detailsView: VNode =

            h("div", {}, [ // A wrapper to prevent most paint flashes when a selection is made
                h("div",
                    {
                        class: "btn-delete",
                        onMouseDown: [
                            clearActionDelegate,
                            (_event: any) => data
                        ]

                    },
                    ""
                )
            ]);

        return detailsView;
    },

    buildSelectOptionsView: (
        optionViews: Children[],
        onBlurActionDelegate: (state: IState, data: any) => IStateAnyArray,
        data: any = null
    ): VNode => {

        const detailsView: VNode =

            h("div",
                {
                    class: "drop-down height-calc",
                    tabindex: 0, // if this is not set it is not focusable
                    onBlur: [
                        onBlurActionDelegate,
                        (_event: any) => data
                    ]
                },
                [
                    h("div", { class: "select-table" }, optionViews)
                ]
            );

        return detailsView;
    },

    buildSelectButtonView: (
        buttonText: string,
        showOptions: boolean,
        showClear: boolean,
        showOptionsActionDelegate: (state: IState, data: any) => IStateAnyArray,
        clearActionDelegate: (state: IState, data: any) => IStateAnyArray,
        data: any = null
    ): VNode => {

        const detailsView: VNode =

            h("div",
                {
                    class: "change-button",
                    tabindex: 0, // if this is not set it is not focusable
                },
                [

                    selectView.buildClearButtonView(
                        showClear,
                        clearActionDelegate,
                        data),

                    h("div", { class: "wrapper" }, [
                        h("button",
                            {
                                type: "button",
                                class: {
                                    "click-select": true,
                                    "expanded": showOptions
                                },
                                onClick: [
                                    showOptionsActionDelegate,
                                    (_event: any) => data
                                ]
                            },
                            [
                                h("div", { class: "icon" }, [
                                    h("div", { class: "drop-down-icon" }, "")
                                ]),
                                h("span", {}, buttonText)
                            ]
                        )
                    ])
                ]
            );

        return detailsView;
    },

    buildSelectView: (
        optionViews: Children[],
        buttonText: string,
        showOptions: boolean,
        showClear: boolean,
        showOptionsActionDelegate: (state: IState, data: any) => IStateAnyArray,
        onBlurActionDelegate: (state: IState, data: any) => IStateAnyArray,
        clearActionDelegate: (state: IState, data: any) => IStateAnyArray,
        data: any = null
    ): VNode => {

        const views: VNode[] = [];

        if (showOptions === true) {

            views.push(
                selectView.buildSelectOptionsView(
                    optionViews,
                    onBlurActionDelegate,
                    data)
            );
        }

        views.push(
            selectView.buildSelectButtonView(
                buttonText,
                showOptions,
                showClear,
                showOptionsActionDelegate,
                clearActionDelegate,
                data)
        );

        return h("div", { class: "select-host" }, views);
    }
};

export default selectView;


