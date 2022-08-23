import { h, VNode } from "hyperapp-local";

import buttonViews from "../../../../../lens/views/buttonViews";
import ISocketTask from "../../../../../../../interfaces/state/tree/ISocketTask";
import mapSocketActions from "../../../actions/mapSocketActions";


const buttonsViews = {

    buildHubButtons: (_socketTask: ISocketTask): VNode => {

        const controlsView: VNode =

            h("div", { class: "spacer" }, [

                buttonsViews.buildEditSubtreeButtonView(),
            ]);

        return controlsView;
    },

    buildEditSubtreeButtonView: (): VNode => {

        const contentsView: VNode[] = [

            h("span", {}, "1"),
            h("div", { class: "properties-icon" }, ""),
            h("div", { class: "subtree-icon" }, "")
        ];

        return buttonViews.buildHollowButton(
            "Edit the subtree properties",
            "view-edit",
            contentsView,
            mapSocketActions.editSubtree
        );
    }
};

export default buttonsViews;


