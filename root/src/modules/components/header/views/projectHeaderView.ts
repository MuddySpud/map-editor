import { h, VNode } from "hyperapp-local";

import IState from "../../../interfaces/state/IState";
import loadingView from "../../loading/views/loadingView";
import gTooltipActions from "../../../global/actions/gTooltipActions";
import StringEvent from "../../../state/ui/payloads/StringEvent";
import gTreeActions from "../../../global/actions/gTreeActions";
import U from "../../../global/gUtilities";
import headerControlViews from "../../lenses/lens/views/headerControlViews";
import branchesHeaderActions from "../actions/branchesHeaderActions";
import ITreeProject from "../../../interfaces/state/tree/ITreeProject";

import "../scss/index.scss";


const buildProjectButtonView = (treeProject: ITreeProject): VNode => {

    let iconClass: string;

    if (treeProject.isSubtree === true) {

        iconClass = "subtree-project-icon";
    }
    else if (treeProject.isFlat === true) {

        iconClass = "flat-tree-project-icon";
    }
    else if (treeProject.isLoop === true) {

        iconClass = "loop-tree-project-icon";
    }
    else {

        iconClass = "tree-project-icon";
    }

    const view: VNode =

        h("a",
            {
                class: "tree-button",
                onClick: [
                    gTreeActions.showTreeHub,
                    treeProject.key
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

const buildProjectDescriptionView = (treeProject: ITreeProject): VNode => {

    const shortDislayLength: number = 40;
    let description: string = treeProject.description;
    const isMinimised: boolean = treeProject.ui.treeDetailsMinimised === true;

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

const buildProjectDetails = (state: IState): VNode | null => {

    const treeProject: ITreeProject | null = state.projectState.treeProject;

    if (!treeProject) {

        return null;
    }

    const view: VNode =

        h("div", { class: "tree" }, [

            buildProjectButtonView(treeProject),

            h("span", {}, treeProject.name),

            buildProjectDescriptionView(treeProject)
        ]);

    return view;
};

const branchesHeaderView = {

    buildView: (state: IState): VNode => {

        const buildDetailsView = (): VNode | null => {

            if (state.loading) {

                return loadingView.buildView();
            }
            else {

                return buildProjectDetails(state);
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


