import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import INode from "../../../../interfaces/state/tree/INode";
import U from "../../../../global/gUtilities";
import IBranchUI from "../../../../interfaces/state/ui/UIs/IBranchUI";
import gStateCode from "../../../../global/code/gStateCode";
import INodeControl from "../../../../interfaces/state/ui/payloads/INodeControl";
import { LensActionType } from "../../../../interfaces/enums/LensActionType";
import { NodeType } from "../../../../interfaces/enums/NodeType";
import { DialogueType } from "../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../interfaces/enums/DelegateType";
import gDialogueCode from "../../../../global/code/gDialogueCode";
import gStageCode from "../../../../global/code/gStageCode";
import { StageTitle } from "../../../../interfaces/enums/StageTitle";
import gSession from "../../../../global/gSession";
import gBranchTaskCode from "../../../../global/code/gBranchTaskCode";
import gBranchTaskActions from "../../../../global/actions/gBranchTaskActions";
import gLensCode from "../../../../global/code/gLensCode";
import globalNodeActions from "../../../../global/actions/gNodeActions";
import Filters from "../../../../state/constants/Filters";
import gBranchesStateCode from "../../../../global/code/gBranchesStateCode";
import gMapSocketActions from "../../../../global/actions/gMapSocketActions";
import gNodeEffects from "../../../../global/effects/gNodeEffects";
import nodeCode from "../code/nodeCode";
import globalNodeCode from "../../../../global/code/gNodeCode";
import gBranchEffects from "../../../../global/effects/gBranchEffects";
import IGlobalBranchFlags from "../../../../interfaces/state/ui/IGlobalBranchFlags";
import INodeEvent from "../../../../interfaces/state/ui/payloads/INodeEvent";
import IBranchesState from "../../../../interfaces/state/IBranchesState";
import { TabType } from "../../../../interfaces/enums/TabType";


