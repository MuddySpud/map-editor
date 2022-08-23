import { h, VNode } from "hyperapp-local";

import INode from "../../../../interfaces/state/tree/INode";
import optionsViews from "./optionsViews";
import nodeActions from "../actions/nodeActions";
import { NodeType } from "../../../../interfaces/enums/NodeType";
import IBranchUI from "../../../../interfaces/state/ui/UIs/IBranchUI";
import IState from "../../../../interfaces/state/IState";
import U from "../../../../global/gUtilities";
import gBranchesStateCode from "../../../../global/code/gBranchesStateCode";


const nodeViews = {

    buildNodeView: (
        state: IState,
        node: INode<IBranchUI>,
        depth: number): VNode | null => {

        depth = gBranchesStateCode.incrementBranchesDepth(
            state,
            depth
        );

        let discussion: string = node.discussion;

        if (U.isNullOrWhiteSpace(discussion) === true) {

            if (node.isSocket) {

                discussion = '';
            }
            else if (node.ui.dummy) {

                if (node.ui.hole) {

                    discussion = `...use the Lens to map this hole to an socket...`;
                }
                else {
                    discussion = `...use the Lens to edit this node...`;
                }
            }
            else {
                return null;
            }
        }

        const show: boolean = node.ui.showNode === true;
        let selected: boolean = false;

        if (show) {

            node.ui.showNode = false;
        }

        if (node.ui.highlightTime > 0
            && node.ui.highlightTime < Date.now()) {

            node.ui.highlightTime = 0;
        }

        if (node.ui.selected === true
            || node.ui.branchTaskOption === true) {

            selected = true;
        }

        let buildNodeProperties = (): any => {

            const properties: any = {
                class: {
                    "node": true,
                    "solution": node.type === NodeType.Solution,
                    "link": node.isLink === true,
                    "selected": selected,
                    "empty": node.nodes.length === 0,
                    "dummy": node.ui.dummy === true,
                    "stash": node.isStash === true,
                    "socket": node.isSocket === true,
                    "hole": node.ui.hole === true,
                    "branch-target": node.ui.branchTaskTarget === true,
                    "branch-node": node.ui.branchTaskOption === true,
                    "scroll-show": show
                }
            };

            return properties;
        };

        const nodeView: VNode =

            h("div", buildNodeProperties(), [
                h("a",
                    {
                        onMouseDown: [
                            nodeActions.selectNode,
                            (_event: any) => node
                        ]
                    },
                    [
                        h("div", { class: "node-icon" }, ""),
                        h("span", { class: "discussion-text" }, `${discussion}`)
                    ]
                ),
                h("div", { class: "options" },

                    optionsViews.buildOptionsView(
                        state,
                        node.nodes,
                        depth
                    )
                )
            ]);

        return nodeView;
    }
};

export default nodeViews;
