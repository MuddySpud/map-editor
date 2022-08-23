import { h, VNode } from "hyperapp-local";

import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";
import NodeBaseElement from "../../../../../state/ui/payloads/NodeBaseElement";
import markdownActions from "../actions/markdownActions";
import gHtmlActions from "../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../global/actions/gTooltipActions";
import inputErrorViews from "../../../../lenses/lens/views/inputErrorViews";
import IState from "../../../../../interfaces/state/IState";
import discussionViews from "../../../../lenses/tabs/nodeLens/views/node/partial/discussionViews";
import IMarkdownJson from "../interfaces/IMarkdownJson";
import markdownCode from "../code/markdownCode";
import { NodeType } from "../../../../../interfaces/enums/NodeType";

import '../scss/markdown.scss';


const buildDiscussionTextInputView = (
    node: INode<ILensUI>,
    markdown: IMarkdownJson,
    invalid: boolean,
    type: string,
    tooltip: string,
    showAudioText: boolean): VNode | null => {

    if (!showAudioText) {

        return null;
    }

    const view: VNode =

        h("div", { class: "discussion-input" }, [
            // h("h4", {}, "Text"),

            inputErrorViews.buildTitleErrorView(
                "Text",
                [markdown.textError]),

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
                            id: "discussionText",
                            value: `${markdown.text}`,
                            class: "edit",
                            textmode: "MultiLine",
                            placeholder: `...enter the ${type.toLowerCase()} text here...`,
                            onInput: [
                                markdownActions.setDiscussionText,
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
        ]);

    return view;
};

const buildDiscussionMarkdownInputView = (
    node: INode<ILensUI>,
    markdown: IMarkdownJson,
    invalid: boolean,
    type: string,
    tooltip: string): VNode => {

    const view: VNode =

        h("div", { class: "discussion-input" }, [
            // h("h4", {}, "Markdown"),

            inputErrorViews.buildTitleErrorView(
                "Markdown",
                [markdown.markdownError]),

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
                            id: "discussionMarkdown",
                            value: `${markdown.markdown}`,
                            class: "edit",
                            textmode: "MultiLine",
                            placeholder: `...enter the ${type.toLowerCase()} markdown here...`,
                            onInput: [
                                markdownActions.setDiscussionMarkdown,
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

                    discussionViews.buildExpandEditorButtonView(
                        markdown.markdown,
                        markdownActions.showMarkdownEditor)        
                ]
            )
        ]);

    return view;
};

const markdownDiscussionViews = {

    buildDiscussionView: (
        state: IState,
        lensNode: INode<ILensUI>): VNode[] => {

        if (!lensNode.ui.discussionJson) {

            return [];
        }

        const markdown: IMarkdownJson = lensNode.ui.discussionJson as IMarkdownJson;

        if (!markdown) {

            return [];
        }

        markdownCode.validateMarkdown(
            lensNode,
            markdown);

        const showAudioText: boolean = state.branchesState.tree.allowDiscussionPluginAudio;
        const invalid: boolean = lensNode.errors.length > 0;

        let type: string = "Discussion";

        if (lensNode.type === NodeType.Solution) {

            type = "Solution";
        }

        const tooltip: string = lensNode.discussion.length === 0 ?
            `Enter the markdown...` :
            `Edit the markdown...`;

        const view: VNode[] = [

            h("div",
                {
                    id: "markdownJsonView",
                    class: {
                        "discussion-main": true,
                        "invalid": invalid
                    }
                },
                [
                    buildDiscussionMarkdownInputView(
                        lensNode,
                        markdown,
                        invalid,
                        type,
                        tooltip),

                    buildDiscussionTextInputView(
                        lensNode,
                        markdown,
                        invalid,
                        type,
                        tooltip,
                        showAudioText)
                ]
            )
        ];

        return view;
    }
};

export default markdownDiscussionViews;


