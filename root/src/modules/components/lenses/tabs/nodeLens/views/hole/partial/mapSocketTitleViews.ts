import { h, VNode } from "hyperapp-local";

import lensControlsViews from "../../../../../lens/views/lensControlsViews";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";


const buildSelectSocketTitleView = (stageBehaviour: IStageBehaviour): VNode[] => {

    const view: VNode[] = [

        lensControlsViews.build_Nav_Refresh_Show_ControlsView(stageBehaviour),

        h("div", { class: "icon-group" }, [
            h("div", { class: "hole-icon" }, ""),
            h("div", { class: "goto-icon" }, ""),
            h("div", { class: "socket-short-icon" }, "")
        ]),
        h("h3", {}, "Map hole to socket"),
    ];

    return view;
};

const mapSocketTitleViews = {

    buildSelectSocketTitleView: (stageBehaviour: IStageBehaviour): VNode[] => {

        const stageNumber: number = stageBehaviour.getStageNumber();

        const view: VNode[] = [

            ...buildSelectSocketTitleView(stageBehaviour),

            h("h4", { class: "explain" }, `${stageNumber}. Select socket`),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "socket-icon" }, "")
            ]),
        ];

        return view;
    },

    buildCreateSubtreeTitleView: (stageBehaviour: IStageBehaviour): VNode[] => {

        const stageNumber: number = stageBehaviour.getStageNumber();

        const view: VNode[] = [

            ...buildSelectSocketTitleView(stageBehaviour),

            h("h4", { class: "explain" }, `${stageNumber}. Subtree properties`),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "subtree-icon" }, "")
            ])
        ];

        return view;
    }
};

export default mapSocketTitleViews;


