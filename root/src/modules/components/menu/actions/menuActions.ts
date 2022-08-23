import IState from "../../../interfaces/state/IState";
import gStateCode from "../../../global/code/gStateCode";
import gBranchesStateCode from "../../../global/code/gBranchesStateCode";
import { TabType } from "../../../interfaces/enums/TabType";
import gSearchCode from "../../../global/code/gSearchCode";
import gNotificationCode from "../../../global/code/gNotificationCode";
import gLensCode from "../../../global/code/gLensCode";
import gTabCode from "../../../global/code/gTabCode";


const menuActions = {

    toggleSettings: (state: IState): IState => {

        if (state.lens.settingsTab.lensSettings) {

            if (gLensCode.maximiseLens(state) === true) {

                gTabCode.setSelectedTab(
                    state,
                    TabType.Settings);

                return gStateCode.cloneState(state);
            }
            else if (state.lens.selectedTab === TabType.Settings) {

                gLensCode.clearTab(
                    state,
                    TabType.Settings
                );

                return gStateCode.cloneState(state);
            }
        }

        gBranchesStateCode.hideAllBranchUIControls(state);
        gStateCode.showLensSettings(state);

        return gStateCode.cloneState(state);
    },

    toggleViews: (state: IState): IState => {

        if (state.lens.viewSettingsTab.lensViewSettings) {

            if (gLensCode.maximiseLens(state) === true) {

                gTabCode.setSelectedTab(
                    state,
                    TabType.UserViews);

                return gStateCode.cloneState(state);
            }
            else if (state.lens.selectedTab === TabType.UserViews) {

                gLensCode.clearTab(
                    state,
                    TabType.UserViews
                );

                return gStateCode.cloneState(state);
            }
        }

        gBranchesStateCode.hideAllBranchUIControls(state);
        gBranchesStateCode.showViewSettings(state);

        return gStateCode.cloneState(state);
    },

    toggleSearch: (state: IState): IState => {

        if (state.lens.searchTab.lensSearch
            && state.lens.searchTab.lensSearch.brief) {

            if (gLensCode.maximiseLens(state) === true) {

                gTabCode.setSelectedTab(
                    state,
                    TabType.Search);

                return gStateCode.cloneState(state);
            }
            else if (state.lens.selectedTab === TabType.Search) {

                gLensCode.clearTab(
                    state,
                    TabType.Search
                );

                return gStateCode.cloneState(state);
            }
        }

        gBranchesStateCode.hideAllBranchUIControls(state);
        gSearchCode.showSearch(state);

        return gStateCode.cloneState(state);
    },

    toggleSubscriptions: (state: IState): IState => {

        state.subscriptionState.showSubscriptions = state.subscriptionState.showSubscriptions === false;

        return gStateCode.cloneState(state);
    },

    toggleNotifications: (state: IState): IState => {

        if (state.lens.notificationsTab.notificationsCase) {

            if (gLensCode.maximiseLens(state) === true) {

                gTabCode.setSelectedTab(
                    state,
                    TabType.Alerts);

                return gStateCode.cloneState(state);
            }
            else if (state.lens.selectedTab === TabType.Alerts) {

                gLensCode.clearTab(
                    state,
                    TabType.Alerts
                );
        
                return gStateCode.cloneState(state);
            }
        }

        gBranchesStateCode.hideAllBranchUIControls(state);
        gNotificationCode.showNotifications(state);

        return gStateCode.cloneState(state);
    },

    toggleMainMenu: (state: IState): IState => {

        return gStateCode.cloneState(state);
    },

    toggleMinimise: (state: IState): IState => {

        if (state.lens.minimised === true) {
            gLensCode.maximiseLens(state);
        }
        else {
            gLensCode.minimiseLens(state);
        }

        return gStateCode.cloneState(state);
    }
};

export default menuActions;