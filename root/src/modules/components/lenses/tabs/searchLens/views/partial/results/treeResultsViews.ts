import { h, VNode } from "hyperapp-local";

import ITreeBase from "../../../../../../../interfaces/state/tree/ITreeBase";
import searchActions from "../../../actions/searchActions";
import ITreeResults from "../../../../../../../interfaces/state/Search/ITreeResults";
import gSearchTreeActions from "../../../../../../../global/actions/gSearchTreeActions";
import ISearchCase from "../../../../../../../interfaces/state/Search/ISearchCase";
import ISearchBrief from "../../../../../../../interfaces/state/Search/ISearchBrief";
import IPaginationDetails from "../../../../../../../interfaces/state/ui/payloads/IPaginationDetails";
import paginationViews from "../../../../../../pagination/views/paginationViews";


const treeResultsViews = {

    buildResultsView: (searchCase: ISearchCase): VNode | null => {

        if (!searchCase
            || !searchCase.brief
            || !searchCase.brief.treeResults
            || !searchCase.brief.treeResults.results
            || searchCase.brief.treeResults.results.length === 0) {

            return null;
        }

        const searchBrief: ISearchBrief = searchCase.brief as ISearchBrief;
        const paginationDetails: IPaginationDetails = searchBrief.paginationDetails;
        const treeResults: ITreeResults = searchBrief.treeResults;
        const trees: Array<ITreeBase> = treeResults.results;


        const buildActionsView = (): VNode | null => {

            if (treeResults.selectedIndex < 0) {
                
                return null;
            }

            const actionView: VNode =

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
                                class: "select",
                                onClick: [
                                    searchCase.selectAction,
                                    (_event: any) => searchCase
                                ]        
                            },
                            "Select"
                        ),
                        h("button",
                            {
                                type: "button",
                                class: "cancel",
                                onClick: searchActions.cancel,
                            },
                            "Cancel"
                        )
                    ]
                )

            return actionView;
        };

        const buildTreeDetailsView = (): VNode | null => {

            if (treeResults.selectedIndex < 0) {

                return null;
            }

            const selectedTree: ITreeBase = trees[treeResults.selectedIndex];

            const treeDetailsView: VNode =
                // This needs to display the rootKey, stRootKey, root discussion, socketKey, stSocketKey, socket option
                h("div", {},
                    [
                        h("div",
                            {
                                class: "tree"
                            },
                            [
                                h("div",
                                    {
                                        class: "row"
                                    },
                                    [
                                        h("div", { class: "key" }, "key"),
                                        h("div", { class: "value" }, `${selectedTree.key}`),
                                    ]
                                ),
                                h("div",
                                    {
                                        class: "row"
                                    },
                                    [
                                        h("div", { class: "key" }, "name"),
                                        h("div", { class: "value" }, `${selectedTree.name}`),
                                    ]
                                ),
                                h("div",
                                    {
                                        class: "row"
                                    },
                                    [
                                        h("div", { class: "key" }, "title"),
                                        h("div", { class: "value" }, `${selectedTree.title}`),
                                    ]
                                ),
                                h("div",
                                    {
                                        class: "row"
                                    },
                                    [
                                        h("div", { class: "key" }, "token"),
                                        h("div", { class: "value" }, `${selectedTree.token}`),
                                    ]
                                ),
                                h("div",
                                    {
                                        class: "row"
                                    },
                                    [
                                        h("div", { class: "key" }, "created"),
                                        h("div", { class: "value" }, `${selectedTree.created}`),
                                    ]
                                ),
                                h("div",
                                    {
                                        class: "row"
                                    },
                                    [
                                        h("div", { class: "key" }, "description"),
                                        h("div", { class: "value" }, `${selectedTree.description}`),
                                    ]
                                )
                            ]
                        )
                    ]
                );

            return treeDetailsView;
        };

        const buildTreeUI = (
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
                            gSearchTreeActions.selectTree,
                            (_event: any) => {

                                searchBrief.selectedKey = tree.key;
                                searchBrief.selectedToken = tree.token;

                                return searchCase;
                            }
                        ]
                    },
                    [
                        h("td", {}, `${tree.name}`),
                        h("td", {}, `${tree.description}`),
                        h("td", {}, `${tree.key}`),
                        h("td", {}, `${tree.created}`),
                        h("td", {}, `${tree.owner}`)
                    ]);

            return treeView;
        };

        const buildTreesViews = (): VNode[] => {

            const treeViews: VNode[] = [];
            let treeView: VNode;

            for (let i = 0; i < trees.length; i++) {

                treeView = buildTreeUI(
                    trees[i],
                    i === treeResults.selectedIndex);

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

        const buildResultsView = (): VNode => {

            const resultsView: VNode = 

            h("div", { class: "results" }, [
                h("table", {}, [
                    h("thead", {}, [
                        h("tr", {}, [
                            h("td", {}, "name"),
                            h("td", {}, "description"),
                            h("td", {}, "key"),
                            h("td", {}, "created"),
                            h("td", {}, "owner")
                        ])
                    ]),
                    h("tbody", {}, buildTreesViews())
                ])
            ]);

            return resultsView;
        };

        const treeResultsView: VNode =

            h("div", { id: "searchLensView" }, [
                h("div", { id: "searchLens" }, [
                    h("h3", {}, "Select a tree"),

                    buildTopPagination(),
                    buildResultsView(),
                    buildBottomPagination(),
                    buildTreeDetailsView(),
                    buildActionsView()
                ])
            ]);

        return treeResultsView;
    }
}

export default treeResultsViews;
