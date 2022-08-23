import IStages from "../interfaces/state/ui/IStages";
import StageBehaviour from "./StageBehaviour";
import { LensStage } from "../interfaces/enums/LensStage";
import ILensUI from "../interfaces/state/ui/UIs/ILensUI";
import INode from "../interfaces/state/tree/INode";
import gStateCode from "../global/code/gStateCode";
import IState from "../interfaces/state/IState";


export default class CreateSubtreeLinkStageBehaviour extends StageBehaviour {

    private node: INode<ILensUI>;

    constructor(
        stages: IStages,
        node: INode<ILensUI>) {

        super(stages)
        this.node = node;
    }

    public nextStage(state: IState): IState {

        const newState: IState = gStateCode.cloneState(state);

        if (this.node) {

            if (this.node.ui.forceSetSearch === true) {

                this.node.ui.forceSetSearch = false;

                return newState;
            }

            if (this.node.ui.forceSetSelect === true) {

                this.node.ui.forceSetSelect = false;

                return newState;
            }
        }

        this.stages.stageIndex++;

        if (this.stages.stageIndex > this.stages.maxIndex) {

            this.stages.maxIndex = this.stages.stageIndex
        }

        return newState;
    }

    public previousStage(state: IState): IState {

        if (this.node
            && (this.node.ui.forceSetSearch === true
                || this.node.ui.forceSetSelect=== true)) {

            return state;
        }

        const newState: IState = gStateCode.cloneState(state);
            this.stages.stageIndex--;

        if (this.stages.stageIndex < 0) {

            this.stages.stageIndex = 0;
        }

        return newState;
    }

    public canForward(): boolean {

        if (this.node) {

            if (this.node
                && (this.node.ui.forceSetSearch === true
                    || this.node.ui.forceSetSelect=== true)) {
    
                return true;
            }
        }

        return super.canForward();
    }

    public canBackward(): boolean {

        if (this.node) {

            if (this.node
                && (this.node.ui.forceSetSearch === true
                    || this.node.ui.forceSetSelect=== true)) {
    
                return false;
            }
        }

        return super.canBackward();
    }

    public resetMax(): void {

        if (this.node) {

            let currentStage: LensStage = LensStage.None;

            if (this.node.ui.forceSetSearch === true) {

                currentStage = LensStage.SearchInput;
            }

            if (this.node.ui.forceSetSelect === true) {

                currentStage = LensStage.SearchResults;
            }

            this.node.ui.forceSetSearch = false;
            this.node.ui.forceSetSelect = false;
        
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

        if (this.node) {

            if (this.node.ui.forceSetSearch === true) {

                return LensStage.SearchInput;
            }

            if (this.node.ui.forceSetSelect === true) {

                return LensStage.SearchResults;
            }
        }

        return super.getStage();
    }
}
