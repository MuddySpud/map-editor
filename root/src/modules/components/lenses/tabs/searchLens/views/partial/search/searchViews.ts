import { h, VNode } from "hyperapp-local";

import searchActions from "../../../actions/searchActions";
import ISearchCase from "../../../../../../../interfaces/state/Search/ISearchCase";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import lensActions from "../../../../../lens/actions/lensActions";
import ISearchBrief from "../../../../../../../interfaces/state/Search/ISearchBrief";
import SearchStage from "../../../../../../../state/search/SearchStage";
import SearchTermElement from "../../../../../../../state/ui/payloads/SearchTermElement";
import ITabSave from "../../../../../../../interfaces/state/ui/tabs/ITabSave";


const searchViews = {

    buildActionsView: (
        searchCase: ISearchCase,
        stageBehaviour: IStageBehaviour): VNode => {

        const view: VNode =

            h("div",
                {
                    class: {
                        "lens-actions": true
                    }
                },
                [
                    h("button",
                        {
                            type: "button",
                            class: "search",
                            onClick: [
                                searchActions.search,
                                (_event: any) => {
                                    return new SearchStage(
                                        searchCase,
                                        stageBehaviour
                                    );
                                }
                            ]
                        },
                        "Search"
                    ),
                    h("button",
                        {
                            type: "button",
                            class: "cancel",
                            onClick: [
                                lensActions.clearAndCloseLens,
                                (_event: any) => searchCase
                            ]
                        },
                        "Cancel"
                    )
                ]
            );

        return view;
    },

    buildAddSearchRowView: (
        tab: ITabSave,
        searchCase: ISearchCase): VNode => {

        const view: VNode =

            h("div", { class: "add" }, [
                h("div",
                    {
                        class: "btn-add",
                        onClick: [
                            searchActions.addSearchRow,
                            (_event: any) => {
                                return new SearchTermElement(
                                    tab,
                                    searchCase,
                                    null,
                                    null,
                                );
                            }
                        ]
                    },
                    ""
                ),
            ]);

        return view;
    },

    buildTips: (searchBrief: ISearchBrief): VNode => {

        const heading = `Search ${searchBrief.type.toString()}`;

        const view: VNode =

            h("div", { class: "tips" }, [
                h("h3", {}, heading)
            ]);

        return view;
    }
};

export default searchViews;

