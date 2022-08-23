import IStages from "../interfaces/state/ui/IStages";
import StageBehaviour from "./StageBehaviour";
import IBranchTaskStageBehaviour from "../interfaces/behaviours/IBranchTaskStageBehaviour";
import { LensStage } from "../interfaces/enums/LensStage";
import gStateCode from "../global/code/gStateCode";
import IState from "../interfaces/state/IState";
import IStateAnyArray from "../interfaces/state/IStateAnyArray";
import IBranchTreeTask from "../interfaces/state/tree/IBranchTreeTask";
import gBranchTreeTaskCode from "../global/code/gBranchTreeTaskCode";
import gBranchEffects from "../global/effects/gBranchEffects";
import U from "../global/gUtilities";
import INodeLoader from "../interfaces/state/tree/INodeLoader";
import IBranchUI from "../interfaces/state/ui/UIs/IBranchUI";
import INode from "../interfaces/state/tree/INode";
import gNodeCode from "../global/code/gNodeCode";
import gBranchTaskActions from "../global/actions/gBranchTaskActions";
import ISubtreeLoader from "../interfaces/state/tree/ISubtreeLoader";
import IHole from "../interfaces/state/tree/IHole";
import ISocketLoaderUI from "../interfaces/state/ui/UIs/ISocketLoaderUI";
import gBranchesStateCode from "../global/code/gBranchesStateCode";


export default class BranchTreeTaskStageBehaviour extends StageBehaviour implements IBranchTaskStageBehaviour {

    private branchTreeTask: IBranchTreeTask;

    constructor(
        stages: IStages,
        branchTreeTask: IBranchTreeTask) {

        super(stages);
        this.branchTreeTask = branchTreeTask;
    }

    public getToken(): string {

        return this.branchTreeTask.socketLoader.token;
    }

    public nextStage(state: IState): IStateAnyArray {

        let newState: IState = gStateCode.cloneState(state);

        if (this.branchTreeTask) {

            if (this.branchTreeTask.socketLoader.ui.forceSet === true) {

                this.branchTreeTask.socketLoader.ui.forceSet = false;

                return newState;
            }

            if (this.branchTreeTask.subtreeLoader.ui.forceSetTree === true) {

                this.branchTreeTask.subtreeLoader.ui.forceSetTree = false;

                return newState;
            }

            if (this.branchTreeTask.subtreeLoader.ui.forceSetSubtree === true) {

                this.branchTreeTask.subtreeLoader.ui.forceSetSubtree = false;

                return newState;
            }

            if (this.branchTreeTask.subtreeLoader.ui.forceSetLimits === true) {

                this.branchTreeTask.subtreeLoader.ui.forceSetLimits = false;

                return newState;
            }

            if (gBranchTreeTaskCode.hasForceSetLimit(this.branchTreeTask.subtreeLoader) === true) {

                return this.loadLimitFromKey(state);
            }
        }

        const newStage: LensStage = this.stages.stages[this.stages.stageIndex + 1];

        if (newStage === LensStage.SelectBranchTaskLimit) {

            this.incrementStage();

            gBranchTreeTaskCode.checkForSubtreeNodeWarnings(
                state,
                this.branchTreeTask);

            return this.nextStage(state);
        }

        // Then check if at final stage to load nodes
        return this.loadOption(state);
    }

    public previousStage(state: IState): IStateAnyArray {

        if (this.branchTreeTask
            && (this.branchTreeTask.socketLoader.ui.forceSet === true
                || this.branchTreeTask.subtreeLoader.ui.forceSetTree === true
                || this.branchTreeTask.subtreeLoader.ui.forceSetSubtree === true
                || this.branchTreeTask.subtreeLoader.ui.forceSetLimits === true
                || gBranchTreeTaskCode.hasForceSetLimit(this.branchTreeTask.subtreeLoader) === true)) {

            return state;
        }

        this.stages.stageIndex--;

        const newStage: LensStage = this.stages.stages[this.stages.stageIndex];

        if (newStage === LensStage.SelectBranchTaskLimit) {
            //skip this stage - can only access it directly

            return this.previousStage(state);
        }

        return gStateCode.cloneState(state);
    }

    public canForward(): boolean {

        if (this.branchTreeTask) {

            if (this.branchTreeTask.socketLoader.ui.forceSet === true
                || this.branchTreeTask.subtreeLoader.ui.forceSetTree === true
                || this.branchTreeTask.subtreeLoader.ui.forceSetSubtree === true
                || this.branchTreeTask.subtreeLoader.ui.forceSetLimits === true
                || gBranchTreeTaskCode.hasForceSetLimit(this.branchTreeTask.subtreeLoader) === true) {

                return true;
            }
        }

        return super.canForward();
    }

    public canBackward(): boolean {

        if (this.branchTreeTask) {

            if (this.branchTreeTask.socketLoader.ui.forceSet === true
                || this.branchTreeTask.subtreeLoader.ui.forceSetTree === true
                || this.branchTreeTask.subtreeLoader.ui.forceSetSubtree === true
                || this.branchTreeTask.subtreeLoader.ui.forceSetLimits === true
                || gBranchTreeTaskCode.hasForceSetLimit(this.branchTreeTask.subtreeLoader) === true) {

                return false;
            }
        }

        return super.canBackward();
    }

