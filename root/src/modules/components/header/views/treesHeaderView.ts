import { h, VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";
import gSearchCode from "../../../global/code/gSearchCode";
import gCoreActions from "../../../global/actions/gCoreActions";
import gTooltipActions from "../../../global/actions/gTooltipActions";
import StringEvent from "../../../state/ui/payloads/StringEvent";

import "../scss/index.scss";


const buildTreesButtonView = (_state: IState): VNode => {

    const view: VNode =

        h("a",
            {
                class: "trees-button",
                onClick: [
                    gCoreActions.resetAndShowTrees,
                    true
                ],
                onMouseOver: [
                    gTooltipActions.showTooltipWithEvent,
                    (event: any) => {
                        return new StringEvent(
                            "Refresh all trees",
                            event
                        );
                    }
                ],
                onMouseOut: gTooltipActions.clearTooltip
            },
            [
                h("div", { class: "trees-icon" }, "")
            ]
        );

    return view;
};

const buildTreesDetails = (state: IState): VNode => {

    const title: string = gSearchCode.isBlankFilter(state) === true ?
        "All trees" :
        "Filtered trees";

    const text: string = `(${state.treesState.treesCount} trees in database)`;

    const view: VNode =

        h("div", { class: "trees" }, [

            buildTreesButtonView(state),

            h("span", { class: "trees-title" }, title),
            h("span", { class: "trees-count" }, text),
        ]);

    return view;
};

const treesHeaderView = {

    buildView: (state: IState): VNode => {

        const view: VNode =

            h("div", { id: "headerView" }, [
                h("div", { id: "header" }, [

                    buildTreesDetails(state)
                ])
            ]);

        return view;
    }
};

export default treesHeaderView;


