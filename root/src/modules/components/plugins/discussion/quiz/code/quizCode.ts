import gNodeCode from "../../../../../global/code/gNodeCode";
import U from "../../../../../global/gUtilities";
import gStateCode from "../../../../../global/code/gStateCode";
import IState from "../../../../../interfaces/state/IState";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import IAnswer from "../interfaces/IAnswer";
import IAnswers from "../interfaces/IAnswers";
import IQuizJson from "../interfaces/IQuizJson";
import Answer from "../models/Answer";
import Answers from "../models/Answers";
import QuizJson from "../models/QuizJson";
import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";
import { SelectType } from "../interfaces/enums/SelectType";
import IQuizDiscussionPlugin from "../interfaces/IQuizDiscussionPlugin";
import IMdEditor from "../interfaces/IMdEditor";


const quizCode = {

    checkMatch: (node: INode<ILensUI> | null): boolean => {

        if (!node
            || !node.ui.discussionJson
            || node.ui.discussionJson.type !== DiscussionType.QuizJson) {

            return true;
        }

        const quizJson: IQuizJson = node.ui.discussionJson as IQuizJson;
        const ghostQuizJson: IQuizJson = node.ui.ghostDiscussionJson as IQuizJson;

        if ((!quizJson && ghostQuizJson)
            || (quizJson && !ghostQuizJson)
            || quizJson.answers.select !== ghostQuizJson.answers.select
            || quizJson.answers.answers.length !== ghostQuizJson.answers.answers.length
            || quizJson.rules.length !== ghostQuizJson.rules.length
            || quizJson.question !== ghostQuizJson.question
            || quizJson.questionText !== ghostQuizJson.questionText) {

            return false;
        }

        for (let i = 0; i < quizJson.rules.length; i++) {

            if (quizJson.rules[i] !== ghostQuizJson.rules[i]) {

                return false;
            }
        }

        let quizAnswer: IAnswer;
        let ghostAnswer: IAnswer;

        for (let i = 0; i < quizJson.answers.answers.length; i++) {

            quizAnswer = quizJson.answers.answers[i];
            ghostAnswer = ghostQuizJson.answers.answers[i];

            if (quizAnswer.correct !== ghostAnswer.correct
                || quizAnswer.value !== ghostAnswer.value) {

                return false;
            }
        }

        return true;
    },

    validate: (node: INode<ILensUI> | null): boolean => {

        if (!node) {

            return false;
        }

        const quiz: IQuizJson = node.ui.discussionJson as IQuizJson;

        if (!quiz) {

            return false;
        }

        return quizCode.validateQuiz(
            node,
            quiz
        );
    },

    validateQuiz: (
        node: INode<ILensUI>,
        quiz: IQuizJson): boolean => {

        const success: boolean = quizCode.validateQuestion(
            node,
            quiz
        );

        return quizCode.validateAnswers(
            node,
            quiz.answers
        )
            && success;;
    },

    validateAnswers: (
        node: INode<ILensUI>,
        answers: IAnswers): boolean => {

        answers.error = "";

        answers.answers.forEach((answer: IAnswer) => {

            answer.error = "";
        });

        let success = answers.answers.length === 0;

        if (answers.select === SelectType.None) {

            const errorMessage = `Answer type cannot be none`;

            gNodeCode.setError(
                node,
                errorMessage
            );

            answers.error = errorMessage;
            success = false;
        }

        let answer: IAnswer;
        let distinctAnswers: any = {};
        let length: number = answers.answers.length;

        for (let i = 0; i < length; i++) {

            answer = answers.answers[i];

            if (U.isNullOrWhiteSpace(answer.value)) {

                const errorMessage = `Quiz answer cannot be empty.`;

                gNodeCode.setError(
                    node,
                    errorMessage
                );

                answer.error = errorMessage;
                success = false;
            }

            // Check that the options are unique for this node
            if (answer.value in distinctAnswers) {

                const errorMessage = "Duplicate quiz answer";
                success = false;
                distinctAnswers[answer.value] = false;

                gNodeCode.setError(
                    node,
                    `${errorMessage}s`);

                answer.error = errorMessage;
            }
            else {
                distinctAnswers[answer.value] = true;
            }
        }

        return success;
    },

    validateQuestion: (
        node: INode<ILensUI>,
        quiz: IQuizJson): boolean => {

        quiz.questionError = "";
        quiz.questionTextError = "";
        let success = true;

        if (U.isNullOrWhiteSpace(quiz.question)) {

            const errorMessage = `Question markdown cannot be an empty string`;

            gNodeCode.setError(
                node,
                errorMessage
            );

            quiz.questionError = errorMessage;
            success = false;
        }

        if (U.isNullOrWhiteSpace(quiz.questionText)) {

            const errorMessage = `Question text cannot be an empty string`;

            gNodeCode.setError(
                node,
                errorMessage
            );

            quiz.questionTextError = errorMessage;
            success = false;
        }

        return success;
    },

    createAnswer: (state: IState): IAnswer => {

        const answer: IAnswer = new Answer();
        answer.key = gStateCode.getFreshKey(state);

        return answer;
    },

    tryGetQuizPlugin: (): IQuizDiscussionPlugin | null => {

        if (!window.TreeSolve.discussionPlugins.currentPlugin
            || window.TreeSolve.discussionPlugins.currentPlugin.type !== DiscussionType.QuizJson) {

            return null;
        }

        return window.TreeSolve.discussionPlugins.currentPlugin as IQuizDiscussionPlugin;
    },

    tryGetMdEditor: (): IMdEditor | null => {

        const quizDiscussionPlugin: IQuizDiscussionPlugin | null = quizCode.tryGetQuizPlugin();

        if (!quizDiscussionPlugin) {

            return null;
        }

        return quizDiscussionPlugin.mdEditor;
    },

    ensureAtLeastOneAnswer: (
        state: IState,
        node: INode<ILensUI>): void => {

        const quiz: IQuizJson = node.ui.discussionJson as IQuizJson;

        if (quiz
            && quiz.answers.answers.length === 0) {

            quiz.answers.answers.push(quizCode.createAnswer(state));
        }
    },

    buildQuizJsonFromDiscussion: (
        state: IState,
        node: INode<ILensUI>): void => {

        if (node.ui.discussionJson?.type === DiscussionType.QuizJson) {

            quizCode.ensureAtLeastOneAnswer(
                state,
                node);

            return;
        }

        let quiz: IQuizJson;

        if (!node.ui.discussionJson
            && node.discussion.trim().startsWith("{")) {

            const parsed = JSON.parse(node.discussion);

            quiz = {

                type: DiscussionType.QuizJson,
                questionText: parsed.questionText ?? "",
                questionTextError: "",
                question: parsed.question ?? "",
                questionError: "",
                rules: parsed.rules ?? [],
                answers: new Answers()
            };

            const correctAnswers: Array<number> = node.bin?.discussion?.answers ?? [] as Array<number>;
            let value: string;

            for (let i = 0; i < parsed.answers?.values?.length; i++) {

                value = parsed.answers.values[i] ?? "";

                quiz.answers.answers.push({
                    key: gStateCode.getFreshKey(state),
                    value: value,
                    correct: correctAnswers.includes(i),
                    error: ""
                });
            }
        }
        else {
            quiz = new QuizJson();
            quiz.questionText = node.discussion;
        }

        node.ui.discussionJson = quiz;
        node.ui.ghostDiscussionJson = quizCode.cloneQuiz(quiz);

        quizCode.ensureAtLeastOneAnswer(
            state,
            node);
    },

    cloneQuiz: (rawQuiz: IQuizJson): IQuizJson => {

        const quiz: IQuizJson = new QuizJson();
        quiz.question = rawQuiz.question;
        quiz.questionText = rawQuiz.questionText;
        quiz.type = rawQuiz.type;

        for (let i = 0; i < rawQuiz.rules.length; i++) {

            quiz.rules.push(rawQuiz.rules[i]);
        }

        quiz.answers.select = rawQuiz.answers.select;
        let rawAnswer: IAnswer;

        for (let j = 0; j < rawQuiz.answers.answers.length; j++) {

            rawAnswer = rawQuiz.answers.answers[j];

            quiz.answers.answers.push({

                correct: rawAnswer.correct,
                key: rawAnswer.key,
                value: rawAnswer.value,
                error: rawAnswer.error
            });
        }

        return quiz;
    },

    toJson: (node: INode<ILensUI>): void => {

        const quizJson: IQuizJson = node.ui.discussionJson as IQuizJson;

        if (!quizJson) {
            return;
        }

        const answerValues: Array<string> = [];
        const correctAnswerIndices: Array<number> = [];
        let answer: IAnswer;

        for (let i = 0; i < quizJson.answers.answers.length; i++) {

            answer = quizJson.answers.answers[i];
            answerValues.push(answer.value);

            if (answer.correct === true) {

                correctAnswerIndices.push(i);
            }
        }

        const quiz = {

            question: quizJson.question,
            questionText: quizJson.questionText,
            rules: quizJson.rules,
            answers: {
                values: answerValues,
                select: quizJson.answers.select
            }
        };

        node.discussion = JSON.stringify(quiz);

        if (!node.bin) {

            node.bin = {};
        }

        if (!node.bin.discussion) {

            node.bin.discussion = {};
        }

        if (!node.bin.discussion.system) {

            node.bin.discussion.system = {};
        }

        node.bin.discussion.type = DiscussionType.QuizJson;
        node.bin.discussion.system.answers = correctAnswerIndices;
    }
}

export default quizCode;
