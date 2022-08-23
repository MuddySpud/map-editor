import IAnswer from "../interfaces/IAnswer";
import IAnswerElement from "../interfaces/IAnswerElement";


export default class AnswerElement implements IAnswerElement {

    constructor(
        element: HTMLElement,
        answer: IAnswer) {
            
            this.element = element;
            this.answer = answer;
        }

    public element: HTMLElement;
    public answer: IAnswer;
}
