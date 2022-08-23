import IState from "./IState";


export default interface IRecordState {
    
    time: number;

    registerNewState(state: IState): void;
    hasStateChanged(): boolean;
    produceCurrentStateJson(state: IState): string;
    getLastStateJson(): string;
}

