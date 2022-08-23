import IAnswers from "./IAnswers"
import IDiscussionJson from "../../../../../interfaces/state/ui/IDiscussionJson";


export default interface IQuizJson extends IDiscussionJson {

    rules: Array<string>;
    questionText: string;
    question: string;
    questionTextError: string;
    questionError: string;
    answers: IAnswers;
}
