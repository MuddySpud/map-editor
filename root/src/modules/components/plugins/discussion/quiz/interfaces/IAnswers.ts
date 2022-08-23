import { SelectType } from "./enums/SelectType";
import IAnswer from "./IAnswer";
import IAnswersUI from "./IAnswersUI";


export default interface IAnswers {

    answers: Array<IAnswer>;
    select: SelectType;
    ui: IAnswersUI;
    error: string;
}
