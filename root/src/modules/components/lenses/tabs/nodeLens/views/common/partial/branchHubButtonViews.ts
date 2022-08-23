import { h, VNode } from "hyperapp-local";

import buttonViews from "../../../../../lens/views/buttonViews";
import branchTaskActions from "../../../actions/branchTaskActions";


const branchHubButtonViews = {

    buildHubButtons: (): VNode => {

        const controlsView: VNode =

            h("div", { class: "spacer" }, [

                branchHubButtonViews.buildChangeOptionButtonView(),
                branchHubButtonViews.buildChangeTargetButtonView(),
            ]);

        return controlsView;
    },

    buildChangeOptionButtonView: (): VNode => {

        const contentsView: VNode[] = [

            h("span", {}, "1"),
            h("div", { class: "properties-icon" }, ""),
            h("div", { class: "discussion-icon" }, "")
        ];

        return buttonViews.buildHollowButton(
            "Edit or select an alternative option",
            "view-edit",
            contentsView,
            branchTaskActions.changeOption
        );
    },

    buildChangeTargetButtonView: (): VNode => {

        const contentsView: VNode[] = [

            h("span", {}, "2"),
            h("div", { class: "properties-icon" }, ""),
            h("div", { class: "target-icon" }, "")
        ];

        return buttonViews.buildHollowButton(
            "Edit or select an alternative target discussion",
            "view-edit",
            contentsView,
            branchTaskActions.changeTarget
        );
    }
};

export default branchHubButtonViews;


