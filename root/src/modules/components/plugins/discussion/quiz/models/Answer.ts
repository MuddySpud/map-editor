import IAnswer from "../interfaces/IAnswer";


export default class Answer implements IAnswer {

    public key: string = "";
    public value: string = "";
    public error: string = "";
    public correct: boolean = false;
}
