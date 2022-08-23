import { h, VNode } from "hyperapp-local";

import ISubtreeSys from "../../../../../../../interfaces/state/tree/ISubtreeSys";
import treeDetailsViews from "../../tree/partial/treeDetailsViews";
import headerControlViews from "../../../../../lens/views/headerControlViews";
import subtreeActions from "../../../../nodeLens/actions/subtreeActions";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import subtreeDetailsViews from "./subtreeDetailsViews";
import stSocketsViews from "./stSocketsViews";
import ISubtreeSearchCase from "../../../../../../../interfaces/state/ui/payloads/ISubtreeSearchCase";


const subtreeSearchCaseMinMaxViews = {

    buildDetailsMinimisedView: (subtreeSearchCase: ISubtreeSearchCase): VNode => {

        const view: VNode =

            h("div", { class: "action-details minimised" }, [

                subtreeSearchCaseMinMaxViews.buildControlView(
                    subtreeSearchCase,
                    true),

                subtreeSearchCaseMinMaxViews.buildMinSubtreeView(subtreeSearchCase.subtree)
            ]);

        return view;
    },

    buildDetailsMaximisedView: (subtreeSearchCase: ISubtreeSearchCase): VNode => {

        const view: VNode =

            h("div", { class: "action-details" }, [

                subtreeSearchCaseMinMaxViews.buildControlView(
                    subtreeSearchCase,
                    false),

                ...subtreeDetailsViews.buildTreeDetailsView(subtreeSearchCase.subtree.tree),

                ...subtreeDetailsViews.buildStRootDetailsView(
                    subtreeSearchCase.subtree.stRoot,
                    false),

                ...stSocketsViews.buildStSocketsDetailsView(subtreeSearchCase.subtree.stSockets),
            ]);

        return view;
    },

    buildCollapsibleDetailsView: (
        subtreeSearchCase: ISubtreeSearchCase,
        title: string): VNode[] => {

            let minimise: boolean;

            if (subtreeSearchCase.searchCase !== null
                && subtreeSearchCase.searchCase.brief !== null
                && subtreeSearchCase.searchCase.ui.overrideExpand === true) {

                minimise = subtreeSearchCase.searchCase.brief.subtreeResults.selectedExpanded === false;
            }
            else {
                minimise = subtreeSearchCase.subtree.ui.minimise;
            }

        let innardsView: VNode;

        if (minimise === true) {

            innardsView = subtreeSearchCaseMinMaxViews.buildDetailsMinimisedView(subtreeSearchCase);
        }
        else {
            innardsView = subtreeSearchCaseMinMaxViews.buildDetailsMaximisedView(subtreeSearchCase);
        }

        const view: VNode[] = [

            h("h4", {}, `${title}`),

            innardsView
        ];

        return view;
    },

    buildControlView: (
        subtreeSearchCase: ISubtreeSearchCase,
        isMinimised: boolean): VNode => {

        let tooltip: string = " the branch option";

        if (isMinimised === false) {

            tooltip = `Minimise${tooltip}`;
        }
        else {
            tooltip = `Maximise${tooltip}`;
        }

        return headerControlViews.buildMinimiseDataView(
            tooltip,
            subtreeSearchCase,
            subtreeActions.toggleMinimiseSubtreeSearchCase,
            isMinimised
        );
    },

    buildMinSubtreeView: (subtree: ISubtreeSys): VNode | null => {

        const view: VNode =

            h("div", { class: "detail" }, [
                h("div", { class: "tree" }, [

                    treeDetailsViews.buildNameView(subtree.tree, CssClasses.odd),
                    treeDetailsViews.buildDescriptionView(subtree.tree),
                    treeDetailsViews.buildKeyView(subtree.tree, CssClasses.odd)
                ])
            ]);

        return view;
    }
};

export default subtreeSearchCaseMinMaxViews;


