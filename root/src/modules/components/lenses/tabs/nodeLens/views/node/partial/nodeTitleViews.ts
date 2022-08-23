import { h, VNode } from "hyperapp-local";

import lensControlsViews from "../../../../../lens/views/lensControlsViews";


const buildEditSubtitleView = (): VNode => {

    const view: VNode = 

        h("div", { class: "sub-icons" }, [
            h("div", { class: "properties-icon" }, ""),
            h("div", { class: "edit-icon" }, "")
        ]);

    return view;
};

const buildTitleView = (
    title: string,
    iconClass: string
): VNode[] => {

    const view: VNode[] = [

        lensControlsViews.build_Refresh_Show_ControlsView(),

        h("div", { class: "icons" }, [
            h("div", { class: iconClass }, ""),
        ]),
        h("h3", {}, title),
    ];

    return view;
};

const buildStashTitleView = (
    title: string,
    iconClass: string
): VNode[] => {

    const view: VNode[] = [

        lensControlsViews.build_Refresh_Show_ControlsView(),

        h("div", { class: "stash-edit" }, [
            h("div", { class: "icons" }, [
                h("div", { class: "icon-border" }, [
                    h("div", { class: iconClass }, ""),
                ]),
            ]),
            h("h3", {}, title),
            h("h5", { class: "warning" }, "Validation is not enforced in the stash"),
        ]),
    ];

    return view;
};

const buildCreateSubtitleView = (): VNode => {

    const view: VNode = 

        h("div", { class: "sub-icons" }, [
            h("div", { class: "properties-icon" }, ""),
            h("div", { class: "create-icon" }, "")
        ]);

    return view;
};

const buildEditTitleView = (
    title: string,
    iconClass: string
): VNode[] => {

    const view: VNode[] = [

        ...buildTitleView(
            title,
            iconClass
        ),
        
        buildEditSubtitleView()
    ];

    return view;
};

const buildEditStashTitleView = (
    title: string,
    iconClass: string
): VNode[] => {

    const view: VNode[] = [

        ...buildStashTitleView(
            title,
            iconClass
        ),
        
        buildEditSubtitleView()
    ];

    return view;
};

const buildCreateStashTitleView = (
    title: string,
    iconClass: string
): VNode[] => {

    const view: VNode[] = [

        ...buildStashTitleView(
            title,
            iconClass
        ),
        
        buildCreateSubtitleView()
    ];

    return view;
};

const buildCreateTitleView = (
    title: string,
    iconClass: string
): VNode[] => {

    const view: VNode[] = [

        ...buildTitleView(
            title,
            iconClass
        ),
        
        buildCreateSubtitleView()
    ];

    return view;
};

const nodeTitleViews = {

    buildEditDiscussionTitleView: (): VNode[] => {

        return buildEditTitleView(
            "Edit discussion",
            "discussion-icon"
        );
    },

    buildEditSolutionTitleView: (): VNode[] => {

        return buildEditTitleView(
            "Edit solution",
            "solution-icon"
        );
    },

    buildCreateDiscussionTitleView: (): VNode[] => {

        return buildCreateTitleView(
            "Add a discussion",
            "discussion-icon"
        );
    },

    buildCreateSolutionTitleView: (): VNode[] => {

        return buildCreateTitleView(
            "Add a solution",
            "solution-icon"
        );
    },

    buildEditRootTitleView: (): VNode[] => {

        return buildEditTitleView(
            "Edit root discussion",
            "root-icon"
        );
    },

    buildEditFlatNodeTitleView: (): VNode[] => {

        return buildEditTitleView(
            "Edit flat tree options",
            "flat-tree-icon"
        );
    },

    buildEditStashDiscussionTitleView: (): VNode[] => {

        return buildEditStashTitleView(
            "Edit stashed discussion",
            "discussion-icon"
        );
    },

    buildEditStashSolutionTitleView: (): VNode[] => {

        return buildEditStashTitleView(
            "Edit stashed solution",
            "solution-icon"
        );
    },

    buildCreateStashDiscussionTitleView: (): VNode[] => {

        return buildCreateStashTitleView(
            "Add a stashed discussion",
            "discussion-icon"
        );
    },

    buildCreateStashSolutionTitleView: (): VNode[] => {

        return buildCreateStashTitleView(
            "Add a stashed solution",
            "solution-icon"
        );
    },

    buildEditStashRootTitleView: (): VNode[] => {

        const view: VNode[] = [

            lensControlsViews.build_Refresh_Show_ControlsView(),

            h("div", { class: "icons" }, [
                h("div", { class: "stash-icon" }, ""),
            ]),
            h("h3", {}, "Edit stashed branches"),
            h("h5", { class: "warning" }, "Validation is not enforced in the stash"),
            
            buildEditSubtitleView()
        ];

        return view;
    },
};

export default nodeTitleViews;


