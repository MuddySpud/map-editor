import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import INodeBaseElement from "../../../../../interfaces/state/ui/payloads/INodeBaseElement";
import IQuizJson from "../interfaces/IQuizJson";
import { SelectType } from "../interfaces/enums/SelectType";
import gSession from "../../../../../global/gSession";
import QuizFilters from "../constants/QuizFilters";
import IAnswer from "../interfaces/IAnswer";
import AnswerElement from "../models/AnswerElement";
import quizCode from "../code/quizCode";
import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";
import IMdEditor from "../interfaces/IMdEditor";
import MdEditor from "../editor/MdEditor";
import IQuizDiscussionPlugin from "../interfaces/IQuizDiscussionPlugin";


const quizActions = {

    showAnswerTypes: (state: IState): IState => {

        if (!state.lens.nodeTab.lensNode) {

            return state;
        }

        const quizDiscussionPlugin: IQuizDiscussionPlugin | null = quizCode.tryGetQuizPlugin();

        if (!quizDiscussionPlugin) {

            return state;
        }

        const quiz: IQuizJson = state.lens.nodeTab.lensNode.ui.discussionJson as IQuizJson;

        if (quiz) {

            quiz.answers.ui.showAnswerTypes = true;
        }

        gSession.setFocusFilter(QuizFilters.answerSelectTypeFilter);

        return gStateCode.cloneState(state);
    },

    hideAnswerTypes: (state: IState): IState => {

        if (!state.lens.nodeTab.lensNode) {

            return state;
        }

        const quizDiscussionPlugin: IQuizDiscussionPlugin | null = quizCode.tryGetQuizPlugin();

        if (!quizDiscussionPlugin) {

            return state;
        }

        const quiz: IQuizJson = state.lens.nodeTab.lensNode.ui.discussionJson as IQuizJson;

        if (quiz) {

            quiz.answers.ui.showAnswerTypes = false;
        }

        gSession.removeFocusFilter(QuizFilters.answerSelectTypeFilter);

        return gStateCode.cloneState(state);
    },

    clearAnswerTypes: (state: IState): IState => {

        if (!state.lens.nodeTab.lensNode) {

            return state;
        }

        const quizDiscussionPlugin: IQuizDiscussionPlugin | null = quizCode.tryGetQuizPlugin();

        if (!quizDiscussionPlugin) {

            return state;
        }

        const quiz: IQuizJson = state.lens.nodeTab.lensNode.ui.discussionJson as IQuizJson;

        if (quiz) {

            quiz.answers.select = SelectType.None;
        }

        return gStateCode.cloneState(state);
    },

    setSelectAnswerType: (
        state: IState,
        selectType: SelectType): IState => {

        if (!state.lens.nodeTab.lensNode) {

            return state;
        }

        const quizDiscussionPlugin: IQuizDiscussionPlugin | null = quizCode.tryGetQuizPlugin();

        if (!quizDiscussionPlugin) {

            return state;
        }

        const quiz: IQuizJson = state.lens.nodeTab.lensNode.ui.discussionJson as IQuizJson;

        if (quiz) {

            quiz.answers.select = selectType;
            quiz.answers.ui.showAnswerTypes = false;
            gSession.removeFocusFilter(QuizFilters.quizQuestionFocusFilter);
        }

        return gStateCode.cloneState(state);
    },

    showQuizQuestionMarkdownEditor: (
        state: IState,
        markdown: string): IState => {

        if (!state.lens.nodeTab.lensNode) {

            return state;
        }

        const quizDiscussionPlugin: IQuizDiscussionPlugin | null = quizCode.tryGetQuizPlugin();

        if (!quizDiscussionPlugin) {

            return state;
        }

        const mdEditor: IMdEditor = new MdEditor();
        quizDiscussionPlugin.mdEditor = mdEditor;
        mdEditor.showEditor = true;
        mdEditor.text = markdown;

        return gStateCode.cloneState(state);
    },

    setQuizQuestionMarkdown: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (state.lens.nodeTab.lensNode?.ui.discussionJson
            && state.lens.nodeTab.lensNode?.ui.discussionJson.type === DiscussionType.QuizJson) {

            const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
            const quizJson: IQuizJson = state.lens.nodeTab.lensNode.ui.discussionJson as IQuizJson;
            quizJson.question = `${textarea.value}`;
            state.lens.nodeTab.lensNode.ui.raw = false;
        }

        return gStateCode.cloneState(state);
    },

    setQuizQuestionText: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (state.lens.nodeTab.lensNode?.ui.discussionJson
            && state.lens.nodeTab.lensNode?.ui.discussionJson.type === DiscussionType.QuizJson) {

            const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
            const quizJson: IQuizJson = state.lens.nodeTab.lensNode.ui.discussionJson as IQuizJson;
            quizJson.questionText = `${textarea.value}`;
            state.lens.nodeTab.lensNode.ui.raw = false;
        }

        return gStateCode.cloneState(state);
    },

    toggleRule: (
        state: IState,
        ruleName: string): IState => {

        if (state.lens.nodeTab.lensNode?.ui.discussionJson
            && state.lens.nodeTab.lensNode?.ui.discussionJson.type === DiscussionType.QuizJson) {

            const quizJson: IQuizJson = state.lens.nodeTab.lensNode.ui.discussionJson as IQuizJson;
            let removed = false;

            for (let i = 0; i < quizJson.rules.length; i++) {

                if (quizJson.rules[i] === ruleName) {

                    quizJson.rules.splice(i, 1);
                    removed = true;

                    break;
                }
            }

            if (!removed) {

                quizJson.rules.push(ruleName);
            }

            state.lens.nodeTab.lensNode.ui.raw = false;
        }

        return gStateCode.cloneState(state);
    },

    deleteAnswer: (
        state: IState,
        answer: string): IState => {

        if (state.lens.nodeTab.lensNode) {

            const quiz: IQuizJson = state.lens.nodeTab.lensNode.ui.discussionJson as IQuizJson;

            if (quiz) {

                for (let i = 0; i < quiz.answers.answers.length; i++) {

                    if (quiz.answers.answers[i]?.value === answer) {

                        quiz.answers.answers.splice(i, 1);
                    }
                }
            }
        }

        return gStateCode.cloneState(state);
    },

    setAnswerText: (
        state: IState,
        payload: AnswerElement): IState => {

        if (state.lens.nodeTab.lensNode
            && payload) {

            const quiz: IQuizJson = state.lens.nodeTab.lensNode.ui.discussionJson as IQuizJson;

            if (quiz) {

                const textArea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
                payload.answer.value = textArea.value;
            }
        }

        return gStateCode.cloneState(state);
    },

    addAnswer: (state: IState): IState => {

        if (state.lens.nodeTab.lensNode) {

            const quiz: IQuizJson = state.lens.nodeTab.lensNode.ui.discussionJson as IQuizJson;

            if (quiz) {

                const answer: IAnswer = quizCode.createAnswer(state);
                quiz.answers.answers.push(answer);
                gSession.setFocusFilter(`#answer_${answer.key}`);
            }
        }

        return gStateCode.cloneState(state);
    },

    toggleAnswerCorrect: (
        state: IState,
        answer: IAnswer): IState => {

        answer.correct = answer.correct === false;

        return gStateCode.cloneState(state);
    }
};

export default quizActions;
