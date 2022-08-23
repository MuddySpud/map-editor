import { Children, h } from "hyperapp-local";

import U from "../../../../../global/gUtilities";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import nodeActions from "../../../../lenses/tabs/nodeLens/actions/nodeActions";
import gTooltipActions from "../../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../../state/ui/payloads/StringEvent";

import "../scss/imagesButton.scss";


const imagesButtonViews = {

    buildShowImagesViewButton: (lensNode: INode<ILensUI>): Children[] => {

        if (!U.isNullOrWhiteSpace(lensNode.inputs)
            || window.TreeSolve.discussionPlugins.runsInBackground()) {

            // If inputs exist always display them
            return [];
        }

        let iconClass: string;
        let tooltip: string;

        if (lensNode.ui.showBlankInputs === true) {

            iconClass = "hide-slash-icon";
            tooltip = "Show image";
        }
        else {
            iconClass = "show-slash-icon";
            tooltip = "Hide image";
        }

        const controlsView: Children[] = [

            h("a",
                {
                    class: `images-button`,
                    onClick: [
                        nodeActions.toggleShowImages
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
                    h("div", { class: "images-icon" }, ""),
                    h("div", { class: `${iconClass}` }, "")
                ])
        ];

        return controlsView;
    }
};

export default imagesButtonViews;


