import IStages from "../interfaces/state/ui/IStages";
import StageBehaviour from "./StageBehaviour";
import ISocketTaskStageBehaviour from "../interfaces/behaviours/ISocketTaskStageBehaviour";
import { LensStage } from "../interfaces/enums/LensStage";
import gStateCode from "../global/code/gStateCode";
import IState from "../interfaces/state/IState";
import ISocketTask from "../interfaces/state/tree/ISocketTask";


export default class SocketTaskStageBehaviour extends StageBehaviour implements ISocketTaskStageBehaviour {

    private socketTask: ISocketTask;

    constructor(
        stages: IStages,
        socketTask: ISocketTask) {

        super(stages);
        this.socketTask = socketTask;
        this.stages.stageIndex = 1; //always start at second item
    }

    public nextStage(state: IState): IState {

        const newState: IState = gStateCode.cloneState(state);

        if (this.socketTask) {

            if (this.socketTask.ui.forceSet === true) {

                this.socketTask.ui.forceSet = false;

                return newState;
            }
        }

        this.stages.stageIndex++;

        if (this.stages.stageIndex > this.stages.maxIndex) {

            this.stages.maxIndex = this.stages.stageIndex;
        }

        return newState;
    }

    public previousStage(state: IState): IState {

        if (this.socketTask
            && this.socketTask.ui.forceSet === true) {

            return state;
        }

        this.stages.stageIndex--;

        return gStateCode.cloneState(state);
    }

    public canForward(): boolean {

        if (this.getStage() === LensStage.CreateSubtree) {

            return true;
        }

        return super.canForward();
    }

    public canBackward(): boolean {

        if (this.socketTask
            && this.socketTask.ui.forceSet === true) {

            return false;
        }

        return super.canBackward();
    }

    public resetMax(): void {

        if (this.socketTask) {

            let currentStage: LensStage = LensStage.None;

            if (this.socketTask.ui.forceSet === true) {

                currentStage = LensStage.CreateSubtree;
            }

            this.socketTask.ui.forceSet = false;

            if (currentStage !== LensStage.None) {

                for (let i = 0; i < this.stages.stages.length; i++) {

                    if (this.stages.stages[i] === currentStage) {

                        this.stages.stageIndex = i;
                    }
                }
            }
        }

        return super.resetMax();
    }

    public getStage(): LensStage {

        if (this.socketTask
            && this.socketTask.ui.forceSet === true) {

            return LensStage.CreateSubtree;
        }

        if (!this.stages) {

            return LensStage.None;
        }

        return this.stages.stages[this.stages.stageIndex];
    }
}
