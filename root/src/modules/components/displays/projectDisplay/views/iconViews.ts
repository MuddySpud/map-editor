import { h, VNode } from "hyperapp-local";

import ITreeProject from "../../../../interfaces/state/tree/ITreeProject";


const iconViews = {

    buildSubtreeIcon: (tree: ITreeProject): VNode | null => {

        if (!tree.isSubtree) {

            return null;
        }

        return h("div", { class: "subtree-icon" }, "");
    },

    buildTickIcon: (selected: boolean): VNode | null => {

        if (!selected) {

            return null;
        }

        return h("div", { class: "tick-icon" }, "");
    },

    buildBotIcon: (tree: ITreeProject): VNode | null => {

        if (!tree.isBot) {

            return null;
        }

        return h("div", { class: "bot-icon" }, "");
    },

    buildTreeIcon: (tree: ITreeProject): VNode => {

        let classNames: string = "tree-icon";

        if (tree.isFlat === true) {

            classNames = "flat-tree-icon";
        }
        else if (tree.isLoop === true) {

            classNames = "loop-tree-icon";
        }

        return h("div", { class: `${classNames}` }, "");
    },

    buildEditIcon: (): VNode => {

        return h("div", { class: "edit-icon" }, "");
    },

    buildDeleteIcon: (): VNode => {

        return h("div", { class: "delete-icon" }, "");
    },

    buildBranchesIcon: (): VNode => {

        return h("div", { class: "branches-icon" }, "");
    },

    buildProjectIcon: (tree: ITreeProject): VNode => {

        let className: string = "";

        if (tree.isSubtree === true) {

            className = "subtree-project-icon"
        }
        else if (tree.isFlat === true) {

            className = "flat-tree-project-icon"
        }
        else if (tree.isLoop === true) {

            className = "loop-tree-project-icon"
        }
        else {

            className = "tree-project-icon"
        }

        return h("div", { class: className }, "");
    }
};

export default iconViews;


