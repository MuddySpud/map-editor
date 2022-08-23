import IAnswers from "../interfaces/IAnswers";
import IQuizJson from "../interfaces/IQuizJson";
import Answers from "./Answers";
import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";


export default class QuizJson implements IQuizJson {

    public type: DiscussionType = DiscussionType.QuizJson;
    public questionText: string = "";
    public questionTextError: string = "";
    public rules: Array<string> = [];
    public question: string = "";
    public questionError: string = "";
    public answers: IAnswers = new Answers();
}
