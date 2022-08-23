import { h, VNode } from "hyperapp-local";

import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import lensControlsViews from "../../../../../lens/views/lensControlsViews";
import navigationViews from "../../../../../lens/views/navigationViews";
import branchTaskActions from "../../../actions/branchTaskActions";
import ITabSave from "../../../../../../../interfaces/state/ui/tabs/ITabSave";
import gTabCode from "../../../../../../../global/code/gTabCode";
import IState from "../../../../../../../interfaces/state/IState";


const stashBranchTitleViews = {

    buildLocateOrOpenInTabView: (
        state: IState,
        optionToken: string,
        optionKey: string,
        nodeExists: boolean,
        type: string,
        className: string = ''): VNode | null => {

        if (optionToken === state.branchesState.tree.token) {

            return lensControlsViews.buildLocateButtonView(
                optionKey,
                `Show the option to be ${type}d to the stash in tree-view`,
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
        type: string,
        stageBehaviour: IStageBehaviour): VNode[] => {

        const detailsView: VNode[] = [

            h("div", { class: "child-controls br-option" }, [

                navigationViews.buildForwardButton(stageBehaviour),
                navigationViews.buildBackButton(stageBehaviour),

                stashBranchTitleViews.buildLocateOrOpenInTabView(
                    state,
                    optionToken,
                    optionKey,
                    nodeExists,
                    type
                )
            ]),

            h("div", { class: "icon-group" }, [
                h("div", { class: "discussion-icon" }, ""),
                h("div", { class: "goto-icon" }, ""),
                h("div", { class: "stash-icon" }, ""),
            ]),
            h("h3", {}, "Stash branch"),
        ];

        return detailsView;
    },

    buildOptionTitleView: (
        state: IState,
        optionToken: string,
        optionKey: string,
        nodeExists: boolean,
        type: string,
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

                stashBranchTitleViews.buildLocateOrOpenInTabView(
                    state,
                    optionToken,
                    optionKey,
                    nodeExists,
                    type
                )
            ]),

            h("div", { class: "icon-group" }, [
                h("div", { class: "discussion-icon" }, ""),
                h("div", { class: "goto-icon" }, ""),
                h("div", { class: "stash-icon" }, ""),
            ]),
            h("h3", {}, "Stash branch"),
        ];

        return detailsView;
    }
};

export default stashBranchTitleViews;


