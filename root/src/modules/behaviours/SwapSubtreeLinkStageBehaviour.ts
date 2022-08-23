import IStages from "../interfaces/state/ui/IStages";
import StageBehaviour from "./StageBehaviour";
import { LensStage } from "../interfaces/enums/LensStage";
import ILensUI from "../interfaces/state/ui/UIs/ILensUI";
import INode from "../interfaces/state/tree/INode";
import ISearchBrief from "../interfaces/state/Search/ISearchBrief";
import ISubtreeSys from "../interfaces/state/tree/ISubtreeSys";
import gStateCode from "../global/code/gStateCode";
import IState from "../interfaces/state/IState";
import gNodeCode from "../global/code/gNodeCode";


export default class SwapSubtreeLinkStageBehaviour extends StageBehaviour {

    private node: INode<ILensUI>;
    private stageNumber: number = 1;

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

            if (this.node.ui.forceSetLinks === true) {

                this.node.ui.forceSetLinks = false;

                return newState;
            }
        }

        this.stages.stageIndex++;

        if (this.stages.stageIndex > this.stages.maxIndex) {

            this.stages.maxIndex = this.stages.stageIndex
        }

        const newStage: LensStage = this.stages.stages[this.stages.stageIndex];

        if (newStage === LensStage.Plugs
            && gNodeCode.hasNoExistingOptions(this.node) === true) {
            //skip this stage if there are no options

            return this.nextStage(state);
        }

        if (!this.node.ui.subtreeSearch.brief) {

            return newState;
        }

        const brief: ISearchBrief = this.node.ui.subtreeSearch.brief;
        const selectedIndex: number = brief.subtreeResults.selectedIndex;
        const subtree: ISubtreeSys = brief.subtreeResults.results[selectedIndex];

        if (newStage === LensStage.Plugs
            && subtree.stSockets.length === 0) {
            //skip this stage if there are no sockets and all options will be deleted

            return this.nextStage(state);
        }

        this.stageNumber++;

        return newState;
    }

    public previousStage(state: IState): IState {

        if (this.node
            && (this.node.ui.forceSetSearch === true
                || this.node.ui.forceSetSelect=== true
                || this.node.ui.forceSetLinks === true)) {

            return state;
        }

        const newState: IState = gStateCode.cloneState(state);
            this.stages.stageIndex--;

        if (this.stages.stageIndex < 0) {

            this.stages.stageIndex = 0;

            return newState;
        }

        const newStage: LensStage = this.stages.stages[this.stages.stageIndex];

        if (newStage === LensStage.Plugs
            && gNodeCode.hasNoExistingOptions(this.node) === true) {
            //skip this stage if there are no options

            return this.previousStage(state);
        }

        if (!this.node.ui.subtreeSearch.brief) {

            return newState;
        }

        const brief: ISearchBrief = this.node.ui.subtreeSearch.brief;
        const selectedIndex: number = brief.subtreeResults.selectedIndex;
        const subtree: ISubtreeSys = brief.subtreeResults.results[selectedIndex];

        if (newStage === LensStage.Plugs
            && subtree.stSockets.length === 0) {
            //skip this stage if there are no sockets and all options will be deleted

            return this.previousStage(state);
        }

        this.stageNumber--;

        return newState;
    }

    public canForward(): boolean {

        if (this.node) {

            if (this.node
                && (this.node.ui.forceSetSearch === true
                    || this.node.ui.forceSetSelect=== true
                    || this.node.ui.forceSetLinks === true)) {
    
                return true;
            }
        }

        return super.canForward();
    }

    public canBackward(): boolean {

        if (this.node) {

            if (this.node
                && (this.node.ui.forceSetSearch === true
                    || this.node.ui.forceSetSelect=== true
                    || this.node.ui.forceSetLinks === true)) {
    
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

            if (this.node.ui.forceSetLinks === true) {

                currentStage = LensStage.Plugs;
            }

            this.node.ui.forceSetSearch = false;
            this.node.ui.forceSetSelect = false;
            this.node.ui.forceSetLinks = false;
        
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

    public getStageNumber(): number {

        return this.stageNumber;
    }

    public getStage(): LensStage {

        if (this.node) {

            if (this.node.ui.forceSetSearch === true) {

                return LensStage.SearchInput;
            }

            if (this.node.ui.forceSetSelect === true) {

                return LensStage.SearchResults;
            }

            if (this.node.ui.forceSetLinks === true) {

                return LensStage.Plugs;
            }
        }

        return super.getStage();
    }
}
