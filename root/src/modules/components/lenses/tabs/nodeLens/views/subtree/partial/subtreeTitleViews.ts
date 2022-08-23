import { h, VNode } from "hyperapp-local";

import lensControlsViews from "../../../../../lens/views/lensControlsViews";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";


const buildSwapTitleView = (): VNode[] => {

    const view: VNode[] = [

        h("div", { class: "icons" }, [
            h("div", { class: "root-link-icon" }, ""),
            h("div", { class: "subtree-icon first" }, ""),
            h("div", { class: "swap-icon" }, ""),
            h("div", { class: "subtree-icon second" }, "")
        ]),
        h("h3", {}, "Swap subtree link"),
    ];

    return view;
};

const buildCreateTitleView = (): VNode[] => {

    const view: VNode[] = [

        h("div", { class: "icons" }, [
            h("div", { class: "root-link-icon" }, ""),
            h("div", { class: "subtree-icon first" }, ""),
        ]),
        h("h3", {}, "Create subtree link"),
    ];

    return view;
};

const buildCreateSubtreeAndLinkTitleView = (): VNode[] => {

    const view: VNode[] = [

        h("div", { class: "icons" }, [
            h("div", { class: "root-link-icon" }, ""),
            h("div", { class: "subtree-icon first" }, ""),
        ]),
        h("h3", {}, "Create subtree and link"),
    ];

    return view;
};

const buildEditTitleView = (): VNode[] => {

    const view: VNode[] = [

        h("div", { class: "icons" }, [
            h("div", { class: "root-link-icon" }, ""),
            h("div", { class: "subtree-icon" }, "")
        ]),
        h("h3", {}, "Edit subtree link"),
    ];

    return view;
};

const subtreeTitleViews = {

    buildSwapSelectTitleView: (stageBehaviour: IStageBehaviour): VNode[] => {

        const view: VNode[] = [

            lensControlsViews.build_Nav_Refresh_Show_Open_ControlsView(stageBehaviour),
            ...buildSwapTitleView(),

            h("h4", { class: "explain" }, `2. Select subtree`),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "select-icon" }, "")
            ]),
        ];

        return view;
    },

    buildCreateSelectTitleView: (stageBehaviour: IStageBehaviour): VNode[] => {

        const view: VNode[] = [

            lensControlsViews.build_Nav_Refresh_Show_Open_ControlsView(stageBehaviour),
            ...buildCreateTitleView(),

            h("h4", { class: "explain" }, `2. Select subtree`),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "select-icon" }, "")
            ]),
        ];

        return view;
    },

    buildSwapSearchTitleView: (stageBehaviour: IStageBehaviour): VNode[] => {

        const view: VNode[] = [

            lensControlsViews.build_Nav_Refresh_Show_Open_ControlsView(stageBehaviour),
            ...buildSwapTitleView(),

            h("h4", { class: "explain" }, `1. Search subtrees`),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "search-icon" }, "")
            ]),
        ];

        return view;
    },

    buildCreateSearchTitleView: (stageBehaviour: IStageBehaviour): VNode[] => {

        const view: VNode[] = [

            lensControlsViews.build_Nav_Refresh_Show_Open_ControlsView(stageBehaviour),
            ...buildCreateTitleView(),

            h("h4", { class: "explain" }, `1. Search subtrees`),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "search-icon" }, "")
            ]),
        ];

        return view;
    },

    buildEditTitleView: (stageBehaviour: IStageBehaviour): VNode[] => {

        const view: VNode[] = [

            lensControlsViews.build_Refresh_Show_Swap_Open_ControlsView(stageBehaviour),
            ...buildEditTitleView(),

            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "edit-icon" }, "")
            ]),
        ];

        return view;
    },

    buildPlugTitleView: (stageBehaviour: IStageBehaviour): VNode[] => {

        const stageNumber: number = stageBehaviour.getStageNumber();

        const view: VNode[] = [

            lensControlsViews.build_Nav_Refresh_Show_ControlsView(stageBehaviour),
            ...buildSwapTitleView(),

            h("h4", { class: "explain" }, `${stageNumber}. Link existing options to sockets`),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "socket-link-icon" }, ""),
                h("div", { class: "socket-icon" }, "")
            ]),
        ];

        return view;
    },

    buildSwapTitleView: (stageBehaviour: IStageBehaviour): VNode[] => {

        const stageNumber: number = stageBehaviour.getStageNumber();

        const view: VNode[] = [

            lensControlsViews.build_Nav_Refresh_Show_ControlsView(stageBehaviour),
            ...buildSwapTitleView(),

            h("h4", { class: "explain" }, `${stageNumber}. Review and save`),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "review-icon" }, "")
            ]),
        ];

        return view;
    },

    buildCreateTitleView: (stageBehaviour: IStageBehaviour): VNode[] => {

        const stageNumber: number = stageBehaviour.getStageNumber();

        const view: VNode[] = [

            lensControlsViews.build_Nav_Refresh_Show_ControlsView(stageBehaviour),
            ...buildCreateTitleView(),

            h("h4", { class: "explain" }, `${stageNumber}. Review and save`),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "review-icon" }, "")
            ]),
        ];

        return view;
    },

    buildCreateSubtreeAndLinkTitleView: (stageBehaviour: IStageBehaviour): VNode[] => {

        const stageNumber: number = stageBehaviour.getStageNumber();

        const view: VNode[] = [

            lensControlsViews.build_Nav_Refresh_Show_ControlsView(stageBehaviour),
            ...buildCreateSubtreeAndLinkTitleView(),

            h("h4", { class: "explain" }, `${stageNumber}. Review and save`),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "review-icon" }, "")
            ]),
        ];

        return view;
    },

    buildCreateTreeTitleView: (stageBehaviour: IStageBehaviour): VNode[] => {

        const view: VNode[] = [

            lensControlsViews.build_Nav_Refresh_Show_ControlsView(stageBehaviour),
            ...buildCreateSubtreeAndLinkTitleView(),

            h("h4", { class: "explain" }, "1. New tree properties"),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "tree-icon" }, "")
            ])
        ];

        return view;
    },

    buildCreateSubtreeTitleView: (stageBehaviour: IStageBehaviour): VNode[] => {

        const view: VNode[] = [

            lensControlsViews.build_Nav_Refresh_Show_ControlsView(stageBehaviour),
            ...buildCreateSubtreeAndLinkTitleView(),

            h("h4", { class: "explain" }, "3. New subtree properties"),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "subtree-icon" }, "")
            ])
        ];

        return view;
    }
};

export default subtreeTitleViews;


