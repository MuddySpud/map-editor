import { h, VNode } from "hyperapp-local";

import headerControlViews from "../../../../../lens/views/headerControlViews";
import gBotActions from "../../../../../../../global/actions/gBotActions";
import IAlias from "../../../../../../../interfaces/state/bot/IAlias";
import aliasDetailsViews from "./aliasDetailsViews";


const buildDetailsMinimisedView = (alias: IAlias): VNode => {

    const view: VNode =

        h("div", { class: "action-details minimised" }, [

            buildControlView(
                alias,
                true
            ),

            aliasDetailsViews.buildMinDetailsView(alias)
        ]);

    return view;
};

const buildDetailsMaximisedView = (alias: IAlias): VNode => {

    const view: VNode =

        h("div", { class: "action-details" }, [

            buildControlView(
                alias,
                false
            ),

            ...aliasDetailsViews.buildMaxDetailsView(alias)
        ]);

    return view;
};

const buildControlView = (
    alias: IAlias,
    isMinimised: boolean): VNode => {

    let tooltip: string = " the alias details";

    if (isMinimised === false) {

        tooltip = `Minimise${tooltip}`;
    }
    else {
        tooltip = `Maximise${tooltip}`;
    }

    return headerControlViews.buildMinimiseDataView(
        tooltip,
        alias,
        gBotActions.toggleMinimiseAlias,
        isMinimised
    );
};

const aliasMinMaxViews = {

    buildCollapsibleDetailsView: (
        alias: IAlias,
        title: string): VNode[] => {

        let innardsView: VNode;

        if (alias.ui.minimise === true) {

            innardsView = buildDetailsMinimisedView(alias);
        }
        else {
            innardsView = buildDetailsMaximisedView(alias);
        }

        const view: VNode[] = [

            h("h4", {}, `${title}`),

            innardsView
        ];

        return view;
    }
};

export default aliasMinMaxViews;


