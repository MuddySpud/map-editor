import { h, VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import botPaginationViews from "./botPaginationViews";
import aliasRowViews from "./aliasRowViews";
import IAlias from "../../../../interfaces/state/bot/IAlias";

import '../scss/index.scss';


const aliasesViews = {

    buildView: (state: IState): VNode => {

        const aliases: Array<IAlias> = state.botsState.aliasesState.aliases;

        let innerView: VNode[];

        if (state.botsState.aliasesState.aliasCount === 0) {

            innerView = [

                h("p", { class: "aliases-zero" }, [
                    h("span", { class: "block" }, "There are no aliases yet. "),
                    h("span", { class: "block" }, "Create your first alias by promoting one of the drafts from the list below."),
                ])
            ];
        }
        else if (state.botsState.draftsState.draftCount === 0) {

            innerView = [

                h("p", { class: "aliases-zero" }, [
                    h("span", { class: "block" }, "There are no aliases yet. "),
                    h("span", { class: "block" }, "To create your first alias you will first need to publish a tree to a draft, "),
                    h("span", { class: "block" }, "then promote the draft as a alias."),
                ])
            ];
        }
        else {

            innerView = aliasRowViews.buildRowViews(
                state.botsState,
                aliases
            )
        }

        const view: VNode =

            h("div", { id: "aliases" }, [
                h("h3", {}, "Aliases"),

                botPaginationViews.buildTopPagination(state.botsState.aliasesState.paginationDetails),

                h("div", { class: "alias-table" }, innerView),

                botPaginationViews.buildBottomPagination(state.botsState.aliasesState.paginationDetails),
            ]);

        return view;
    }
};

export default aliasesViews;


