import IStages from "../../interfaces/state/ui/IStages";
import { LensStage } from "../../interfaces/enums/LensStage";
import { StageTitle } from "../../interfaces/enums/StageTitle";


export default class Stages implements IStages {

    constructor(
        name: StageTitle,
        stages: Array<LensStage>) {

        this.name = name;
        this.stages = stages;
        this.scrollTops = Array<number>(stages.length).fill(0)
    }

    public stages: Array<LensStage> = [];
    public stageIndex: number = 0;
    public maxIndex: number = 0;
    public name: StageTitle;
    public replacement: StageTitle = StageTitle.None;
    public scrollTops: Array<number>;
}
