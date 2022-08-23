import { Children, h, VNode } from "hyperapp-local";

import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";
import ITitleTextDiscussionJson from "../interfaces/ITitleTextDiscussionJson";
import titleTextDiscussionCode from "../code/titleTextDiscussionCode";
import inputErrorViews from "../../../../lenses/lens/views/inputErrorViews";
import titleTextDiscussionActions from "../actions/titleTextDiscussionActions";
import NodeBaseElement from "../../../../../state/ui/payloads/NodeBaseElement";
import gHtmlActions from "../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../global/actions/gTooltipActions";
import { NodeType } from "../../../../../interfaces/enums/NodeType";
import IState from "../../../../../interfaces/state/IState";

import "../scss/titleText.scss"


const buildTitleView = (
    node: INode<ILensUI>,
    titleTextJson: ITitleTextDiscussionJson,
    type: string): VNode[] => {

    const end = `the ${type} title...`;

    const tooltip: string = node.discussion.length === 0 ?
        `Enter ${end}` :
        `Edit ${end}`;

    const view: VNode[] = [

        inputErrorViews.buildTitleErrorView(
            "Title",
            [titleTextJson.error]),

        h("div", { class: "textarea-wrapper" },
            [
                h("textarea",
                    {
                        id: "discussion",
                        value: `${titleTextJson.title}`,
                        class: "edit",
                        textmode: "MultiLine",
                        placeholder: `...enter the ${type.toLowerCase()} title here...`,
                        onInput: [
                            titleTextDiscussionActions.setTitle,
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
        )
    ];

    return view;
};

const buildTextView = (
    node: INode<ILensUI>,
    titleTextJson: ITitleTextDiscussionJson,
    type: string): VNode[] => {

    const end = `the ${type} text...`;

    const tooltip: string = node.discussion.length === 0 ?
        `Enter ${end}` :
        `Edit ${end}`;

    const view: VNode[] = [

        inputErrorViews.buildTitleErrorView(
            "Text",
            [titleTextJson.error]),

        h("div", { class: "textarea-wrapper" },
            [
                h("textarea",
                    {
                        id: "discussion",
                        value: `${titleTextJson.text}`,
                        class: "edit",
                        textmode: "MultiLine",
                        placeholder: `...enter the ${type.toLowerCase()} text here...`,
                        onInput: [
                            titleTextDiscussionActions.setText,
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
        )
    ];

    return view;
};

const titleTextDiscussionViews = {

    buildDiscussionView: (
        _state: IState,
        lensNode: INode<ILensUI>): Children[] => {

        if (!lensNode.ui.discussionJson) {

            return [];
        }

        const titleTextJson: ITitleTextDiscussionJson = lensNode.ui.discussionJson as ITitleTextDiscussionJson;

        if (!titleTextJson) {

            return [];
        }

        titleTextDiscussionCode.validate(lensNode);
        const invalid: boolean = lensNode.errors.length > 0;
        let type: string = "Discussion";

        if (lensNode.type === NodeType.Solution) {

            type = "Solution";
        }

        const view: VNode[] = [

            h("div",
                {
                    id: "titleTextJsonView",
                    class: {
                        "discussion-main": true,
                        "invalid": invalid
                    }
                },
                [
                    ...buildTitleView(
                        lensNode,
                        titleTextJson,
                        type),

                    ...buildTextView(
                        lensNode,
                        titleTextJson,
                        type)
                ]
            )
        ];

        return view;
    }
};

export default titleTextDiscussionViews;


