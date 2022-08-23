import { h, VNode } from "hyperapp-local";

import U from "../../../../global/gUtilities";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import nodeActions from "../../tabs/nodeLens/actions/nodeActions";
import gTooltipActions from "../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../state/ui/payloads/StringEvent";

import "../scss/inputsButton.scss";


const inputsButtonViews = {

    buildShowInputsViewButton: (lensNode: INode<ILensUI>): VNode | null => {

        if (!U.isNullOrWhiteSpace(lensNode.inputs)
            || window.TreeSolve.discussionPlugins.runsInBackground()) {

            // If inputs exist always display them
            return null;
        }

        let iconClass: string;
        let tooltip: string;

        if (lensNode.ui.showBlankInputs === true) {

            iconClass = "hide-slash-icon";
            tooltip = "Show inputs";
        }
        else {
            iconClass = "show-slash-icon";
            tooltip = "Hide inputs";
        }

        const controlsView: VNode =

            h("a",
                {
                    class: `inputs-button`,
                    onClick: [
                        nodeActions.toggleShowInputs
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                tooltip,
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: "inputs-icon" }, ""),
                    h("div", { class: `${iconClass}` }, "")
                ]);

        return controlsView;
    }
};

export default inputsButtonViews;


