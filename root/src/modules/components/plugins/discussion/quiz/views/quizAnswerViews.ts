import { Children, h, VNode } from "hyperapp-local";

import gHtmlActions from "../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../global/actions/gTooltipActions";
import StringEvent from "../../../../../state/ui/payloads/StringEvent";
import quizActions from "../actions/quizActions";
import CssClasses from "../../../../../state/constants/CssClasses";
import IQuizJson from "../interfaces/IQuizJson";
import IAnswers from "../interfaces/IAnswers";
import { SelectType } from "../interfaces/enums/SelectType";
import selectView from "../../../../lenses/lens/views/selectView";
import U from "../../../../../global/gUtilities";
import IAnswer from "../interfaces/IAnswer";
import AnswerElement from "../models/AnswerElement";
import inputErrorViews from "../../../../lenses/lens/views/inputErrorViews";


const buildRemoveAnswerView = (answer: string): VNode | null => {

    const removeAnswerView: VNode =

        h("div",
            {
                class: "btn-delete",
                draggable: "false",
                onClick: [
                    quizActions.deleteAnswer,
                    answer
                ],
                onMouseOver: [
                    gTooltipActions.showTooltip,
                    (_event: any) => `Delete this answer`
                ],
                onMouseOut: gTooltipActions.clearTooltip
            },
            ""
        );

    return removeAnswerView;
};

const buildAnswerView = (
    answer: IAnswer,
    index: number): VNode | null => {

    const tooltip: string = "Edit this answer";
    let errorView: VNode | null = null;

    if (!U.isNullOrWhiteSpace(answer.error)) {

        errorView = h("span", { class: "answer-error" }, `${answer.error}`);
    }

    const optionView: VNode =

        h("li", {}, [
            h("div", { class: "answer-box" },
                [
                    buildRemoveAnswerView(answer.value),

                    h("span", { class: "answer-index" }, `${index}`),
                    h("div",
                        {
                            class: "textarea-wrapper"
                        },
                        [
                            h("textarea",
                                {
                                    id: `answer_${answer.key}`,
                                    value: `${answer.value}`,
                                    class: "edit",
                                    textmode: "MultiLine",
                                    placeholder: `...enter the answer text here...`,
                                    draggable: "false",
                                    onInput: [
                                        quizActions.setAnswerText,
                                        (event: any) => {
                                            return new AnswerElement(
                                                event.target,
                                                answer
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
                            )
                        ],

                        buildAnswerCorrectView(answer),
                        errorView,
                    )
                ]
            )
        ]);

    return optionView;
};

const buildAnswerCorrectView = (answer: IAnswer): VNode => {

    let tooltip: string = "Select to mark this answer as ";
    let className = CssClasses.nope;

    if (answer.correct === true) {

        tooltip = `${tooltip} correct`;
        className = CssClasses.yep;
    }
    else {
        tooltip = `${tooltip} incorrect`;
    }

    const view: VNode =

        h("div", { class: "answer-correct" }, [
            h("button",
                {
                    type: "button",
                    class: "click-select",
                    onClick: [
                        quizActions.toggleAnswerCorrect,
                        (_event: any) => answer
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                tooltip,
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                [
                    h("div", { class: `${className}` }, ""),
                    h("span", {}, `Correct`)
                ]
            ),
        ]);

    return view;

};

const buildSelectAnswerTypeView = (
    selectType: string,
    selected: boolean): VNode => {

    const view =

        h("div",
            {
                class: {
                    "select-row": true,
                    "selected": selected === true
                },
                onMouseDown: [
                    quizActions.setSelectAnswerType,
                    (_event: any) => selectType
                ]
            },
            [
                h("div", { class: "select-cell" }, [
                    h("div", { class: "tick" }, ""),
                ]),
                h("div", { class: "select-cell" }, `${selectType}`),
            ]
        );

    return view;
};

const buildSelectAnswersTypeView = (answers: IAnswers): VNode | null => {

    const answerViews: Children[] = [

        h("div", { class: "select-header" }, [
            h("div", { class: "select-cell-tick" }, ""),
            h("div", { class: "select-cell" }, ""),
        ])
    ];

    let answerView: VNode;

    for (let selectType in SelectType) {

        if (isNaN(Number(selectType))) {

            answerView = buildSelectAnswerTypeView(
                selectType,
                selectType === answers.select
            );

            answerViews.push(answerView);
        }
    }

    const buttonText: string =
        U.isNullOrWhiteSpace(answers.select) === true
            || answers.ui.showAnswerTypes ?
            "Choose an answer type..." :
            answers.select;

    const view: VNode =

        h("div", { class: "answer-type-select" }, [
            // h("h4", {}, 'Type'),

            inputErrorViews.buildTitleErrorView(
                "Type",
                [ answers.error ]),

            selectView.buildSelectView(
                answerViews,
                buttonText,
                answers.ui.showAnswerTypes,
                true,
                quizActions.showAnswerTypes,
                quizActions.hideAnswerTypes,
                quizActions.clearAnswerTypes
            )
        ]);

    return view;
}

const quizAnswerViews = {

    buildQuizAnswersViews: (quiz: IQuizJson): VNode[] => {
    
        const answerViews: VNode[] = [];
        let answerView: VNode | null = null;
    
        for (let i = 0; i < quiz.answers.answers.length; i++) {
    
            answerView = buildAnswerView(
                quiz.answers.answers[i],
                i + 1);
    
            if (answerView) {
    
                answerViews.push(answerView);
            }
        }
    
        const buildAddAnswerView = (): VNode | null => {
    
            const addOptionView: VNode =
    
                h("div", { class: "add" }, [
                    h("div",
                        {
                            class: "btn-add",
                            onClick: quizActions.addAnswer,
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => `Add a new answer`
                            ],
                            onMouseOut: gTooltipActions.clearTooltip
                        },
                        ""
                    ),
                ]);
    
            return addOptionView;
        };
    
        const view: VNode[] = [
    
            h("h4", {}, "Quiz answers"),
            h("div", { class: "answers" }, [
    
                buildSelectAnswersTypeView(quiz.answers),

                h("ul", { id: "answersList" }, answerViews),
    
                buildAddAnswerView()
            ])
        ];
    
        return view;
    }    
};

export default quizAnswerViews;


