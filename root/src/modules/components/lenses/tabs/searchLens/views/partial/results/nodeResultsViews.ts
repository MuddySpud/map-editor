import { h, VNode } from "hyperapp-local";

import ISearchCase from "../../../../../../../interfaces/state/Search/ISearchCase";
import ISearchBrief from "../../../../../../../interfaces/state/Search/ISearchBrief";
import INodeResults from "../../../../../../../interfaces/state/Search/INodeResults";
import buttonsViews from "./buttonsViews";
import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import gSearchNodeActions from "../../../../../../../global/actions/gSearchNodeActions";
import nodeDetailsViews from "../../../../nodeLens/views/node/partial/nodeDetailsViews";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../../../../state/ui/payloads/StringEvent";
import gNodeActions from "../../../../../../../global/actions/gNodeActions";
import IPaginationDetails from "../../../../../../../interfaces/state/ui/payloads/IPaginationDetails";
import paginationViews from "../../../../../../pagination/views/paginationViews";
import searchActions from "../../../actions/searchActions";


const nodeResultsViews = {

    buildResultsView: (searchCase: ISearchCase): VNode | null => {

        if (!searchCase
            || !searchCase.brief) {

            return null;
        }

        const searchBrief: ISearchBrief = searchCase.brief as ISearchBrief;
        const paginationDetails: IPaginationDetails = searchBrief.paginationDetails;
        const nodeResults: INodeResults = searchBrief.nodeResults;
        const nodes: Array<INodeBase> = nodeResults.results;

        const buildNodeDetailsView = (): VNode | null => {

            if (nodeResults.selectedIndex < 0) {

                return null;
            }

            const selectedNode: INodeBase = nodes[nodeResults.selectedIndex];

            return nodeDetailsViews.buildFullNodeDetailsView(selectedNode);
        };

        const buildNodeTableView = (
            node: INodeBase,
            selected: boolean): VNode => {

            const nodeView: VNode =

                h("tr",
                    {
                        key: `${node.key}_${node.token}`,
                        class: {
                            selected: selected
                        },
                        onClick: [
                            gSearchNodeActions.selectNode,
                            (_event: any) => {

                                searchBrief.selectedKey = node.key;
                                searchBrief.selectedToken = node.token;

                                return searchCase;
                            }
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltipWithEvent,
                            (event: any) => {
                                return new StringEvent(
                                    "Click to select node",
                                    event
                                );
                            }
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    [
                        h("td", { class: "td-open" }, [
                            h("div", { class: "tick" }, ""),
                            h("div",
                                {
                                    class: "open-subtree",
                                    onClick: [
                                        gNodeActions.openNodeWithKey,
                                        (_event: any) => node
                                    ],
                                    onMouseOver: [
                                        gTooltipActions.showTooltipWithEvent,
                                        (event: any) => {
                                            return new StringEvent(
                                                "Show node location within the tree - in a new tab",
                                                event
                                            );
                                        }
                                    ],
                                    onMouseOut: gTooltipActions.clearTooltip
                                },
                                ""
                            )
                        ]),
                        h("td", {}, `${node.option}`),
                        h("td", {}, `${node.discussion}`),
                        h("td", {}, `${node.token}`),
                        h("td", {}, `${node.key}`),
                        h("td", {}, `${node.order}`),
                    ]);

            return nodeView;
        };

        const buildNodesViews = (): VNode[] => {

            const nodeViews: VNode[] = [];
            let nodeView: VNode;

            for (let i = 0; i < nodes.length; i++) {

                nodeView = buildNodeTableView(
                    nodes[i],
                    i === nodeResults.selectedIndex);

                nodeViews.push(nodeView);
            }

            return nodeViews;
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
                            h("td", { class: "td-open" }, ""),
                            h("td", {}, "option"),
                            h("td", {}, "discussion"),
                            h("td", {}, "token"),
                            h("td", {}, "key"),
                            h("td", {}, "order"),
                        ])
                    ]),
                    h("tbody", {}, buildNodesViews())
                ])
            ]);

            return resultsView;
        };

        const treeResultsView: VNode =

            h("div", { id: "searchLensView" }, [
                h("div", { id: "searchLens" }, [
                    h("h3", {}, "Select a node"),

                    buildTopPagination(),
                    buildResultsView(),
                    buildBottomPagination(),
                    buildNodeDetailsView(),
                    buttonsViews.buildActionsView(searchCase)
                ])
            ]);

        return treeResultsView;
    }
};

export default nodeResultsViews;


