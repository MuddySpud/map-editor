import IStages from "../interfaces/state/ui/IStages";
import StageBehaviour from "./StageBehaviour";
import IBranchTask from "../interfaces/state/tree/IBranchTask";
import IBranchTaskStageBehaviour from "../interfaces/behaviours/IBranchTaskStageBehaviour";
import { LensStage } from "../interfaces/enums/LensStage";
import gStateCode from "../global/code/gStateCode";
import IState from "../interfaces/state/IState";
import gBranchTaskCode from "../global/code/gBranchTaskCode";
import INodeBase from "../interfaces/state/tree/INodeBase";
import gNodeCode from "../global/code/gNodeCode";
import gMoveBranchEffects from "../global/effects/gMoveBranchEffects";
import gBranchesStateCode from "../global/code/gBranchesStateCode";
import IStateAnyArray from "../interfaces/state/IStateAnyArray";



export default class BranchTaskStageBehaviour extends StageBehaviour implements IBranchTaskStageBehaviour {

    private branchTask: IBranchTask;

    constructor(
        stages: IStages,
        branchTask: IBranchTask) {

        super(stages);
        this.branchTask = branchTask;
    }

    public getToken(): string {

        return this.branchTask.targetLoader.token;
    }

    public nextStage(state: IState): IStateAnyArray {

        if (this.branchTask) {

            if (this.branchTask.optionLoader.ui.forceSet === true) {

                this.branchTask.optionLoader.ui.forceSet = false;

                return this.loadOptionAndTarget(state);
            }

            if (this.branchTask.targetLoader.ui.forceSet === true) {

                this.branchTask.targetLoader.ui.forceSet = false;

                return this.loadOptionAndTarget(state);
            }
        }

        this.stages.stageIndex++;

        if (this.stages.stageIndex > this.stages.maxIndex) {

            this.stages.maxIndex = this.stages.stageIndex;
        }

        // Then check if at final stage to load nodes
        return this.loadOptionAndTarget(state);
    }

    public previousStage(state: IState): IStateAnyArray {

        if (this.branchTask
            && (this.branchTask.optionLoader.ui.forceSet === true
                || this.branchTask.targetLoader.ui.forceSet === true)) {

            return state;
        }

        this.stages.stageIndex--;

        return gStateCode.cloneState(state);
    }

    public canForward(): boolean {

        if (this.branchTask) {

            if (this.branchTask.optionLoader.ui.forceSet === true
                || this.branchTask.targetLoader.ui.forceSet === true) {

                return true;
            }
        }

        return super.canForward();
    }

    public canBackward(): boolean {

        if (this.branchTask) {

            if (this.branchTask.optionLoader.ui.forceSet === true
                || this.branchTask.targetLoader.ui.forceSet === true) {

                return false;
            }
        }

        return super.canBackward();
    }

    public resetMax(): void {

        if (this.branchTask) {

            let currentStage: LensStage = LensStage.None;

            if (this.branchTask.optionLoader.ui.forceSet === true) {

                currentStage = LensStage.SelectBranchTaskOption;
            }

            if (this.branchTask.targetLoader.ui.forceSet === true) {

                currentStage = LensStage.SelectBranchTaskTarget;
            }

            this.branchTask.optionLoader.ui.forceSet = false;
            this.branchTask.targetLoader.ui.forceSet = false;

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

        if (this.branchTask) {

            if (this.branchTask.optionLoader.ui.forceSet === true) {

                return LensStage.SelectBranchTaskOption;
            }

            if (this.branchTask.targetLoader.ui.forceSet === true) {

                return LensStage.SelectBranchTaskTarget;
            }
        }

        if (!this.stages) {
            return LensStage.None;
        }

        return this.stages.stages[this.stages.stageIndex];
    }

    loadOptionAndTarget(state: IState): IStateAnyArray {

        const newState: IState = gStateCode.cloneState(state);
        const stage: LensStage = this.getStage();

        if (!gBranchTaskCode.isComplete(this.branchTask)
            || (stage !== LensStage.EditMoveBranch
                && stage !== LensStage.EditCloneBranch
                && stage !== LensStage.SelectStashAction)) {

            return newState;
        }

        let option: INodeBase | null = null;
        let target: INodeBase | null = null;

        if (this.branchTask.targetLoader.token === state.branchesState.tree.token) {

            if (!this.branchTask.targetLoader.node
                || this.branchTask.targetLoader.node.key !== this.branchTask.targetLoader.key) {

                target = gBranchesStateCode.getRegisteredNode(
                    state,
                    this.branchTask.targetLoader.token,
                    this.branchTask.targetLoader.key
                );

                if (target) {
                    this.branchTask.targetLoader.node = gNodeCode.cloneNodeAndParentAndOptions(target);
                }
                else {
                    this.branchTask.targetLoader.node = null;
                }
            }
        }

        if (this.branchTask.optionLoader.token === state.branchesState.tree.token) {

            if (!this.branchTask.optionLoader.node
                || this.branchTask.optionLoader.node.key !== this.branchTask.optionLoader.key) {

                option = gBranchesStateCode.getRegisteredNode(
                    state,
                    this.branchTask.optionLoader.token,
                    this.branchTask.optionLoader.key
                );

                if (option) {
                    this.branchTask.optionLoader.node = gNodeCode.cloneNodeAndParentAndOptions(option);
                }
                else {
                    this.branchTask.optionLoader.node = null;
                }
            }
        }

        if (this.branchTask.optionLoader.node
            && this.branchTask.targetLoader.node
            && this.branchTask.targetLoader.node.nodes) {

            this.branchTask.optionLoader.node.order = ((this.branchTask.targetLoader.node.nodes.at(-1))?.order ?? 0) + 1;
        }

        // If the option exists on a different tree
        // Load nodes from the database
        if (this.branchTask.optionLoader.token !== state.branchesState.tree.token) {

            return [
                gStateCode.cloneState(state),
                gMoveBranchEffects.loadMoveBranchNodes(state)
            ];
        }

        return gStateCode.cloneState(state);
    }
}
