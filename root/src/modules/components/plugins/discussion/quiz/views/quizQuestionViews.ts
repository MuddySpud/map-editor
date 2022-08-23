import { h, VNode } from "hyperapp-local";

import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";
import NodeBaseElement from "../../../../../state/ui/payloads/NodeBaseElement";
import gHtmlActions from "../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../global/actions/gTooltipActions";
import quizActions from "../actions/quizActions";
import IQuizJson from "../interfaces/IQuizJson";
import discussionViews from "../../../../lenses/tabs/nodeLens/views/node/partial/discussionViews";
import inputErrorViews from "../../../../lenses/lens/views/inputErrorViews";


const buildQuizQuestionTextInputView = (
    node: INode<ILensUI>,
    quiz: IQuizJson,
    showAudioText: boolean): VNode | null => {

    if (!showAudioText) {

        return null;
    }

    const tooltip: string = quiz.question.length === 0 ?
        `Enter the question text...` :
        `Edit the question text...`;

    const view: VNode =

        h("div", { class: "discussion-input" }, [
            // h("h4", {}, "Text"),

            inputErrorViews.buildTitleErrorView(
                "Text",
                [quiz.questionTextError]),

            h("div",
                {
                    class: {
                        "textarea-wrapper": true,
                    }
                },
                [
                    h("textarea",
                        {
                            id: "questionText",
                            value: `${quiz.questionText}`,
                            class: "edit",
                            textmode: "MultiLine",
                            placeholder: `...enter the question text here...`,
                            onInput: [
                                quizActions.setQuizQuestionText,
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

const buildQuizQuestionInputView = (
    node: INode<ILensUI>,
    quiz: IQuizJson): VNode => {

    const tooltip: string = quiz.question.length === 0 ?
        `Enter the question markdown...` :
        `Edit the question markdown...`;

    const view: VNode =

        h("div", { class: "discussion-input" }, [
            // h("h4", {}, "Markdown"),

            inputErrorViews.buildTitleErrorView(
                "Markdown",
                [quiz.questionError]),

            h("div",
                {
                    class: {
                        "textarea-wrapper": true,
                    }
                },
                [
                    h("textarea",
                        {
                            id: "questionMarkdown",
                            value: `${quiz.question}`,
                            class: "edit",
                            textmode: "MultiLine",
                            placeholder: `...enter the question markdown here...`,
                            onInput: [
                                quizActions.setQuizQuestionMarkdown,
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
            ),

            discussionViews.buildExpandEditorButtonView(
                quiz.question,
                quizActions.showQuizQuestionMarkdownEditor)

        ]);

    return view;
};

const quizQuestionViews = {

    buildQuizQuestionViews: (
        node: INode<ILensUI>,
        quiz: IQuizJson,
        showAudioText: boolean): VNode[] => {

        const view: VNode[] = [

            h("h4", {}, "Quiz question"),
            h("div", { class: "question" }, [

                buildQuizQuestionInputView(
                    node,
                    quiz),

                buildQuizQuestionTextInputView(
                    node,
                    quiz,
                    showAudioText)
            ])
        ];

        return view;
    }
};

export default quizQuestionViews;


