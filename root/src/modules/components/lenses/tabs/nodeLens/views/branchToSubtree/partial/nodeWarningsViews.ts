import { h, VNode } from "hyperapp-local";

import IBranchTreeTask from "../../../../../../../interfaces/state/tree/IBranchTreeTask";
import INode from "../../../../../../../interfaces/state/tree/INode";
import IBranchUI from "../../../../../../../interfaces/state/ui/UIs/IBranchUI";
import tableViews from "../../../../../lens/views/tableViews";
import errorsViews from "../../../../../lens/views/errorsViews";
import branchToSubtreeActions from "../../../actions/branchToSubtreeActions";
import ISubtreeLoader from "../../../../../../../interfaces/state/tree/ISubtreeLoader";
import headerControlViews from "../../../../../lens/views/headerControlViews";
import gNodeActions from "../../../../../../../global/actions/gNodeActions";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import buttonViews from "../../../../../lens/views/buttonViews";


const nodeWarningsViews = {

    buildWarningsView: (branchTreeTask: IBranchTreeTask): VNode | null => {

        if (!branchTreeTask) {

            return null;
        }

        if (branchTreeTask.subtreeLoader.warnNodes.length === 0) {

            return h("h4", {}, `No warnings`);
        }

        if (branchTreeTask.subtreeLoader.ui.minimiseWarnings === true) {

            return nodeWarningsViews.buildMinisedWarningsView(branchTreeTask);
        }

        return nodeWarningsViews.buildMaximisedWarningsView(branchTreeTask);
    },

    buildMaximisedWarningsView: (branchTreeTask: IBranchTreeTask): VNode => {

        const buildNotes = (): VNode => {

            const view: VNode =

                h("ul", {}, [
                    h("li", { class: "notes" }, "Warnings can be ignored at this stage."),
                    h("li", { class: "notes" }, "They will need to be addressed before any tree that references this subtree can be published."),
                    h("li", { class: "notes" }, "Local to this subtree only."),
                    h("li", { class: "notes" }, "Errors in referenced subtrees are shown in a full validation or publish.")
                ]);

            return view;
        };

        const warnViews: VNode[] = [];
        let warnView: VNode | null;
        let counter: number = 0;

        branchTreeTask.subtreeLoader.warnNodes.forEach((warnNode: INode<IBranchUI>) => {

            warnView = nodeWarningsViews.buildWarningView(
                warnNode,
                `${++counter}`);

            if (warnView) {

                warnViews.push(warnView);
            }
        });

        const view: VNode =

            h("div", { class: "warnings" }, [
                h("h4", {}, `Warnings`),
                h("div", { class: "warnings-box" }, [

                    nodeWarningsViews.buildWarningsControlView(
                        branchTreeTask.subtreeLoader,
                        false),

                    buildNotes(),
                    ...warnViews
                ])
            ]);

        return view;
    },

    buildMinisedWarningsView: (branchTreeTask: IBranchTreeTask): VNode => {

        const count: number = branchTreeTask.subtreeLoader.warnNodes.length;
        const text: string = count === 1 ?
            '1 warning' :
            `${branchTreeTask.subtreeLoader.warnNodes.length} warnings`;


        const view: VNode =

            h("div", { class: "warnings minimised" }, [
                h("div", { class: "warnings-box" }, [

                    nodeWarningsViews.buildWarningsControlView(
                        branchTreeTask.subtreeLoader,
                        true),

                    h("h4", {}, text)
                ])
            ]);

        return view;
    },

    buildWarningsControlView: (
        subtreeLoader: ISubtreeLoader,
        isMinimised: boolean): VNode => {

        let tooltip: string = " warnings";

        if (isMinimised === false) {

            tooltip = `Minimise${tooltip}`;
        }
        else {
            tooltip = `Maximise${tooltip}`;
        }

        return headerControlViews.buildMinimiseDataView(
            tooltip,
            subtreeLoader,
            branchToSubtreeActions.toggleMinimiseWarnings,
            isMinimised
        );
    },

    buildWarningView: (
        warnNode: INode<IBranchUI>,
        index: string): VNode | null => {

        if (!warnNode) {
            return null;
        }

        const view: VNode =

            h("div", { class: "warning" }, [
                h("div", { class: "warning-box" }, [

                    buttonViews.buildOpenInBranchesViewButton(
                        warnNode,
                        "Show this node in the tree-view",
                        "open-view",
                        gNodeActions.showOption),

                    h("div", { class: "warning-data" }, [

                        tableViews.build3ColumnIndexKeyValueRowView(
                            index,
                            'key',
                            warnNode.key,
                            CssClasses.odd
                        ),

                        tableViews.build3ColumnKeyValueRowView(
                            'discussion',
                            warnNode.discussion
                        ),

                        tableViews.build3ColumnKeyValueRowView(
                            'option',
                            warnNode.option,
                            CssClasses.odd
                        ),

                        tableViews.build3ColumnKeyValueViewRowView(
                            'errors',
                            errorsViews.buildErrorsTableView(warnNode.errors)
                        )
                    ])
                ])
            ]);

        return view;
    }
};

export default nodeWarningsViews;


