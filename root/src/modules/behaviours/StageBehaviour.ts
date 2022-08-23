import IStageBehaviour from "../interfaces/behaviours/IStageBehaviour";
import IStages from "../interfaces/state/ui/IStages";
import { LensStage } from "../interfaces/enums/LensStage";
import IState from "../interfaces/state/IState";
import IStateAnyArray from "../interfaces/state/IStateAnyArray";
import gStateCode from "../global/code/gStateCode";


export default class StageBehaviour implements IStageBehaviour {

    public stages: IStages;
    public checkDirty: boolean;

    constructor(
        stages: IStages,
        checkDirty: boolean = false) {

            this.stages = stages;
            this.checkDirty = checkDirty;
        }

    public nextStage(state: IState): IStateAnyArray {

        if (this.stages.stageIndex + 1 >= this.stages.stages.length) {

            return state;
        }

        this.stages.stageIndex++;

        if (this.stages.stageIndex > this.stages.maxIndex) {

            this.stages.maxIndex = this.stages.stageIndex
        }

        return gStateCode.cloneState(state);
    }

    public previousStage(state: IState): IStateAnyArray {

        if (this.stages.stageIndex - 1 < 0) {
            
            return state;
        }

        this.stages.stageIndex--;

        return gStateCode.cloneState(state);
    }

    public resetMax(): void {

        this.stages.maxIndex = this.stages.stageIndex;
    }

    public reset(): void {

        this.stages.stageIndex = 0
        this.stages.maxIndex = 0
    }

    public canForward(): boolean {

        return this.stages.stageIndex < this.stages.maxIndex;
    }

    public canBackward(): boolean {

        return this.stages.stageIndex > 0;
    }

    public getStage(): LensStage {

        if (!this.stages) {

            return LensStage.None;
        }

        return this.stages.stages[this.stages.stageIndex];
    }

    public getStageNumber(): number {

        if (!this.stages) {

            return -1;
        }

        return this.stages.stageIndex + 1;
    }

    public clear(): void {

        this.stages.stageIndex = 0;
        this.stages.maxIndex = 0;
        this.stages.scrollTops.fill(0);
    }

    public resetScroll(stageIndex?: number): void {

        if (!stageIndex) {
            stageIndex = this.stages.stageIndex;
        }

        this.stages.scrollTops[stageIndex] = 0;
    }

    public cacheScroll(
        scrollPosition: number,
        stageIndex?: number): void {

        if (!stageIndex) {
            stageIndex = this.stages.stageIndex;
        }

        this.stages.scrollTops[stageIndex] = scrollPosition;
    }

    public getScroll(stageIndex?: number): number {

        if (!stageIndex) {
            stageIndex = this.stages.stageIndex;
        }

        return this.stages.scrollTops[stageIndex];
    }
}
