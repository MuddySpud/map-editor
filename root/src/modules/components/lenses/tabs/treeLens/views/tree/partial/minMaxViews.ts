import { h, VNode } from "hyperapp-local";

import ITreeSys from "../../../../../../../interfaces/state/tree/ITreeSys";
import treeDetailsViews from "../../tree/partial/treeDetailsViews";
import headerControlViews from "../../../../../lens/views/headerControlViews";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import ITreeStats from "../../../../../../../interfaces/state/tree/ITreeStats";
import gTreeActions from "../../../../../../../global/actions/gTreeActions";
import gTreeStatsActions from "../../../../../../../global/actions/gTreeStatsActions";
import loadingView from "../../../../../../../components/loading/views/loadingView";


const buildCollapsibleDetailsView = (
    tree: ITreeSys,
    title: string,
    buildMaximisedViewDelegate: (tree: ITreeSys) => VNode[]
): VNode[] => {

    let innardsView: VNode;

    if (tree.ui.minimise === true) {

        innardsView = buildDetailsMinimisedView(tree);
    }
    else {
        innardsView = buildDetailsMaximisedView(
            tree,
            buildMaximisedViewDelegate,
        );
    }

    const view: VNode[] = [

        h("h4", {}, `${title}`),

        innardsView
    ];

    return view;
};

const buildDetailsMinimisedView = (tree: ITreeSys): VNode => {

    const view: VNode =

        h("div", { class: "action-details minimised" }, [

            buildControlView(
                tree,
                true),

            buildMinTreeView(tree)
        ]);

    return view;
};

const buildDetailsMaximisedView = (
    tree: ITreeSys,
    buildMaximisedViewDelegate: (tree: ITreeSys) => VNode[]
): VNode => {

    const view: VNode =

        h("div", { class: "action-details" }, [

            buildControlView(
                tree,
                false),

            ...buildMaximisedViewDelegate(tree)
        ]);

    return view;
};

const buildStatsMinimisedView = (treeStats: ITreeStats): VNode => {

    const view: VNode =

        h("div", { class: "action-details minimised" }, [

            buildStatsControlView(
                treeStats,
                true),

            h("div", { class: "detail" }, [
                h("div", { class: "stats" }, [

                    treeDetailsViews.buildLastEditedView(treeStats, CssClasses.odd)
                ])
            ])
        ]);

    return view;
};

const buildCountsMaximisedView = (treeStats: ITreeStats): VNode => {

    const view: VNode =

        h("div", { class: "action-details" }, [

            buildCountsControlView(
                treeStats,
                false),

            ...treeDetailsViews.buildTreeCountsView(treeStats)
        ]);

    return view;
};

const buildCountsMinimisedView = (treeStats: ITreeStats): VNode => {

    const view: VNode =

        h("div", { class: "action-details minimised" }, [

            buildCountsControlView(
                treeStats,
                true),

            h("div", { class: "detail" }, [
                h("div", { class: "stats" }, [

                    treeDetailsViews.buildNodesCountView(treeStats, CssClasses.odd)
                ])
            ])
        ]);

    return view;
};

const buildStatsMaximisedView = (treeStats: ITreeStats): VNode => {

    const view: VNode =

        h("div", { class: "action-details" }, [

            buildStatsControlView(
                treeStats,
                false),

            ...treeDetailsViews.buildTreeStatsView(treeStats)
        ]);

    return view;
};

const buildControlView = (
    tree: ITreeSys,
    isMinimised: boolean): VNode => {

    let tooltip: string = " the tree details";

    if (isMinimised === false) {

        tooltip = `Minimise${tooltip}`;
    }
    else {
        tooltip = `Maximise${tooltip}`;
    }

    return headerControlViews.buildMinimiseDataView(
        tooltip,
        tree,
        gTreeActions.toggleMinimiseTree,
        isMinimised
    );
};

const buildCountsControlView = (
    treeStats: ITreeStats,
    isMinimised: boolean): VNode => {

    let tooltip: string = " the tree stats";

    if (isMinimised === false) {

        tooltip = `Minimise${tooltip}`;
    }
    else {
        tooltip = `Maximise${tooltip}`;
    }

    return headerControlViews.buildMinimiseDataView(
        tooltip,
        treeStats,
        gTreeStatsActions.toggleMinimiseCounts,
        isMinimised
    );
};

const buildStatsControlView = (
    treeStats: ITreeStats,
    isMinimised: boolean): VNode => {

    let tooltip: string = " the tree stats";

    if (isMinimised === false) {

        tooltip = `Minimise${tooltip}`;
    }
    else {
        tooltip = `Maximise${tooltip}`;
    }

    return headerControlViews.buildMinimiseDataView(
        tooltip,
        treeStats,
        gTreeStatsActions.toggleMinimiseStats,
        isMinimised
    );
};

const buildMinTreeView = (tree: ITreeSys): VNode | null => {

    const view: VNode =

        h("div", { class: "detail" }, [
            h("div", { class: "tree" }, [

                treeDetailsViews.buildNameView(tree, CssClasses.odd),
                treeDetailsViews.buildDescriptionView(tree),
                treeDetailsViews.buildKeyView(tree, CssClasses.odd)
            ])
        ]);

    return view;
};

const buildTreeShortDetailsView = (tree: ITreeSys): VNode[] => {

    const view: VNode[] = [

        treeDetailsViews.buildTreeShortDetailsView(tree)
    ];

    return view;
};

const buildTreeDetailsView = (tree: ITreeSys): VNode[] => {

    return treeDetailsViews.buildTreeDetailsView(tree);
};

const minMaxViews = {

    buildCollapsibleCountsView: (
        treeStats: ITreeStats | null,
        title: string): VNode[] => {

        if (!treeStats) {

            return [];
        }

        let innardsView: VNode;

        if (treeStats.ui.minimiseCounts === true) {

            innardsView = buildCountsMinimisedView(treeStats);
        }
        else {
            innardsView = buildCountsMaximisedView(treeStats);
        }

        const view: VNode[] = [

            h("h4", {}, `${title}`),

            innardsView
        ];

        return view;
    },

    buildCollapsibleStatsView: (
        treeStats: ITreeStats | null,
        title: string): VNode[] => {

        if (!treeStats) {

            return [
                loadingView.buildView("Loading stats...")
            ];
        }

        let innardsView: VNode;

        if (treeStats.ui.minimiseStats === true) {

            innardsView = buildStatsMinimisedView(treeStats);
        }
        else {
            innardsView = buildStatsMaximisedView(treeStats);
        }

        const view: VNode[] = [

            h("h4", {}, `${title}`),

            innardsView
        ];

        return view;
    },

    buildCollapsibleShortDetailsView: (
        tree: ITreeSys,
        title: string): VNode[] => {

        return buildCollapsibleDetailsView(
            tree,
            title,
            buildTreeShortDetailsView
        );
    },

    buildCollapsibleDetailsView: (
        tree: ITreeSys,
        title: string): VNode[] => {

        return buildCollapsibleDetailsView(
            tree,
            title,
            buildTreeDetailsView
        );
    }
};

export default minMaxViews;


