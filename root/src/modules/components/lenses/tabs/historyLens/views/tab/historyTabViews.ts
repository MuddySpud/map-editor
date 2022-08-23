import { h, VNode } from "hyperapp-local";

import gTooltipActions from "../../../../../../global/actions/gTooltipActions";
import IHistoryTab from "../../../../../../interfaces/state/ui/tabs/IHistoryTab";
import U from "../../../../../../global/gUtilities";
import historyDetailsViews from "../partial/historyDetailsViews";
import IDeed from "../../../../../../interfaces/state/notifications/IDeed";
import gHistoryCode from "../../../../../../global/code/gHistoryCode";
import historyActions from "../../actions/historyActions";
import IPaginationDetails from "../../../../../../interfaces/state/ui/payloads/IPaginationDetails";
import IHistoryCase from "../../../../../../interfaces/state/cases/IHistoryCase";
import paginationViews from "../../../../../pagination/views/paginationViews";


const historyTabViews = {

    buildTabView: (historyTab: IHistoryTab): VNode | null => {

        if (!historyTab.historyCase) {

            return null;
        }

        const historyCase: IHistoryCase = historyTab.historyCase;
        historyCase.fresh = false;
        let selectedID: string = "";
        let selected: boolean = false;
        const deeds: Array<IDeed> = historyCase.deeds as Array<IDeed>;
        const paginationDetails: IPaginationDetails = historyCase.paginationDetails;

        if (U.isNullOrWhiteSpace(historyCase.selectedID) === false) {

            selected = true;
            selectedID = historyCase.selectedID;
        }

        const buildSelectedDeedDetailsView = (): VNode[] => {

            if (U.isNullOrWhiteSpace(selectedID) === true) {
                return [];
            }

            const deed: IDeed | null = gHistoryCode.getDeed(
                deeds,
                historyCase.selectedID as string
            );

            if (deed) {

                const view: VNode[] = [

                    h("h4", {}, `Selected`),
                    h("div", { class: "details" }, [
                        historyDetailsViews.buildDetailsView(deed)
                    ])
                ];

                return view;
            }

            return [];
        };

        const buildDeedRowView = (
            deed: IDeed,
            selected: boolean): VNode | null => {

            if (!deed) {

                return null;
            }

            const view: VNode =

                h("tr",
                    {
                        key: `${deed.id}`,
                        class: {
                            selected: selected
                        },
                        onClick: [
                            historyActions.select,
                            (_event: any) => deed.id
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => "Click to select deed and view its details below"
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    [
                        h("td", { class: "td-open" }, [
                            h("div", { class: "tick" }, "")
                        ]),
                        h("td", {}, `${deed.id}`),
                        h("td", {}, `${deed.itemKey}`),
                        h("td", {}, `${deed.itemToken}`),
                        h("td", {}, `${deed.action?.toString()}`),
                        h("td", {}, `${deed.created}`)
                    ]);

            return view;
        };

        const buildDeedRowViews = (): VNode[] => {

            const deedViews: VNode[] = [];
            let deedView: VNode | null;

            deeds.forEach((deed: IDeed) => {

                deedView = buildDeedRowView(
                    deed,
                    selected && deed.id === selectedID
                );

                if (deedView) {

                    deedViews.push(deedView);
                }
            });

            return deedViews;
        };

        const buildPagination = (isBottom: boolean): VNode | null => {

            return paginationViews.buildView(
                isBottom,
                paginationDetails,
                historyActions.showHistoryPage,
                historyCase);
        };

        const buildTopPagination = (): VNode | null => {

            return buildPagination(false);
        };

        const buildBottomPagination = (): VNode | null => {

            return buildPagination(true);
        };

        const buildDeedTableView = (): VNode => {

            const tableView: VNode =

                h("div", { class: "results" }, [
                    h("table", {}, [
                        h("thead", {}, [
                            h("tr", {}, [
                                h("td", { class: "td-open" }, ""),
                                h("td", {}, "id"),
                                h("td", {}, "item key"),
                                h("td", {}, "item token"),
                                h("td", {}, "action"),
                                h("td", {}, "created")
                            ])
                        ]),
                        h("tbody", {}, buildDeedRowViews())
                    ])
                ]);

            return tableView;
        };

        const historyResultsView: VNode =

            h("div", { id: "historyLensView" }, [
                h("div", { id: "historyLens" }, [

                    // treeLensControlsViews.build_Refresh_Show_Hub_ControlsView(),

                    h("div", { class: "icons" }, [
                        h("div", { class: "history-icon" }, ""),
                    ]),
                    h("h3", {}, "History"),

                    buildTopPagination(),
                    buildDeedTableView(),
                    buildBottomPagination(),
                    ...buildSelectedDeedDetailsView(),
                    // buttonsViews.buildActionsView(searchCase)
                ])
            ]);

        return historyResultsView;
    }
};

export default historyTabViews;


