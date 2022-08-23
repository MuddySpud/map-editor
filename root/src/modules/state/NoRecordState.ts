import IRecordState from "../interfaces/state/IRecordState";
import IState from "../interfaces/state/IState";


export default class NoRecordState implements IRecordState {

    public time: number = 0;

    public registerNewState(): void {

    }

    public produceCurrentStateJson(_state: IState): string {

        return "";
    }

    public getLastStateJson(): string {

        return "";
    }

    public hasStateChanged(): boolean {

        return false;
    }
}
