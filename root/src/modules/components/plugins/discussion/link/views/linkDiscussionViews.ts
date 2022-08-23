import { Children, h, VNode } from "hyperapp-local";

import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";
import inputErrorViews from "../../../../lenses/lens/views/inputErrorViews";
import NodeBaseElement from "../../../../../state/ui/payloads/NodeBaseElement";
import gHtmlActions from "../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../global/actions/gTooltipActions";
import IState from "../../../../../interfaces/state/IState";
import ILinkDiscussionJson from "../interfaces/ILinkDiscussionJson";
import linkDiscussionActions from "../actions/linkDiscussionActions";
import linkDiscussionCode from "../code/linkDiscussionCode";

import "../scss/link.scss"


const buildLinkView = (
    node: INode<ILensUI>,
    linkJson: ILinkDiscussionJson): VNode[] => {

    const view: VNode[] = [

        inputErrorViews.buildTitleErrorView(
            "Text",
            [linkJson.error]
        ),

        h("div", { class: "textarea-wrapper" },
            [
                h("textarea",
                    {
                        id: "discussion",
                        value: `${linkJson.link}`,
                        class: "edit",
                        textmode: "MultiLine",
                        placeholder: `...enter the link here...`,
                        onInput: [
                            linkDiscussionActions.setText,
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
                            (_event: any) => 'Enter the link'
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

const linkDiscussionViews = {

    buildDiscussionView: (
        _state: IState,
        lensNode: INode<ILensUI>): Children[] => {

        if (!lensNode.ui.discussionJson) {

            return [];
        }

        const linkJson: ILinkDiscussionJson = lensNode.ui.discussionJson as ILinkDiscussionJson;

        if (!linkJson) {

            return [];
        }

        linkDiscussionCode.validate(lensNode);
        const invalid: boolean = lensNode.errors.length > 0;

        const view: VNode[] = [

            h("div",
                {
                    id: "linkJsonView",
                    class: {
                        "discussion-main": true,
                        "invalid": invalid
                    }
                },
                [
                    ...buildLinkView(
                        lensNode,
                        linkJson
                    )
                ]
            )
        ];

        return view;
    }
};

export default linkDiscussionViews;


