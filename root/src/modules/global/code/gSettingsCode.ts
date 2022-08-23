import IState from "../../interfaces/state/IState";
import Settings from "../../state/user/Settings";
import ISettings from "../../interfaces/state/user/ISettings";


const gSettingsCode = {

    clearSettingsTab: (state: IState): void => {

        state.lens.settingsTab.lensSettings = null;
        state.lens.settingsTab.saveLock = false;
    },

    loadSettings: (
        state: IState,
        rawSettings: any): void => {

        if (!rawSettings) {
            return;
        }

        const settings: ISettings = new Settings();

        settings.key = rawSettings.key;
        settings.r = rawSettings.r;
        settings.highlightLensNodeInBranchUI = rawSettings.highlightLensNodeInBranchUI;
        settings.showAllNotifications = rawSettings.showAllNotifications;
        settings.loadSessionView = rawSettings.loadSessionView;
        settings.fontSize = rawSettings.fontSize;

        state.settings = settings;
    },

    validateTab: (state: IState): boolean => {

        // Don't run validation yet...
        const valid: boolean = true;
        state.lens.settingsTab.enableSave = valid;

        return valid;
    }
};

export default gSettingsCode;

