import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import botPaginationViews from "./botPaginationViews";
import IDraft from "../../../../interfaces/state/bot/IDraft";

import '../scss/index.scss';
import draftRowViews from "./draftRowViews";


const draftsViews = {

    buildView: (state: IState): VNode => {

        const drafts: Array<IDraft> = state.botsState.draftsState.drafts;

        let innerView: VNode[];

        if (state.botsState.draftsState.draftCount === 0) {

            innerView = [

                h("p", { class: "aliases-zero" }, [
                    h("span", { class: "block" }, "There are no drafts yet. "),
                    h("span", { class: "block" }, "When you publish trees they appear here as drafts."),
                ])
            ];
        }
        else if (state.botsState.draftsState.drafts.length === 0) {

            innerView = [

                h("p", { class: "aliases-zero" }, [
                    h("span", { class: "block" }, "There are no un-promoted drafts. "),
                ])
            ];
        }
        else {

            innerView = draftRowViews.buildRowViews(
                state.botsState,
                drafts
            )
        }

        const view: VNode =

            h("div", { id: "drafts" }, [
                h("h3", {}, "Un-promoted drafts"),

                botPaginationViews.buildTopPagination(state.botsState.draftsState.paginationDetails),

                h("div", { class: "draft-table" }, innerView),

                botPaginationViews.buildBottomPagination(state.botsState.draftsState.paginationDetails),
            ]);

        return view;
    }
};

export default draftsViews;


