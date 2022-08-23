import { h, VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";
import gSearchCode from "../../../global/code/gSearchCode";
import gCoreActions from "../../../global/actions/gCoreActions";
import gTooltipActions from "../../../global/actions/gTooltipActions";
import StringEvent from "../../../state/ui/payloads/StringEvent";

import "../scss/index.scss";


const buildBotsButtonView = (_state: IState): VNode => {

    const view: VNode =

        h("a",
            {
                class: "bots-button",
                onClick: [
                    gCoreActions.resetAndShowBots,
                    true
                ],
                onMouseOver: [
                    gTooltipActions.showTooltipWithEvent,
                    (event: any) => {
                        return new StringEvent(
                            "Refresh all bots",
                            event
                        );
                    }
                ],
                onMouseOut: gTooltipActions.clearTooltip
            },
            [
                h("div", { class: "bots-icon" }, "")
            ]
        );

    return view;
};

const buildBotsDetails = (state: IState): VNode => {

    const title: string = gSearchCode.isBlankFilter(state) === true ?
        "All bots" :
        "Filtered bots";

    let text: string = `(${state.botsState.aliasesState.aliasCount} alias`;

    if (state.botsState.aliasesState.aliasCount !== 1) {

        text = `${text}s`;
    }

    text = `${text}, ${state.botsState.draftsState.draftCount} draft`;

    if (state.botsState.draftsState.draftCount !== 1) {

        text = `${text}s`;
    }

    text = `${text} in database)`;

    const view: VNode =

        h("div", { class: "bots" }, [

            buildBotsButtonView(state),

            h("span", { class: "bots-title" }, title),
            h("span", { class: "bots-count" }, text),
        ]);

    return view;
};

const botsHeaderView = {

    buildView: (state: IState): VNode => {

        const view: VNode =

            h("div", { id: "headerView" }, [
                h("div", { id: "header" }, [

                    buildBotsDetails(state)
                ])
            ]);

        return view;
    }
};

export default botsHeaderView;


