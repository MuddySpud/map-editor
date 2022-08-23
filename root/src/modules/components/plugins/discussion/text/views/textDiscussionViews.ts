import { h, VNode } from "hyperapp-local";

import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";
import { NodeType } from "../../../../../interfaces/enums/NodeType";
import NodeBaseElement from "../../../../../state/ui/payloads/NodeBaseElement";
import nodeActions from "../actions/nodeActions";
import gHtmlActions from "../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../global/actions/gTooltipActions";
import inputErrorViews from "../../../../lenses/lens/views/inputErrorViews";
import IState from "../../../../../interfaces/state/IState";

import "../scss/text.scss";


const buildDiscussionInputView = (
    node: INode<ILensUI>,
    invalid: boolean,
    type: string,
    tooltip: string): VNode => {

    const view: VNode =

        h("div",
            {
                class: {
                    "textarea-wrapper": true,
                    "invalid": invalid
                }
            },
            [
                h("textarea",
                    {
                        id: "discussion",
                        value: `${node.discussion}`,
                        class: "edit",
                        textmode: "MultiLine",
                        placeholder: `...enter the ${type.toLowerCase()} here...`,
                        onInput: [
                            nodeActions.setDiscussionJson,
                            (event: any) => {
                                return new NodeBaseElement(
                                    node,
                                    event.target
                                );
                            }
                        ],
                        onBlur: gHtmlActions.clearFocus,
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => tooltip
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    ""
                ),
            ]
        );

    return view;
};

const textDiscussionViews = {

    buildDiscussionView: (
        state: IState,
        lensNode: INode<ILensUI>): VNode[] => {

        let type: string = "Discussion";

        if (lensNode.type === NodeType.Solution) {

            type = "Solution";
        }

        if (state.branchesState.tree.allowDiscussionPlugins) {

            type = `${type} text`;
        }

        const invalid: boolean = lensNode.errors.length > 0;

        const tooltip: string = lensNode.discussion.length === 0 ?
            `Enter the ${type.toLowerCase()}...` :
            `Edit the ${type.toLowerCase()}...`;

        const view: VNode[] = [

            h("div",
                {
                    id: "textDiscussionView",
                    class: {
                        "invalid": invalid
                    }
                },
                [
                    inputErrorViews.buildTitleErrorView(
                        type,
                        lensNode.errors),

                    buildDiscussionInputView(
                        lensNode,
                        invalid,
                        type,
                        tooltip)
                ]
            )
        ];

        return view;
    }
};

export default textDiscussionViews;


