import { h, Children } from "hyperapp-local";

import IState from "../../../../../../../interfaces/state/IState";
import INode from "../../../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../../../interfaces/state/ui/UIs/ILensUI";
import typeViews from "./typeViews";
import { NodeType } from "../../../../../../../interfaces/enums/NodeType";
import wayPointViews from "../../../../../reserves/views/wayPointViews";


const stashViews = {

    buildStashRootView(
        state: IState,
        lensNode: INode<ILensUI>): Children[] {

        const lensTabBodyView: Children[] = [

            h("div", { class: "icons" }, [
                h("div", { class: "stash-icon" }, ""),
            ]),
            h("h3", {}, "Edit stash branches"),
            h("h5", { class: "warning" }, "Validation is not enforced in the stash"),

            window.TreeSolve.optionsPlugins.buildOptionsView(
                state,
                lensNode,
                'Branches',
                'locate-branch',
                true),
        ];

        return lensTabBodyView;
    },

    buildStashBranchedView(
        state: IState,
        lensNode: INode<ILensUI>): Children[] {

        let title: string = `Edit `;
        let icon: string = `-icon`;

        if (lensNode.type === NodeType.Discussion) {

            title += 'discussion';
            icon = `discussion${icon}`;
        }
        else if (lensNode.type === NodeType.Solution) {

            title += 'solution';
            icon = `solution${icon}`;
        }

        const lensTabBodyView: Children[] = [

            h("div", { class: "stash-edit" }, [
                h("div", { class: "icons" }, [
                    h("div", { class: "icon-border" }, [
                        h("div", { class: icon }, ""),
                    ]),
                ]),
                h("h3", {}, title),
                h("h5", { class: "warning" }, "Validation is not enforced in the stash"),
            ]),

            typeViews.buildTypeView(lensNode),

            ...window.TreeSolve.discussionPlugins.buildDiscussionView(
                state,
                lensNode,
                true
            ),

            wayPointViews.buildWayPointView(
                state, 
                lensNode
            ),

            window.TreeSolve.optionsPlugins.buildOptionsView(
                state,
                lensNode,
                'Options',
                'option',
                true),
        ];

        return lensTabBodyView;
    }
};

export default stashViews;


