import IState from "../../interfaces/state/IState";
import IViewSettings from "../../interfaces/state/user/IViewSettings";
import ViewSettings from "../../state/user/ViewSettings";
import IUserView from "../../interfaces/state/user/IUserView";
import UserView from "../../state/user/UserView";


const gViewSettingsCode = {

    clearViewSettingsTab: (state: IState): void => {

        state.lens.viewSettingsTab.lensViewSettings = null;
        state.lens.viewSettingsTab.saveLock = false;
    },

    loadViewSettings: (
        state: IState,
        rawViewSettings: any): void => {

        if (!rawViewSettings) {
            return;
        }

        const viewSettings: IViewSettings = new ViewSettings();
        let userView: IUserView;

        rawViewSettings.forEach((rUserView: any) => {

            userView = new UserView(rUserView.name);
            userView.key = rUserView.key;
            userView.r = rUserView.r;
            userView.token = rUserView.token;
            userView.created = rUserView.created;
            userView.lastModified = rUserView.lastModified;

            if (userView.name === `live`) {
                
                viewSettings.live = userView
            }
            else {
                viewSettings.views.push(userView);
            }
        });

        state.branchesState.viewSettings = viewSettings;
    },

    validateTab: (state: IState): boolean => {

        // Don't run validation yet...
        const valid: boolean = true;
        state.lens.viewSettingsTab.enableSave = valid;

        return valid;
    }
};

export default gViewSettingsCode;

