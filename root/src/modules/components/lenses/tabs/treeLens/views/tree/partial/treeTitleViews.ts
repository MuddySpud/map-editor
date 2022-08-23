import { h, VNode } from "hyperapp-local";

import treeLensControlsViews from "../../common/partial/treeLensControlsViews";


const treeTitleViews = {

    buildEditTreeTitleView: (): VNode[] => {

        const view: VNode[] = [

            treeLensControlsViews.build_Refresh_Show_Hub_ControlsView(),

            h("div", { class: "icons" }, [
                h("div", { class: "tree-icon" }, ""),
            ]),
            h("h3", {}, "Edit tree"),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "edit-icon" }, "")
            ])
        ];

        return view;
    },

    buildCreateTreeTitleView: (): VNode[] => {

        const view: VNode[] = [

            treeLensControlsViews.build_Refresh_Show_Hub_ControlsView(),

            h("div", { class: "icons" }, [
                h("div", { class: "tree-icon" }, ""),
            ]),
            h("h3", {}, "Create tree"),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "create-icon" }, "")
            ])
        ];

        return view;
    },

    buildCloneTreeTitleView: (): VNode[] => {

        const view: VNode[] = [

            treeLensControlsViews.build_Refresh_Show_Hub_ControlsView(),

            h("div", { class: "icon-group" }, [
                h("div", { class: "tree-icon" }, ""),
                h("div", { class: "goto-icon" }, ""),
                h("div", { class: "tree-icon" }, ""),
                h("div", { class: "tree-icon cloned" }, "")
            ]),
            h("h3", {}, "Clone tree"),
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "create-icon" }, "")
            ])
        ];

        return view;
    },

    buildTreeHubTitleView: (): VNode[] => {

        const view: VNode[] = [

            h("div", { class: "icons" }, [
                h("div", { class: "tree-hub-icon" }, ""),
            ]),
            h("h3", {}, "Tree hub"),
        ];

        return view;
    }
};

export default treeTitleViews;


