import IRecordState from "../interfaces/state/IRecordState";
import IState from "../interfaces/state/IState";


export default class RecordState implements IRecordState {

    private _key: number = 0;
    private _lastCachedKey: number = -1;
    private _cache: boolean = true;
    private _lastStateJson: string = "";

    public time: number = 0;

    public registerNewState(_state: IState): void {

        this._key++;
        this.time = performance.now();
    }

    public produceCurrentStateJson(state: IState): string {

        this._lastStateJson = JSON.stringify(state);
        this._lastCachedKey = this._key;

        return this._lastStateJson;
    }

    public getLastStateJson(): string {

        return this._lastStateJson;
    }

    public hasStateChanged(): boolean {

        if (!this._cache) {

            return false;
        }

        if (this._lastCachedKey === this._key) {

            return false;
        }

        return true;
    }
}
