import IState from "../../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import IUserView from "../../../../../interfaces/state/user/IUserView";
import U from "../../../../../global/gUtilities";
import gStateCode from "../../../../../global/code/gStateCode";
import viewSettingsEffects from "../effects/viewSettingsEffects";
import gInitEffects from "../../../../../global/effects/gInitEffects";
import gTabCode from "../../../../../global/code/gTabCode";
import gLensCode from "../../../../../global/code/gLensCode";
import { TabType } from "../../../../../interfaces/enums/TabType";


const viewSettingsActions = {

    close: (state: IState): IState => {

        gLensCode.clearTab(
            state,
            TabType.UserViews
        );

        return gStateCode.cloneState(state);
    },

    cancel: (state: IState): IState => {

        gLensCode.clearTab(
            state,
            TabType.UserViews
        );

        return gStateCode.cloneState(state);
    },

    save: (state: IState): IStateAnyArray => {

        if (!gTabCode.canSave(state.lens.viewSettingsTab)) {

            return gStateCode.cloneState(state);
        }

        state.lens.viewSettingsTab.saveLock = true;
        gStateCode.saveViewSettings(state);

        return [
            gStateCode.cloneState(state),
            viewSettingsEffects.saveViewSettings(state)
        ];
    },

    setLiveViewAsClearedAndReload: (state: IState): IStateAnyArray => {

        const treeKey: string = state.branchesState.tree.key as string;

        gLensCode.clearTab(
            state,
            TabType.UserViews
        );

        const reloadEffect = gInitEffects.getBranchesInitData(
            state,
            treeKey);

        return [
            gStateCode.cloneState(state),
            reloadEffect
        ];
    },

    updateLiveViewKey: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        state.lens.viewSettingsTab.saveLock = false;
        const live: IUserView = state.branchesState.viewSettings.live;

        if (U.isNegativeNumeric(live.key) === true
            && live.name === response.jsonData.name
            && live.token === response.jsonData.token
            && state.user.key === response.jsonData.userKey) {

            state.branchesState.viewSettings.live.key = response.jsonData.key;
        }

        return state;
    }
};

export default viewSettingsActions;

