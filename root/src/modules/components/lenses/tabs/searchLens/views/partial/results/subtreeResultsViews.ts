import { h, VNode } from "hyperapp-local";

import ITreeBase from "../../../../../../../interfaces/state/tree/ITreeBase";
import gSearchSubtreeActions from "../../../../../../../global/actions/gSearchSubtreeActions";
import ISearchCase from "../../../../../../../interfaces/state/Search/ISearchCase";
import ISearchBrief from "../../../../../../../interfaces/state/Search/ISearchBrief";
import ISubtreeResults from "../../../../../../../interfaces/state/Search/ISubtreeResults";
import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import gSubtreeActions from "../../../../../../../global/actions/gSubtreeActions";
import buttonsViews from "./buttonsViews";
import SearchCaseValue from "../../../../../../../state/ui/SearchCaseValue";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import IPaginationDetails from "../../../../../../../interfaces/state/ui/payloads/IPaginationDetails";
import paginationViews from "../../../../../../pagination/views/paginationViews";
import searchActions from "../../../actions/searchActions";
import ISubtreeSearchCase from "../../../../../../../interfaces/state/ui/payloads/ISubtreeSearchCase";
import SubtreeSearchCase from "../../../../../../../state/ui/payloads/SubtreeSearchCase";
import subtreeSearchCaseMinMaxViews from "../../../../../../../components/lenses/tabs/treeLens/views/subtree/partial/subtreeSearchCaseMinMaxViews";


const subtreeResultsViews = {

    buildResultsView: (searchCase: ISearchCase): VNode | null => {

        if (!searchCase
            || !searchCase.brief) {

            return null;
        }

        const searchBrief: ISearchBrief = searchCase.brief as ISearchBrief;
        const paginationDetails: IPaginationDetails = searchBrief.paginationDetails;
        const subtreeResults: ISubtreeResults = searchBrief.subtreeResults;
        const subtrees: Array<ISubtreeSys> = subtreeResults.results;

        const buildSubtreeDetailsView = (): VNode | null => {

            if (subtreeResults.selectedIndex < 0) {

                return null;
            }

            const selectedSubtree: ISubtreeSys = subtrees[subtreeResults.selectedIndex];

            const selectedSubtreeSearchCase: ISubtreeSearchCase = new SubtreeSearchCase(
                selectedSubtree,
                searchCase
            );

            const view =

                h(
                    "div",
                    { class: "selected-result" },

                    subtreeSearchCaseMinMaxViews.buildCollapsibleDetailsView(
                        selectedSubtreeSearchCase,
                        'Subtree'
                    )
                );


            return view;
        };

        const buildTreeRowView = (
            tree: ITreeBase,
            selected: boolean): VNode => {

            const treeView: VNode =

                h("tr",
                    {
                        key: `${tree.key}`,
                        class: {
                            selected: selected
                        },
                        onClick: [
                            gSearchSubtreeActions.selectSubtree,
                            (_event: any) => {

                                searchBrief.selectedKey = tree.key;
                                searchBrief.selectedToken = tree.token;

                                return searchCase;
                            }
                        ]
                    },
                    [
                        h("td", { class: "td-open" }, [
                            h("div", { class: "tick" }, ""),
                            h("div",
                                {
                                    class: "open-subtree",
                                    onClick: [
                                        gSubtreeActions.openSubtreeWithSearchCase,
                                        (_event: any) => {
                                            return new SearchCaseValue(
                                                searchCase,
                                                tree.key as string
                                            );
                                        }
                                    ],
                                    onMouseOver: [
                                        gTooltipActions.showTooltip,
                                        (_event: any) => "Open subtree in a new tab"
                                    ],
                                    onMouseOut: gTooltipActions.clearTooltip
                                },
                                ""
                            )
                        ]),
                        h("td", {}, `${tree.name}`),
                        h("td", {}, `${tree.description}`),
                        h("td", {}, `${tree.key}`),
                        h("td", {}, `${tree.created}`),
                        h("td", {}, `${tree.owner}`)
                    ]);

            return treeView;
        };

        const buildTreeRowsViews = (): VNode[] => {

            const treeViews: VNode[] = [];
            let treeView: VNode;

            for (let i = 0; i < subtrees.length; i++) {

                treeView = buildTreeRowView(
                    subtrees[i].tree,
                    i === subtreeResults.selectedIndex);

                treeViews.push(treeView);
            }

            return treeViews;
        };

        const buildPagination = (isBottom: boolean): VNode | null => {

            return paginationViews.buildView(
                isBottom,
                paginationDetails,
                searchActions.showSearchPage,
                searchCase);
        };

        const buildTopPagination = (): VNode | null => {

            return buildPagination(false);
        };

        const buildBottomPagination = (): VNode | null => {

            return buildPagination(true);
        };

        const buildResultsTableView = (): VNode => {

            const resultsView: VNode =

                h("div", { class: "results" }, [
                    h("table", {}, [
                        h("thead", {}, [
                            h("tr", {}, [
                                h("td", { class: "td-open" }, ""),
                                h("td", {}, "name"),
                                h("td", {}, "description"),
                                h("td", {}, "key"),
                                h("td", {}, "created"),
                                h("td", {}, "owner")
                            ])
                        ]),
                        h("tbody", {}, buildTreeRowsViews())
                    ])
                ]);

            return resultsView;
        };

        const treeResultsView: VNode =

            h("div", { id: "searchLensView" }, [
                h("div", { id: "searchLens" }, [

                    buildTopPagination(),
                    buildResultsTableView(),
                    buildBottomPagination(),
                    buildSubtreeDetailsView(),
                    buttonsViews.buildActionsView(searchCase)
                ])
            ]);

        return treeResultsView;
    }
};

export default subtreeResultsViews;


