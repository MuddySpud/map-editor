import IState from "../../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gStateCode from "../../../../../global/code/gStateCode";
import ISettings from "../../../../../interfaces/state/user/ISettings";
import U from "../../../../../global/gUtilities";
import settingsEffects from "../effects/settingsEffects";
import { NotificationType } from "../../../../../interfaces/enums/NotificationType";
import gTabCode from "../../../../../global/code/gTabCode";
import { TabType } from "../../../../../interfaces/enums/TabType";
import gLensCode from "../../../../../global/code/gLensCode";


const settingActions = {

    close: (state: IState): IState => {

        gLensCode.clearTab(
            state,
            TabType.Settings
        );

        return gStateCode.cloneState(state);
    },

    cancel: (state: IState): IState => {

        gLensCode.clearTab(
            state,
            TabType.Settings
        );

        return gStateCode.cloneState(state);
    },

    save: (state: IState): IStateAnyArray => {

        if (!gTabCode.canSave(state.lens.settingsTab)) {

            return gStateCode.cloneState(state);
        }

        state.lens.settingsTab.saveLock = true;
        gStateCode.saveViewSettings(state);

        return [
            gStateCode.cloneState(state),
            settingsEffects.saveSettings(state)
        ];
    },

    updateSettingsKey: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        state.lens.settingsTab.saveLock = false;
        const settings: ISettings = state.settings;

        if (U.isNegativeNumeric(settings.key) === true
            && state.user.key === response.jsonData.userKey
            && state.branchesState.tree.token === response.jsonData.token) {

            state.settings.key = response.jsonData.key;
            state.settings.r = response.jsonData.r;
        }

        gStateCode.addNotification(
            state,
            `Settings saved`,
            `Key: ${state.settings.key}`,
            null,
            NotificationType.Info
        );

        return gStateCode.cloneState(state);
    },

    toggle: (
        state: IState,
        name: string): IState => {

        if (!state
            || !state.lens.settingsTab.lensSettings) {
            return state;
        }

        const lensSettings: any = state.lens.settingsTab.lensSettings;
        lensSettings[name] = lensSettings[name] !== true;

        return gStateCode.cloneState(state);
    },

    increaseFontSize: (state: IState): IState => {

        if (!state
            || !state.lens.settingsTab.lensSettings) {
            return state;
        }

        let fontSize: number = Number(state.lens.settingsTab.lensSettings.fontSize);
        fontSize++;

        if (fontSize > 3) {
            fontSize = 3;
        }

        state.lens.settingsTab.lensSettings.fontSize = fontSize;

        return gStateCode.cloneState(state);
    },

    decreaseFontSize: (state: IState): IState => {

        if (!state
            || !state.lens.settingsTab.lensSettings) {
            return state;
        }

        let fontSize: number = Number(state.lens.settingsTab.lensSettings.fontSize);
        fontSize--;

        if (fontSize < -3) {
            fontSize = -3;
        }

        state.lens.settingsTab.lensSettings.fontSize = fontSize;

        return gStateCode.cloneState(state);
    },

    setPollTime: (
        state: IState,
        select: HTMLSelectElement): IState => {

        if (!state
            || !state.lens.settingsTab.lensSettings) {
            return state;
        }

        const lensSettings: ISettings = state.lens.settingsTab.lensSettings;
        const selectedIndex: number = select.selectedIndex;
        const newPollTime = select.options[selectedIndex].value;
        const time: number = Number(newPollTime);
        lensSettings.repeatActionPollingTime = time;

        return gStateCode.cloneState(state);
    }
};

export default settingActions;