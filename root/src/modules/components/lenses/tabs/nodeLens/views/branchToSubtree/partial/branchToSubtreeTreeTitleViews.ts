import { h, VNode, Children } from "hyperapp-local";

import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import lensControlsViews from "../../../../../lens/views/lensControlsViews";
import navigationViews from "../../../../../lens/views/navigationViews";
import gBranchToSubtreeActions from "../../../../../../../global/actions/gBranchToSubtreeActions";
import IState from "../../../../../../../interfaces/state/IState";
import branchTreeTaskActions from "../../../actions/branchTreeTaskActions";
import ITabSave from "../../../../../../../interfaces/state/ui/tabs/ITabSave";
import gTabCode from "../../../../../../../global/code/gTabCode";
import U from "../../../../../../../global/gUtilities";
import { ActionType } from "../../../../../../../interfaces/enums/ActionType";
import IHole from "../../../../../../../interfaces/state/tree/IHole";
import ISocketLoaderUI from "../../../../../../../interfaces/state/ui/UIs/ISocketLoaderUI";


const buildNavButtonsView = (
    optionKey: string,
    stageBehaviour: IStageBehaviour,
    resetButtonText: string): VNode => {

    const view: VNode =

        h("div", { class: "child-controls br-option" }, [

            navigationViews.buildForwardButton(stageBehaviour),
            navigationViews.buildBackButton(stageBehaviour),

            lensControlsViews.buildResetButtonView(
                resetButtonText,
                gBranchToSubtreeActions.resetTree
            ),

            lensControlsViews.buildLocateButtonView(
                optionKey,
                'Show the option selected to be subtree root in tree-view'
            )
        ]);

    return view;
};

const buildBranchToSubtreeTitleView = (): VNode[] => {

    const view: VNode[] = [

        h("div", { class: "icon-group" }, [
            h("div", { class: "discussion-icon" }, ""),
            h("div", { class: "goto-icon" }, ""),
            h("div", { class: "subtree-icon" }, "")
        ]),
        h("h3", {}, "Convert branch to subtree")
    ];

    return view;
};

const buildTitleNavButtonsView = (
    optionKey: string,
    stageBehaviour: IStageBehaviour,
    resetButtonText: string): VNode[] => {

    const view: VNode[] = [

        buildNavButtonsView(
            optionKey,
            stageBehaviour,
            resetButtonText
        ),

        ...buildBranchToSubtreeTitleView()
    ];

    return view;
};

const branchToSubtreeTreeTitleViews = {

    buildTreeTitleView: (
        optionKey: string,
        stageBehaviour: IStageBehaviour): VNode[] => {

        const detailsView = [

            ...buildTitleNavButtonsView(
                optionKey,
                stageBehaviour,
                'Reset the tree properties'
            ),

            h("h4", { class: "explain" }, "2. New tree properties"),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "tree-icon" }, "")
            ])
        ];

        return detailsView;
    },

    buildSubtreeTitleView: (
        optionKey: string,
        stageBehaviour: IStageBehaviour): VNode[] => {

        const detailsView = [

            ...buildTitleNavButtonsView(
                optionKey,
                stageBehaviour,
                'Reset the subtree properties'
            ),

            h("h4", { class: "explain" }, "3. New subtree properties"),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "subtree-icon" }, "")
            ])
        ];

        return detailsView;
    },

    buildBoundariesTitleView: (
        optionKey: string,
        stageBehaviour: IStageBehaviour): VNode[] => {

        const detailsView = [

            ...buildTitleNavButtonsView(
                optionKey,
                stageBehaviour,
                'Reset boundaries'
            ),

            h("h4", { class: "explain" }, "4. Define where the subtree stops"),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "socket-icon" }, "")
            ])
        ];

        return detailsView;
    },

    buildOptionTitleView: (
        optionKey: string,
        tab: ITabSave,
        stageBehaviour: IStageBehaviour,
        clickSelectDelegate: (state: IState) => IState
    ): VNode[] => {

        const disabled = gTabCode.canSave(tab) === false;

        const detailsView = [

            h("div", { class: "child-controls br-option" }, [

                navigationViews.buildForwardButton(stageBehaviour, disabled),
                navigationViews.buildBackButton(stageBehaviour),

                lensControlsViews.buildClickSelectButtonView(
                    `Select an option by clicking on it in the branch-view`,
                    clickSelectDelegate,
                ),

                lensControlsViews.buildLocateButtonView(
                    optionKey,
                    'Show the option selected to be subtree root in tree-view')
            ]),

            ...buildBranchToSubtreeTitleView(),

            h("h4", { class: "explain" }, "1. Select the option to be the new subtree's root"),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "root-icon" }, "")
            ])
        ];

        return detailsView;
    },

    buildLimitTitleView: (
        optionKey: string,
        limit: IHole<ISocketLoaderUI>,
        clickSelectDelegate: (state: IState) => IState): VNode[] => {

        const limitKey: string = limit.ui.recognised === true ? limit.key ?? '' : '';

        const buildIcons = (): VNode => {

            if (!limit.ui.recognised) {

                return h("div", { class: "boundary-icon" }, "");
            }

            if (limit.action === ActionType.MapLimitToSocket) {

                return h("div", { class: "limit-icon" }, "");
            }

            return h("div", { class: "hole-icon" }, "");
        };

        const locateButtons: Children[] = [];

        if (U.isPositiveNumeric(limitKey) === true) {

            locateButtons.push(

                lensControlsViews.buildLocateButtonView(
                    limitKey,
                    'Show limit in tree-view'
                )
            );
        }

        locateButtons.push(

            lensControlsViews.buildLocateButtonView(
                optionKey,
                'Show the option selected to be subtree root in tree-view'
            )
        );

        const detailsView = [

            h("div", { class: "child-controls br-limit" }, [

                navigationViews.buildCloseButton(
                    `Go back to the view: '4. Define where the subtree stops'`,
                    branchTreeTaskActions.cancelLimitForceSet
                ),

                lensControlsViews.buildClickSelectButtonView(
                    `Select an option by clicking on it in the branch-view`,
                    clickSelectDelegate,
                ),

                ...locateButtons
            ]),

            ...buildBranchToSubtreeTitleView(),

            h("h4", { class: "explain" }, "Enter option key for lower boundary on the new subtree"),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),

                buildIcons()
            ])
        ];

        return detailsView;
    },

    buildSummaryTitleView: (
        optionKey: string,
        stageBehaviour: IStageBehaviour): VNode[] => {

        const detailsView = [

            h("div", { class: "child-controls br-option" }, [

                navigationViews.buildForwardButton(stageBehaviour),
                navigationViews.buildBackButton(stageBehaviour),

                lensControlsViews.buildLocateButtonView(
                    optionKey,
                    'Show the option selected to be subtree root in tree-view'
                )
            ]),

            ...buildBranchToSubtreeTitleView(),

            h("h4", { class: "explain" }, "5. Review and save"),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "review-icon" }, "")
            ])
        ];

        return detailsView;
    }
};

export default branchToSubtreeTreeTitleViews;


