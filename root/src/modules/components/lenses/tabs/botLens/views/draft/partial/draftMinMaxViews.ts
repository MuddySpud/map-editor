import { h, VNode } from "hyperapp-local";

import draftDetailsViews from "./draftDetailsViews";
import headerControlViews from "../../../../../lens/views/headerControlViews";
import gBotActions from "../../../../../../../global/actions/gBotActions";
import IDraft from "../../../../../../../interfaces/state/bot/IDraft";


const buildDetailsMinimisedView = (draft: IDraft): VNode => {

    const view: VNode =

        h("div", { class: "action-details minimised" }, [

            buildControlView(
                draft,
                true
            ),

            draftDetailsViews.buildMinDetailsView(draft)
        ]);

    return view;
};

const buildDetailsMaximisedView = (draft: IDraft): VNode => {

    const view: VNode =

        h("div", { class: "action-details" }, [

            buildControlView(
                draft,
                false
            ),

            ...draftDetailsViews.buildMaxDetailsView(draft)
        ]);

    return view;
};

const buildControlView = (
    draft: IDraft,
    isMinimised: boolean): VNode => {

    let tooltip: string = " the draft details";

    if (isMinimised === false) {

        tooltip = `Minimise${tooltip}`;
    }
    else {
        tooltip = `Maximise${tooltip}`;
    }

    return headerControlViews.buildMinimiseDataView(
        tooltip,
        draft,
        gBotActions.toggleMinimiseDraft,
        isMinimised
    );
};

const draftMinMaxViews = {

    buildCollapsibleDetailsView: (
        draft: IDraft,
        title: string): VNode[] => {

        let innardsView: VNode;

        if (draft.ui.minimise === true) {

            innardsView = buildDetailsMinimisedView(draft);
        }
        else {
            innardsView = buildDetailsMaximisedView(draft);
        }

        const view: VNode[] = [

            h("h4", {}, `${title}`),

            innardsView
        ];

        return view;
    }
};

export default draftMinMaxViews;


