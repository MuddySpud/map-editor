import { h, VNode } from "hyperapp-local";

import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";
import inputErrorViews from "../../../../lenses/lens/views/inputErrorViews";
import IState from "../../../../../interfaces/state/IState";
import IQuizJson from "../interfaces/IQuizJson";
import quizRulesViews from "./quizRulesViews";
import quizQuestionViews from "./quizQuestionViews";
import quizAnswerViews from "./quizAnswerViews";
import quizCode from "../code/quizCode";

import "../scss/quiz.scss";


const quizDiscussionViews = {

    buildDiscussionView: (
        state: IState,
        lensNode: INode<ILensUI>): VNode[] => {

        if (!lensNode.ui.discussionJson) {

            return [];
        }

        const quiz: IQuizJson = lensNode.ui.discussionJson as IQuizJson;

        quizCode.validateQuiz(
            lensNode,
            quiz);

        if (!quiz) {

            return [];
        }

        const showAudioText: boolean = state.branchesState.tree.allowDiscussionPluginAudio;
        const invalid: boolean = lensNode.errors.length > 0;

        const view: VNode[] = [

            h("div",
                {
                    id: "quizJsonView",
                    class: {
                        "invalid": invalid
                    }
                },
                [
                    h("div", { class: "error-summary" }, [

                        inputErrorViews.buildErrorView(lensNode.errors)
                    ]),

                    ...quizRulesViews.buildRulesViews(quiz.rules),

                    ...quizQuestionViews.buildQuizQuestionViews(
                        lensNode,
                        quiz,
                        showAudioText),

                    ...quizAnswerViews.buildQuizAnswersViews(quiz)
                ]
            )
        ];

        return view;
    }
};

export default quizDiscussionViews;


