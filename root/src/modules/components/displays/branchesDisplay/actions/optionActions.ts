import IState from "../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";
import INode from "../../../../interfaces/state/tree/INode";
import IBranchUI from "../../../../interfaces/state/ui/UIs/IBranchUI";
import INodeControl from "../../../../interfaces/state/ui/payloads/INodeControl";
import { LensActionType } from "../../../../interfaces/enums/LensActionType";
import { StageTitle } from "../../../../interfaces/enums/StageTitle";
import IStageBehaviour from "../../../../interfaces/behaviours/IStageBehaviour";
import { LensStage } from "../../../../interfaces/enums/LensStage";
import INodeLoader from "../../../../interfaces/state/tree/INodeLoader";
import { DialogueType } from "../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../interfaces/enums/DelegateType";
import INodeEvent from "../../../../interfaces/state/ui/payloads/INodeEvent";
import gViewCode from "../../../../global/code/gViewCode";
import optionEffects from "../effects/optionEffects";
import U from "../../../../global/gUtilities";
import gStateCode from "../../../../global/code/gStateCode";
import gSession from "../../../../global/gSession";
import gStageCode from "../../../../global/code/gStageCode";
import gNodeActions from "../../../../global/actions/gNodeActions";
import gBranchTaskCode from "../../../../global/code/gBranchTaskCode";
import gMoveBranchActions from "../../../../global/actions/gMoveBranchActions";
import gCloneBranchActions from "../../../../global/actions/gCloneBranchActions";
import gBranchTaskActions from "../../../../global/actions/gBranchTaskActions";
import gBranchToSubtreeActions from "../../../../global/actions/gBranchToSubtreeActions";
import gBranchTreeTaskCode from "../../../../global/code/gBranchTreeTaskCode";
import gLensCode from "../../../../global/code/gLensCode";
import gDialogueCode from "../../../../global/code/gDialogueCode";
import gBranchesStateCode from "../../../../global/code/gBranchesStateCode";
import gStashBranchActions from "../../../../global/actions/gStashBranchActions";
import gNodeCode from "../../../../global/code/gNodeCode";
import gMoveToHereActions from "../../../../global/actions/gMoveToHereActions";
import gCloneToHereActions from "../../../../global/actions/gCloneToHereActions";


