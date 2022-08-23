import { h, VNode } from "hyperapp-local";


const iconViews = {

    buildTickIcon: (selected: boolean): VNode | null => {

        if (!selected) {

            return null;
        }

        return h("div", { class: "tick-icon" }, "");
    },

    buildAliasIcon: (): VNode | null => {

        return h("div", { class: "bot-icon" }, "");
    },

    buildDraftIcon: (): VNode | null => {

        return h("div", { class: "draft-icon" }, "");
    },

    buildEditIcon: (): VNode => {

        return h("div", { class: "edit-icon" }, "");
    },

    buildPromoteIcon: (): VNode => {

        return h("div", { class: "promote-icon" }, "");
    },

    buildDeleteIcon: (): VNode => {

        return h("div", { class: "delete-icon" }, "");
    }
};

export default iconViews;


