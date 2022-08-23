import { h, VNode } from "hyperapp-local";

import ITreeSys from "../../../../interfaces/state/tree/ITreeSys";


const iconViews = {

    buildSubtreeIcon: (tree: ITreeSys): VNode | null => {

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

    buildBotIcon: (tree: ITreeSys): VNode | null => {

        if (!tree.isBot) {

            return null;
        }

        return h("div", { class: "bot-icon" }, "");
    },

    buildTreeIcon: (tree: ITreeSys): VNode => {

        let classNames: string = "tree-icon";

        if (tree.isFlat === true) {

            classNames = "flat-tree-icon";
        }
        else if (tree.isLoop === true) {

            classNames = "loop-tree-icon";
        }

        return h("div", { class: `${classNames}` }, "");
    },

    buildEditIcon: (_tree: ITreeSys): VNode => {

        return h("div", { class: "edit-icon" }, "");
    },

    buildDeleteIcon: (_tree: ITreeSys): VNode => {

        return h("div", { class: "delete-icon" }, "");
    },

    buildBranchesIcon: (_tree: ITreeSys): VNode => {

        return h("div", { class: "branches-icon" }, "");
    },

    buildProjectIcon: (_tree: ITreeSys): VNode => {

        return h("div", { class: "tree-project-icon" }, "");
    }
};

export default iconViews;