const optionActions = {

    toggleExpandOption: (
        state: IState,
        option: INode<IBranchUI>): IStateAnyArray => {

        // Set the current node as the expanded option
        gBranchesStateCode.cacheAndSetCurrentNodeFromOption(
            state,
            option);

        // If not yet loaded - load it
        if (state.branchesState.current) {

            if (state.branchesState.current.isSocket === false) {

                if (U.isNullOrWhiteSpace(state.branchesState.current.discussion) === true) {
                    // Then need to add a discussion so show the option control box
                    return optionActions.startShowNodeMenu(
                        state,
                        option
                    );
                }
                else if (state.branchesState.current.ui.loaded === false) {

                    option.ui.expanded = true;
                    option.ui.loading = true;

                    return [
                        gStateCode.cloneState(state),
                        optionEffects.getOptions(
                            state,
                            option.key as string)
                    ];
                }
            }
        }

        // Set expanded to the opposite of what it was
        option.ui.expanded = option.ui.expanded !== true;

        return optionActions.completeToggleExpandOption(
            state,
            option);
    },

    completeToggleExpandOption: (
        state: IState,
        option: INode<IBranchUI>): IState => {

        if (U.isNullOrWhiteSpace(option.key)) {
            alert(`Option key cannot be empty.
option:
${JSON.stringify(option)}
`);
        }

        if (!option.ui.loadInBranchUIOptionControls) {
            gBranchesStateCode.hideAllBranchUIControls(state);
        }

        const newState: IState = gStateCode.cloneState(state);
        gViewCode.queueCacheLiveView(state);

        return newState;
    },

    selectOption: (
        state: IState,
        option: INode<IBranchUI>): IStateAnyArray => {

        if (!state) {

            return state;
        }

        if (gBranchTreeTaskCode.failedBranchToSubtreeRules(state, option) === true) {
            // Then trying to choose a limit and clicking an already selected limit so return 
            return state;
        }

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;
        const stage: LensStage = stageBehaviour.getStage();

        if (gBranchTaskCode.failedOptionRules(state, stage) === true) {
            // Then trying to choose a limit and clicking an already selected limit so return 
            return state;
        }

        if (stage === LensStage.SelectBranchTaskOption) {

            let optionLoader: INodeLoader | null = null;

            if (state.lens.nodeTab.lensBranchTask) {

                optionLoader = state.lens.nodeTab.lensBranchTask.optionLoader;
            }
            else if (state.lens.nodeTab.lensBranchTreeTask) {

                optionLoader = state.lens.nodeTab.lensBranchTreeTask.socketLoader;
            }

            if (optionLoader) {

                gBranchTaskCode.setUpOption(
                    state,
                    optionLoader,
                    option
                );

                return gBranchTaskActions.completeSelectionAndNext(state);
            }
        }
        else if (stage === LensStage.SelectBranchTaskLimit
            && state.lens.nodeTab.lensBranchTreeTask) {

            gBranchTreeTaskCode.setUpLimit(
                state,
                option);

            return gBranchTaskActions.completeSelection(state);
        }

        state.branchesState.current = option;

        return state;
    },

    loadOptionsThenExpand: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {
            
            return state;
        }

        const rawNode: IState = response.jsonData;

        const registeredNode: INode<IBranchUI> | null = gBranchesStateCode.findAndReLoadRegisteredNode(
            state,
            rawNode
        );

        if (registeredNode) {

            registeredNode.ui.loading = false;

            optionActions.completeToggleExpandOption(
                state,
                registeredNode);

            return gStateCode.cloneState(state);
        }

        return state;
    },

    startShowMenu: (
        state: IState,
        option: INode<IBranchUI>): IStateAnyArray => {

        // This is called once an option action is selected by the user

        if (U.isNullOrWhiteSpace(option.discussion) === true
            && option.isSocket === false) {
            // Then need to add a discussion so show the option control box
            return optionActions.startShowNodeMenu(
                state,
                option
            );
        }
        else {
            return optionActions.startShowOptionMenu(
                state,
                option
            );
        }
    },

    showInfo: (
        state: IState,
        payload: INodeEvent): IState => {

        const event: Event = payload.event;
        event.preventDefault();
        event.stopPropagation();

        const option: INode<IBranchUI> = payload.option;

        if (option.ui.info === true) {

            option.ui.info = false;

            return gStateCode.cloneState(state);
        }

        gBranchesStateCode.hideAllBranchUIControls(state);
        gNodeCode.validateNodeBranchUI(option);
        option.ui.info = true;

        return gStateCode.cloneState(state);
    },

    startShowNodeMenu: (
        state: IState,
        option: INode<IBranchUI>): IState => {

        // This is called once an option action is selected by the user

        const dirty: string = gLensCode.isLensNodeDirty(state);

        if (U.isNullOrWhiteSpace(dirty) === false) {

            let message: string = `${dirty}.
`;
            message += `Do you want to discard those changes and create a new node?`;

            // Then need the user to confirm they want to discard the changes
            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                optionActions.completeShowNodeMenu,
                DelegateType.Action,
                "Confirm discard changes",
                message,
                option);

            return gStateCode.cloneState(state);
        }

        return optionActions.completeShowNodeMenu(
            state,
            option);
    },

    completeShowNodeMenu: (
        state: IState,
        option: INode<IBranchUI>): IState => {

        const expand: boolean = option.ui.expanded !== true;

        const selectedHole: boolean = option.ui.selected === true
            && U.isNullOrWhiteSpace(option.discussion) === true
            && option.isSocket === false;

        gBranchesStateCode.hideAllBranchUIControls(state);

        // Set expanded to the opposite of what it was
        option.ui.expanded = expand;

        if (expand === true
            || selectedHole === true) {

            option.ui.branchViewNodeControls = true;
            option.ui.expanded = false;
        }

        return gStateCode.cloneState(state);
    },

    startShowOptionMenu: (
        state: IState,
        option: INode<IBranchUI>): IStateAnyArray => {

        // This is called once an option action is selected by the user

        const dirty: string = gLensCode.isLensNodeDirty(state);

        if (U.isNullOrWhiteSpace(dirty) === false) {

            let message: string = `${dirty}.
`;
            message += `Do you want to discard those changes and carry out an option action?`;

            // Then need the user to confirm they want to discard the changes
            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                optionActions.completeShowOptionMenu,
                DelegateType.Action,
                "Confirm discard changes",
                message,
                option);

            return gStateCode.cloneState(state);
        }

        return optionActions.completeShowOptionMenu(
            state,
            option);
    },

    completeShowOptionMenu: (
        state: IState,
        option: INode<IBranchUI>): IStateAnyArray => {

        gLensCode.clearAndCloseMainLensTabs(state);
        gBranchesStateCode.hideAllBranchUIControls(state);
        option.ui.branchViewOptionControls = true;

        if (option.ui.expanded === false) {

            option.ui.expanded = true;

            if (option.ui.loaded === false) {

                option.ui.loadInBranchUIOptionControls = true;
                option.ui.loading = true;

                return [
                    gStateCode.cloneState(state),
                    optionEffects.getOptions(
                        state,
                        option.key as string)
                ];
            }
        }

        return gStateCode.cloneState(state);;
    },

    startOptionAction: (
        state: IState,
        payload: INodeControl): IStateAnyArray => {

        // This is called once an option action is selected by the user
        gSession.clearAllFocusFilters();
        const option: INode<IBranchUI> = payload.option;
        let stageTitle: StageTitle = StageTitle.None;

        if (payload.control === LensActionType.MoveBranch) {

            return gMoveBranchActions.setUp(
                state,
                option
            );
        }
        else if (payload.control === LensActionType.CloneBranch) {

            return gCloneBranchActions.setUp(
                state,
                option
            );
        }
        else if (payload.control === LensActionType.ConvertBranchToSubtree) {

            return gBranchToSubtreeActions.setUp(
                state,
                option
            );
        }
        else if (payload.control === LensActionType.StashBranch) {

            return gStashBranchActions.setUp(
                state,
                option
            );
        }
        else if (payload.control === LensActionType.MoveToHere) {

            return gMoveToHereActions.setUp(
                state,
                option
            );
        }
        else if (payload.control === LensActionType.CloneToHere) {

            return gCloneToHereActions.setUp(
                state,
                option
            );
        }
        else {
            alert("Not implemented yet...");
        }

        if (stageTitle === StageTitle.None) {
            return state;
        }

        gStageCode.setNodeReplacement(
            state,
            stageTitle);

        state.branchesState.current = option;

        return gNodeActions.completeNodeSelection(state);
    }
};

export default optionActions;