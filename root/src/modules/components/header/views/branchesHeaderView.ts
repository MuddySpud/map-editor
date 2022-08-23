import { h, VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";
import loadingView from "../../loading/views/loadingView";
import gTooltipActions from "../../../global/actions/gTooltipActions";
import StringEvent from "../../../state/ui/payloads/StringEvent";
import gTreeActions from "../../../global/actions/gTreeActions";
import U from "../../../global/gUtilities";
import headerControlViews from "../../../components/lenses/lens/views/headerControlViews";
import branchesHeaderActions from "../actions/branchesHeaderActions";

import "../scss/index.scss";


const buildTreeButtonView = (state: IState): VNode => {

    let iconClass: string;

    if (state.branchesState.tree.isSubtree === true) {

        iconClass = "subtree-icon";
    }
    else if (state.branchesState.tree.isFlat === true) {

        iconClass = "flat-tree-icon";
    }
    else if (state.branchesState.tree.isLoop === true) {

        iconClass = "loop-tree-icon";
    }
    else {

        iconClass = "tree-icon";
    }

    const view: VNode =

        h("a",
            {
                class: "tree-button",
                onClick: [
                    gTreeActions.showTreeHub,
                    state.branchesState.tree.key
                ],
                onMouseOver: [
                    gTooltipActions.showTooltipWithEvent,
                    (event: any) => {
                        return new StringEvent(
                            "Show in the tree hub",
                            event
                        );
                    }
                ],
                onMouseOut: gTooltipActions.clearTooltip
            },
            [
                h("div", { class: `${iconClass}` }, "")
            ]
        );

    return view;
};

const buildTreeDescriptionControlsView = (
    fullDescriptionLength: string,
    isMinimised: boolean,
    shortDislayLength: number): VNode | null => {

    if (fullDescriptionLength.length <= shortDislayLength) {

        return null;
    }

    let tooltip: string = " the tree's description";

    if (isMinimised === true) {

        tooltip = `Maximise${tooltip}`;
    }
    else {
        tooltip = `Minimise${tooltip}`;
    }

    return headerControlViews.buildMinimiseDataView(
        tooltip,
        null,
        branchesHeaderActions.toggleMinimiseTreeDescription,
        isMinimised
    );
};

const buildTreeDescriptionView = (state: IState): VNode => {

    const shortDislayLength: number = 40;
    let description: string = state.branchesState.tree.description;
    const isMinimised: boolean = state.branchesState.treeDetailsMinimised === true;

    const controlsView: VNode | null = buildTreeDescriptionControlsView(
        description,
        isMinimised,
        shortDislayLength
    );

    if (isMinimised === true) {

        description = U.shortPrintText(
            description, 
            shortDislayLength);
    }

    const view: VNode =

        h("div", { class: "description-box" }, [
            h("div", { class: "description-row" }, [
                h("div", { class: "description" }, `${description}`),

                controlsView
            ])
        ]);

    return view;
};

const buildTreeDetails = (state: IState): VNode => {

    const view: VNode =

        h("div", { class: "tree" }, [

            buildTreeButtonView(state),

            h("span", {}, state.branchesState.tree.name),

            buildTreeDescriptionView(state)
        ]);

    return view;
};

const branchesHeaderView = {

    buildView: (state: IState): VNode => {

        const buildDetailsView = (): VNode => {

            if (state.loading) {

                return loadingView.buildView();
            }
            else {

                return buildTreeDetails(state);
            }
        };

        const view: VNode =

            h("div", { id: "headerView" }, [
                h("div", { id: "header" }, [

                    buildDetailsView()
                ])
            ]);

        return view;
    }
};

export default branchesHeaderView;


