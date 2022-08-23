import { LensStage } from "../../enums/LensStage";
import { StageTitle } from "../../enums/StageTitle";


export default interface IStages {
    
    stages: Array<LensStage>;
    stageIndex: number;
    maxIndex: number;
    name: StageTitle;
    replacement: StageTitle;
    scrollTops: Array<number>;
}
