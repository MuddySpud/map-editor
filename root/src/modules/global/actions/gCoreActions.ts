import IState from "../../interfaces/state/IState";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import gStateCode from "../code/gStateCode";
import { DisplayType } from "../../interfaces/enums/DisplayType";
import gTreeFilterEffects from "../effects/gTreeFilterEffects";
import gFilterCode from "../code/gFilterCode";
import gTabCode from "../code/gTabCode";
import gHubActions from "../hubs/gHubActions";
import gBotFilterEffects from "../effects/gBotFilterEffects";


const gCoreActions = {

    showTrees: (
        state: IState,
        forceReload: boolean = true): IStateAnyArray => {

        state.displayType = DisplayType.Trees;

        if (!forceReload
            && state.treesState.trees.length > 0) {

            return gStateCode.cloneState(state);
        }

        state.loading = true;

        if (state.lens.filterTab.advanced === true) {
            
            if (!gTabCode.canSave(state.lens.filterTab)) {

                return gStateCode.cloneState(state);
            }

            state.lens.filterTab.saveLock = true;
        }

        return [
            gStateCode.cloneState(state),
            gTreeFilterEffects.filter(state)
        ];
    },

    showBots: (
        state: IState,
        forceReload: boolean = true): IStateAnyArray => {

        state.displayType = DisplayType.Bots;

        if (!forceReload
            && state.botsState.draftsState.drafts.length > 0) {

            return gStateCode.cloneState(state);
        }

        state.loading = true;

        if (state.lens.filterTab.advanced === true) {
            
            if (!gTabCode.canSave(state.lens.filterTab)) {

                return gStateCode.cloneState(state);
            }

            state.lens.filterTab.saveLock = true;
        }

        return [
            gStateCode.cloneState(state),
            gBotFilterEffects.filter(state)
        ];
    },

    resetAndShowTrees: (state: IState): IStateAnyArray => {

        gFilterCode.resetTrees(state);

        return gCoreActions.showTrees(state);
    },

    resetAndShowBots: (state: IState): IStateAnyArray => {

        gFilterCode.resetTrees(state);

        return gCoreActions.showBots(state);
    },

    showBranches: (state: IState): IState => {

        state.displayType = DisplayType.Branches;

        return gStateCode.cloneState(state);
    },

    showProject: (state: IState): IStateAnyArray => {

        state.displayType = DisplayType.Project;
        const selectedKey: string = state.treesState.selectedKey;

        if (state.projectState.treeProject?.key === selectedKey) {

            return gStateCode.cloneState(state);
        }

        return gHubActions.confirmedShowTreeProject(
            state,
            selectedKey
        );
    }
};

export default gCoreActions;