    public resetMax(): void {

        if (this.branchTreeTask) {

            let currentStage: LensStage = LensStage.None;

            if (this.branchTreeTask.socketLoader.ui.forceSet === true) {

                currentStage = LensStage.SelectBranchTaskOption;
            }

            if (this.branchTreeTask.subtreeLoader.ui.forceSetTree === true) {

                currentStage = LensStage.CreateTree;
            }

            if (this.branchTreeTask.subtreeLoader.ui.forceSetSubtree === true) {

                currentStage = LensStage.CreateSubtree;
            }

            if (this.branchTreeTask.subtreeLoader.ui.forceSetLimits === true) {

                currentStage = LensStage.CreateSubtreeLowerBoundaries;
            }

            if (gBranchTreeTaskCode.hasForceSetLimit(this.branchTreeTask.subtreeLoader) === true) {

                currentStage = LensStage.SelectBranchTaskLimit;
            }

            this.branchTreeTask.socketLoader.ui.forceSet = false;
            this.branchTreeTask.subtreeLoader.ui.forceSetTree = false;
            this.branchTreeTask.subtreeLoader.ui.forceSetSubtree = false;
            this.branchTreeTask.subtreeLoader.ui.forceSetLimits = false;
            gBranchTreeTaskCode.forceUnSelectAllLimits(this.branchTreeTask.subtreeLoader);
        
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

        if (this.branchTreeTask) {

            if (this.branchTreeTask.socketLoader.ui.forceSet === true) {

                return LensStage.SelectBranchTaskOption;
            }

            if (this.branchTreeTask.subtreeLoader.ui.forceSetTree === true) {

                return LensStage.CreateTree;
            }

            if (this.branchTreeTask.subtreeLoader.ui.forceSetSubtree === true) {

                return LensStage.CreateSubtree;
            }

            if (this.branchTreeTask.subtreeLoader.ui.forceSetLimits === true) {

                return LensStage.CreateSubtreeLowerBoundaries;
            }

            if (gBranchTreeTaskCode.hasForceSetLimit(this.branchTreeTask.subtreeLoader) === true) {

                return LensStage.SelectBranchTaskLimit;
            }
        }

        if (!this.stages) {

            return LensStage.None;
        }

        return this.stages.stages[this.stages.stageIndex];
    }

    incrementStage(): any {

        this.stages.stageIndex++;

        if (this.stages.stageIndex > this.stages.maxIndex) {

            this.stages.maxIndex = this.stages.stageIndex;
        }
    }

    loadLimitFromKey(state: IState): IState {

        const subtreeLoader: ISubtreeLoader | undefined = state.lens.nodeTab.lensBranchTreeTask?.subtreeLoader;

        if (!subtreeLoader) {

            return state;
        }

        let limit: IHole<ISocketLoaderUI> | null = gBranchTreeTaskCode.getForceSetLimit(subtreeLoader);

        if (!limit
            || !U.isPositiveNumeric(limit.key)) {

            return state;
        }

        const option: INode<IBranchUI> | null = gBranchesStateCode.getRegisteredNode(
            state,
            state.branchesState.tree.token,
            limit.key
        );

        if (!option) {
            
            return gStateCode.cloneState(state);
        }

        limit = gBranchTreeTaskCode.setUpLimit(
            state,
            option);

        if (limit) {

            limit.ui.forceSet = false;
        }

        return gBranchTaskActions.completeSelection(state);
    }

    loadOption(state: IState): IStateAnyArray {

        let newState: IState = gStateCode.cloneState(state);
        const stage: LensStage = this.getStage();

        if (!gBranchTreeTaskCode.isComplete(this.branchTreeTask)
            || stage !== LensStage.SelectBranchTaskOption) {

            this.incrementStage();

            return newState;
        }

        if (U.isPositiveNumeric(this.branchTreeTask.socketLoader.key) === false) {
            
            throw new Error("OptionLoader key is not positive.");
        }

        let option: INode<IBranchUI> | null = null;
        const optionLoader: INodeLoader = this.branchTreeTask.socketLoader;
        const key: string = optionLoader.key;

        if (optionLoader.token === state.branchesState.tree.token
            && optionLoader.node?.key !== key) {

            // Need to load option here or get it from the database
            // Need to be sure it exists otherwise throw an error

            option = gNodeCode.showNode(
                state,
                optionLoader.token,
                key
            );

            if (option) {

                gBranchTreeTaskCode.setUpOption(
                    state,
                    optionLoader,
                    option
                );

                const reLoad: boolean = gNodeCode.checkDescendantsLoaded(option);

                if (reLoad === true) {

                    this.incrementStage();

                    return gBranchTaskActions.completeSelectionAndNext(
                        state, // Maybe should return stateCode.cloneState(state) here?
                        gBranchEffects.getBranch(
                            state,
                            option.key as string
                        )
                    );
                }
            }
            else {

                return [
                    newState,
                    gBranchEffects.getWholeBranchAndSetupTreeTaskOption(
                        state,
                        key
                    )
                ];
            }
        }

        this.incrementStage();

        return newState;
    }
}
