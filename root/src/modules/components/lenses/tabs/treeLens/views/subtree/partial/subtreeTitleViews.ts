import { h, VNode } from "hyperapp-local";

import treeLensControlsViews from "../../common/partial/treeLensControlsViews";


const subtreeTitleViews = {

    buildCreateSubtreeTitleView: (): VNode[] => {

        const view: VNode[] = [

            treeLensControlsViews.build_Show_Hubs_ControlsView(),

            h("div", { class: "icon-group" }, [
                h("div", { class: "subtree-icon" }, "")
            ]),
            h("h3", {}, "Create subtree"),   
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "create-icon" }, "")
            ])
        ];

        return view;
    },

    buildEditSubtreeTitleView: (): VNode[] => {

        const view: VNode[] = [

            treeLensControlsViews.build_Show_Hubs_ControlsView(),

            h("div", { class: "icon-group" }, [
                h("div", { class: "subtree-icon" }, "")
            ]),
            h("h3", {}, "Edit subtree"),   
            h("div", { class: "sub-icons" }, [
                h("div", { class: "properties-icon" }, ""),
                h("div", { class: "edit-icon" }, "")
            ])
        ];

        return view;
    },
    
    buildSubtreeHubTitleView: (): VNode[] => {

        const view: VNode[] = [

            h("div", { class: "icons" }, [
                h("div", { class: "subtree-hub-icon" }, ""),
            ]),
            h("h3", {}, "Subtree hub"),
        ];

        return view;
    }
};

export default subtreeTitleViews;