const nodeActions = {

    refresh: (
        state: IState,
        node: INode<IBranchUI>): IStateAnyArray => {

        if (!state
            || !node
            || U.isPositiveNumeric(node.key) === false) {

            return state;
        }

        nodeCode.closeInfo(node);

        return [
            gStateCode.cloneState(state),
            gNodeEffects.getNode(
                state,
                node.key as string
            )
        ];
    },

    expandBranch: (
        state: IState,
        node: INode<IBranchUI>): IStateAnyArray => {

        if (!state) {

            return state;
        }

        const reLoad: boolean = globalNodeCode.expandDescendants(node);
        nodeCode.closeInfo(node);

        if (reLoad === true) {

            return [
                gStateCode.cloneState(state),
                gBranchEffects.getAndExpandBranch(
                    state,
                    node.key as string
                )
            ];
        }

        return gStateCode.cloneState(state);
    },

    selectNode: (
        state: IState,
        inputNode: INode<IBranchUI>): IStateAnyArray => {

        let node: INode<IBranchUI> = inputNode;

        if (gBranchTaskCode.failedTargetRules(state, node) === true) {
            // Then trying to choose a limit and clicking an already selected limit so return 
            return state;
        }

        const globalBranchFlags: IGlobalBranchFlags = gBranchTaskCode.getGlobalBranchFlags(state);

        if (globalBranchFlags.option === true
            || globalBranchFlags.limit === true) {

            return state;
        }

        const branchesState: IBranchesState = state.branchesState;
        const current: INode<IBranchUI> = branchesState.current as INode<IBranchUI>;
        gLensCode.maximiseLens(state);

        if (!current
            || current.key !== node.key
            || current.token !== node.token) {

            branchesState.current = node;
        }

        if (branchesState.current
            && branchesState.selected
            && branchesState.current.key === branchesState.selected.key
            && branchesState.current.token === branchesState.selected.token) {
            // no change
            return gStateCode.cloneState(state);
        }

        if (gBranchTaskCode.isTargetSelect(state, node) === true) {

            return gBranchTaskActions.completeSelectionAndNext(state);
        }
        else {

            return nodeActions.selectEditNode(state);
        }
    },

    selectEditNode: (state: IState): IStateAnyArray => {

        const current: INode<IBranchUI> = state.branchesState.current as INode<IBranchUI>;
        const selected: INode<IBranchUI> = state.branchesState.selected as INode<IBranchUI>;

        if (!selected
            // || (selected.key !== current.key
            //     && selected.token !== current.token)) {
            || selected.key !== current.key
            || selected.token !== current.token) {

            const dirty: string = gLensCode.isLensNodeDirty(state);

            if (U.isNullOrWhiteSpace(dirty) === false) {

                const message = `${dirty}.
Do you want to discard those changes and move an option?`;

                // Then need the user to confirm they want to discard the changes
                gDialogueCode.buildDialogue(
                    state,
                    DialogueType.Confirm,
                    globalNodeActions.completeNodeSelection,
                    DelegateType.Action,
                    "Confirm discard changes",
                    message);

                return gStateCode.cloneState(state);
            }
        }

        return globalNodeActions.completeNodeSelection(state);
    },

    startNodeAction: (
        state: IState,
        payload: INodeControl): IStateAnyArray => {

        gSession.clearAllFocusFilters();

        gLensCode.clearTab(
            state,
            TabType.Node
        );

        const option: INode<IBranchUI> = payload.option;
        state.branchesState.current = option;
        let stageTitle: StageTitle = StageTitle.None;
        let nodeType: NodeType = NodeType.None;

        if (payload.control === LensActionType.CreateDiscussion) {

            nodeType = NodeType.Discussion;
            stageTitle = StageTitle.LensCreateNode;
        }
        else if (payload.control === LensActionType.CreateSolution) {

            nodeType = NodeType.Solution;
            stageTitle = StageTitle.LensCreateNode;
        }
        else if (payload.control === LensActionType.MarkSocket) {

            return gMapSocketActions.setUp(state);
        }
        else if (payload.control === LensActionType.CreateSubtreeLink) {

            nodeType = NodeType.Discussion;
            stageTitle = StageTitle.LensCreateSubtreeLink;
        }
        else if (payload.control === LensActionType.CreateSubtreeAndLink) {

            nodeType = NodeType.Discussion;
            stageTitle = StageTitle.LensCreateSubtreeAndLink;
        }
        else {
            alert("Have not coded for this LensActionType yet...");
        }

        gStageCode.setNodeReplacement(
            state,
            stageTitle);

        return globalNodeActions.completeNodeSelection(
            state,
            nodeType);
    },

    closeControls: (
        state: IState,
        nodeEvent: INodeEvent): IState => {

        if (nodeEvent) {

            const option: INode<IBranchUI> = nodeEvent.option;
            option.ui.loadInBranchUIOptionControls = false;

            if (option.ui.blurring) {

                return state;
            }

            let selector: string = Filters.nodeMenuActiveFilter; // This check to see if the node-menu is active - ie just been clicked
            let active: HTMLElement = document.querySelector(selector) as HTMLElement;
            // If the nodeMenu is active (ie has been clicked) then close menu

            if (!active) {

                const selectors: string[] = [
                    Filters.optionExpandActiveFilter,
                    Filters.optionActionsActiveFilter,
                    Filters.nodeActiveFilter
                ];

                // To see if a button has been clicked search for filters for that button that are :active
                for (let i = 0; i < selectors.length; i++) {

                    selector = selectors[i];
                    active = document.querySelector(selector) as HTMLElement;

                    if (active) {
                        // If clicking another expand icon then don't blur as it will redraw and move the expand button, the mouse
                        // might then no longer be above the re-drawn expand icon and so it won't work... 
                        option.ui.blurring = true;

                        return state;
                    }
                }
            }
        }

        gBranchesStateCode.hideAllBranchUIControls(state);
        gSession.removeFocusFilter(Filters.nodeControlFocusFilter);

        return gStateCode.cloneState(state);
    },

    closeInfo: (
        state: IState,
        nodeEvent: INodeEvent): IState => {

        nodeCode.closeInfo(nodeEvent.option);

        return gStateCode.cloneState(state);
    }
};

export default nodeActions;
