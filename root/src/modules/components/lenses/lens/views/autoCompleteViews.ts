import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";


const autoCompleteViews = {

    buildSelectOptionsView: (
        optionViews: VNode[],
        onBlurActionDelegate: (state: IState, data: any) => IState,
        data: any
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

    buildSelectView: (
        selectionViews: VNode[],
        inputView: VNode,
        showSelection: boolean,
        onBlurActionDelegate: (state: IState, data: any) => IState,
        data: any
    ): VNode => {

        const views: VNode[] = [inputView];

        if (showSelection === true) {

            views.push(
                
                autoCompleteViews.buildSelectOptionsView(
                    selectionViews,
                    onBlurActionDelegate,
                    data)
            );
        }

        return h("div", { class: "select-host" }, views);
    }
};

export default autoCompleteViews;


