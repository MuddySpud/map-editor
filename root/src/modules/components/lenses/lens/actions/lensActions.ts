import IState from "../../../../interfaces/state/IState";
import { DialogueType } from "../../../../interfaces/enums/DialogueType";
import { DelegateType } from "../../../../interfaces/enums/DelegateType";
import IStageBehaviourElement from "../../../../interfaces/state/ui/payloads/IStageBehaviourElement";
import gDialogueCode from "../../../../global/code/gDialogueCode";
import gLensCode from "../../../../global/code/gLensCode";
import U from "../../../../global/gUtilities";
import gBranchesStateCode from "../../../../global/code/gBranchesStateCode";
import gStateCode from "../../../../global/code/gStateCode";
import { TabType } from "../../../../interfaces/enums/TabType";


const lensActions = {

    close: (state: IState): IState => {

        const dirty: string = gLensCode.isLensNodeDirty(state);

        if (U.isNullOrWhiteSpace(dirty) === false) {

            gDialogueCode.buildDialogue(
                state,
                DialogueType.Confirm,
                lensActions.clearAndCloseLens,
                DelegateType.Action,
                "Confirm close lens",
                `${dirty}, 
are you sure you want to close the lens?`);
        }
        else {
            return lensActions.clearAndCloseLens(state);
        }

        return gStateCode.cloneState(state);
    },

    clearAndCloseLens: (state: IState): IState => {

        if (state.lens.selectedTab === TabType.Filter) {

            gLensCode.clearTab(
                state,
                TabType.Filter
            );
        }

        gLensCode.clearAndCloseMainLensTabs(state);

        return gStateCode.cloneState(state);
    },

    toggleMinimise: (state: IState): IState => {

        state.lens.minimised = state.lens.minimised !== true;

        return gStateCode.cloneState(state);
    },

    closeOtherDialogues: (state: IState): IState => {

        gBranchesStateCode.hideAllBranchUIControls(state);

        return gStateCode.cloneState(state);
    },

    cacheScrollPosition: (
        state: IState,
        stageBehaviourElement: IStageBehaviourElement): IState => {

        if (!stageBehaviourElement) {
            return state;
        }

        const behaviourScrollTop: number = stageBehaviourElement.stageBehaviour.getScroll();
        const elementScrollTop: number = stageBehaviourElement.divElement.scrollTop;
        stageBehaviourElement.stageBehaviour.cacheScroll(elementScrollTop);

        if (behaviourScrollTop !== elementScrollTop
            && (behaviourScrollTop === 0
                || elementScrollTop === 0)) {

            return gStateCode.cloneState(state);
        }

        // don't redraw 
        return state;
    }
};

export default lensActions;
