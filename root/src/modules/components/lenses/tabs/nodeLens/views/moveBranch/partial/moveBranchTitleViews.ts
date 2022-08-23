import { h, VNode } from "hyperapp-local";

import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import lensControlsViews from "../../../../../lens/views/lensControlsViews";
import navigationViews from "../../../../../lens/views/navigationViews";
import branchTaskActions from "../../../actions/branchTaskActions";
import ITabSave from "../../../../../../../interfaces/state/ui/tabs/ITabSave";
import gTabCode from "../../../../../../../global/code/gTabCode";
import IState from "../../../../../../../interfaces/state/IState";


const moveBranchTitleViews = {

    buildLocateOrOpenInTabView: (
        state: IState,
        optionToken: string,
        optionKey: string,
        nodeExists: boolean,
        className: string = ''): VNode | null => {

        if (optionToken === state.branchesState.tree.token) {

            return lensControlsViews.buildLocateButtonView(
                optionKey,
                'Show the option to be moved in tree-view',
                className
            );
        }
        else if (nodeExists === true) {

            return lensControlsViews.buildOpenNodeInNewTabButtonView(
                optionToken,
                optionKey,
                className
            );
        }

        return null;
    },

    buildTitleView: (
        state: IState,
        optionToken: string,
        optionKey: string,
        nodeExists: boolean,
        targetKey: string,
        stageBehaviour: IStageBehaviour): VNode[] => {

        const detailsView: VNode[] = [

            h("div", { class: "child-controls br-option" }, [

                navigationViews.buildForwardButton(stageBehaviour),
                navigationViews.buildBackButton(stageBehaviour),

                lensControlsViews.buildLocateButtonView(
                    targetKey,
                    'Show the target in the tree-view',
                    'br-target'
                ),

                moveBranchTitleViews.buildLocateOrOpenInTabView(
                    state,
                    optionToken,
                    optionKey,
                    nodeExists
                )
            ]),

            h("div", { class: "icon-group" }, [
                h("div", { class: "discussion-icon" }, ""),
                h("div", { class: "goto-icon" }, ""),
            ]),
            h("h3", {}, "Move branch"),
        ];

        return detailsView;
    },

    buildOptionTitleView: (
        state: IState,
        optionToken: string,
        optionKey: string,
        nodeExists: boolean,
        tab: ITabSave,
        stageBehaviour: IStageBehaviour): VNode[] => {

        const disabled = gTabCode.canSave(tab) === false;

        const detailsView: VNode[] = [

            h("div", { class: "child-controls br-option" }, [

                navigationViews.buildForwardButton(stageBehaviour, disabled),
                navigationViews.buildBackButton(stageBehaviour),

                lensControlsViews.buildClickSelectButtonView(
                    `Select an option by clicking on it in the branch-view`,
                    branchTaskActions.enableOptionClickSelect
                ),

                moveBranchTitleViews.buildLocateOrOpenInTabView(
                    state,
                    optionToken,
                    optionKey,
                    nodeExists
                )
            ]),

            h("div", { class: "icon-group" }, [
                h("div", { class: "discussion-icon" }, ""),
                h("div", { class: "goto-icon" }, ""),
            ]),
            h("h3", {}, "Move branch"),
        ];

        return detailsView;
    },

    buildTargetTitleView: (
        state: IState,
        optionToken: string,
        optionKey: string,
        nodeExists: boolean,
        targetKey: string,
        tab: ITabSave,
        stageBehaviour: IStageBehaviour): VNode[] => {

        const disabled = gTabCode.canSave(tab) === false;

        const detailsView: VNode[] = [

            h("div", { class: "child-controls br-target" }, [

                navigationViews.buildForwardButton(stageBehaviour, disabled),
                navigationViews.buildBackButton(stageBehaviour),

                lensControlsViews.buildClickSelectButtonView(
                    `Select a target discussion by clicking on it in the branch-view`,
                    branchTaskActions.enableTargetClickSelect
                ),

                lensControlsViews.buildLocateButtonView(
                    targetKey,
                    'Show the target in the tree-view'
                ),

                moveBranchTitleViews.buildLocateOrOpenInTabView(
                    state,
                    optionToken,
                    optionKey,
                    nodeExists,
                    'br-option'
                )
            ]),

            h("div", { class: "icon-group" }, [
                h("div", { class: "discussion-icon" }, ""),
                h("div", { class: "goto-icon" }, ""),
            ]),
            h("h3", {}, "Move branch"),
        ];

        return detailsView;
    }
};

export default moveBranchTitleViews;


