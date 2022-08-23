import { h, VNode } from "hyperapp-local";

import treeLensControlsViews from "../../../treeLens/views/common/partial/treeLensControlsViews";
import ITreeSys from "../../../../../../interfaces/state/tree/ITreeSys";
import ITagsTab from "../../../../../../interfaces/state/ui/tabs/ITagsTab";
import treeDetailsViews from "../../../treeLens/views/tree/partial/treeDetailsViews";
import tagActions from "../../actions/tagActions";
import gTooltipActions from "../../../../../../global/actions/gTooltipActions";
import U from "../../../../../../global/gUtilities";
import gTagsCode from "../../../../../../global/code/gTagsCode";
import IPaginationDetails from "../../../../../../interfaces/state/ui/payloads/IPaginationDetails";
import paginationViews from "../../../../../pagination/views/paginationViews";
import ITagsCase from "../../../../../../interfaces/state/cases/ITagsCase";


const tagTabViews = {

    buildTabView: (
        tree: ITreeSys,
        tagsTab: ITagsTab): VNode | null => {

        if (!tagsTab.tagsCase) {

            return null;
        }

        const tagsCase: ITagsCase = tagsTab.tagsCase;
        tagsCase.fresh = false;
        let selectedKey: string = "";
        let selected: boolean = false;
        const kin: Array<ITreeSys> = tagsCase.kin as Array<ITreeSys>;
        const paginationDetails: IPaginationDetails = tagsCase.paginationDetails;

        if (tagsCase
            && U.isNullOrWhiteSpace(tagsCase.selectedKey) === false) {

            selected = true;
            selectedKey = tagsCase?.selectedKey;
        }

        const buildSelectedTreesDetailsView = (): VNode[] => {

            if (U.isNullOrWhiteSpace(selectedKey) === true) {

                return [];
            }

            const tree: ITreeSys | null = gTagsCode.getTree(
                kin,
                tagsCase?.selectedKey as string
            );

            if (tree) {

                const view: VNode[] = [

                    h("h4", {}, `Selected`),
                    h("div", { class: "details" }, [
                        ...treeDetailsViews.buildTreeDetailsView(tree)
                    ])
                ];

                return view;
            }

            return [];
        };

        const buildTreeRowView = (
            tree: ITreeSys,
            selected: boolean): VNode | null => {

            if (!tree) {

                return null;
            }

            const view =

                h("tr",
                    {
                        key: `${tree.key}`,
                        class: {
                            selected: selected
                        },
                        onClick: [
                            tagActions.select,
                            (_event: any) => tree.key
                        ],
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => "Click to select tree and view its details below"
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    [
                        h("td", { class: "td-open" }, [
                            h("div", { class: "tick" }, "")
                        ]),
                        h("td", {}, `${tree.name}`),
                        h("td", {}, `${tree.key}`),
                        h("td", {}, `${tree.created}`),
                        h("td", { class: "show-new-lines" }, `${tree.tags}`),
                        h("td", {}, `${tree.owner}`)
                    ]);

            return view;
        };

        const buildKinRowViews = (): VNode[] => {

            const kinViews: VNode[] = [];
            let kinView: VNode | null;

            kin.forEach((tree: ITreeSys) => {

                kinView = buildTreeRowView(
                    tree,
                    selected && tree.key === selectedKey
                );

                if (kinView) {

                    kinViews.push(kinView);
                }
            });

            return kinViews;
        };

        const buildPagination = (isBottom: boolean): VNode | null => {

            return paginationViews.buildView(
                isBottom,
                paginationDetails,
                tagActions.showTagsPage,
                tagsCase);
        };

        const buildTopPagination = (): VNode | null => {

            return buildPagination(false);
        };

        const buildBottomPagination = (): VNode | null => {

            return buildPagination(true);
        };

        const buildKinTableView = (): VNode => {

            const view: VNode =

                h("div", { class: "results" }, [
                    h("table", {}, [
                        h("thead", {}, [
                            h("tr", {}, [
                                h("td", { class: "td-open" }, ""),
                                h("td", {}, "name"),
                                h("td", {}, "key"),
                                h("td", {}, "created"),
                                h("td", {}, "tags"),
                                h("td", {}, "owner")
                            ])
                        ]),
                        h("tbody", {}, buildKinRowViews())
                    ])
                ]);

            return view;
        };

        const tagResultsView: VNode =

            h("div", { id: "tagsLensView" }, [
                h("div", { id: "tagsLens" }, [

                    treeLensControlsViews.build_Refresh_Show_Hub_ControlsView(),

                    h("div", { class: "icons" }, [
                        h("div", { class: "tags-icon" }, ""),
                    ]),
                    h("h3", {}, "Matching tags"),
                    h("h4", {}, `Hub`),
                    h("div", { class: "details" }, [
                        ...treeDetailsViews.buildTreeDetailsView(tree)
                    ]),

                    buildTopPagination(),
                    buildKinTableView(),
                    buildBottomPagination(),
                    ...buildSelectedTreesDetailsView(),
                    // buttonsViews.buildActionsView(searchCase)
                ])
            ]);

        return tagResultsView;
    }
};

export default tagTabViews;


