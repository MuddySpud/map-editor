import ILooper from "../../interfaces/state/tree/ILooper";


export default class Looper implements ILooper {

    public isLoopRoot: boolean = false;
    public isLoopHole: boolean = false;
    public loopRepeatText: string = '';
    public loopHoleTextErrors: Array<string> = [];
    public loopRepeatTextErrors: Array<string> = [];
}
