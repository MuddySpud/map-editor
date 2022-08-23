import IStages from "../state/ui/IStages";
import { LensStage } from "../enums/LensStage";
import IState from "../state/IState";


export default interface IStageBehaviour {
    
    stages: IStages;
    checkDirty: boolean;

    nextStage(state: IState): any;
    previousStage(state: IState): any;
    resetMax(): void;
    reset(): void;
    getStage(): LensStage;
    getStageNumber(): number;
    canForward(): boolean;
    canBackward(): boolean;
    clear(): void;
    resetScroll(stageIndex?: number): void;
    getScroll(stageIndex?: number): number;

    cacheScroll(
        scrollPosition: number,
        stageIndex?: number): void;
}
