import { SelectType } from "../interfaces/enums/SelectType";
import IAnswer from "../interfaces/IAnswer";
import IAnswers from "../interfaces/IAnswers";
import IAnswersUI from "../interfaces/IAnswersUI";
import AnswersUI from "./AnswersUI";


export default class Answers implements IAnswers {
    
    public answers: Array<IAnswer> = [];
    public select: SelectType = SelectType.None;
    public ui: IAnswersUI = new AnswersUI();
    public error: string = "";
}
