import IState from "../../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import U from "../../../../../global/gUtilities";
import gStateCode from "../../../../../global/code/gStateCode";
import IPaginationPayload from "../../../../../interfaces/state/ui/payloads/IPaginationPayload";
import INotificationsCase from "../../../../../interfaces/state/cases/INotificationsCase";
import gNotificationsEffects from "../../../../../global/effects/gNotificationsEffects";
import INotificationsTab from "../../../../../interfaces/state/ui/tabs/INotificationsTab";


const notificationActions = {

    select: (
        state: IState,
        key: string): IState => {

        if (!state
            || U.isNullOrWhiteSpace(key) === true) {

            return state;
        }

        // This could be either local or all sources
        const notificationsTab: INotificationsTab = state.lens.notificationsTab;

        if (notificationsTab.local === true) {

            state.notifications.selectedKey = key;
        }
        else if (notificationsTab.notificationsCase) {
            notificationsTab.notificationsCase.notifications.selectedKey = key;
        }

        return gStateCode.cloneState(state);
    },

    showNotificationsPage: (
        state: IState,
        paginationPayload: IPaginationPayload): IStateAnyArray => {

        if (!state
            || !paginationPayload
            || !paginationPayload.payload) {

            return state;
        }

        const notificationsCase: INotificationsCase = paginationPayload.payload as INotificationsCase;
        notificationsCase.notifications.paginationDetails = paginationPayload.paginationDetails;

        return [
            gStateCode.cloneState(state),
            gNotificationsEffects.getNotifications(state)
        ];
    },

    toggleLocal: (state: IState): IStateAnyArray => {

        if (!state) {
            return state;
        }

        const notificationsTab: INotificationsTab = state.lens.notificationsTab;
        notificationsTab.local = notificationsTab.local !== true;

        if (notificationsTab.local === true
            || (notificationsTab.notificationsCase
                && notificationsTab.notificationsCase.notifications.values.length > 0)) {

            return gStateCode.cloneState(state);
        }

        if (U.isPositiveNumeric(state.lens.treeTab.lensTree?.key) === false) {
            // Then a tree has not been selected and can only get local notifications or notifications for all trees
            notificationsTab.allTrees = true;
        }

        return [
            gStateCode.cloneState(state),
            gNotificationsEffects.getNotifications(state)
        ];
    },

    toggleTrees: (state: IState): IStateAnyArray => {

        if (!state) {
            return state;
        }

        const notificationsTab: INotificationsTab = state.lens.notificationsTab;

        if (U.isPositiveNumeric(state.lens.treeTab.lensTree?.key) === false) {
            // Then a tree has not been selected and can only get local notifications or notifications for all trees
            notificationsTab.allTrees = true;
        }
        else {
            notificationsTab.allTrees = notificationsTab.allTrees !== true;
        }

        return [
            gStateCode.cloneState(state),
            gNotificationsEffects.getNotifications(state)
        ];
    },

    toggleUsers: (state: IState): IStateAnyArray => {

        if (!state) {
            return state;
        }

        const notificationsTab: INotificationsTab = state.lens.notificationsTab;
        notificationsTab.allUsers = notificationsTab.allUsers !== true;

        return [
            gStateCode.cloneState(state),
            gNotificationsEffects.getNotifications(state)
        ];
    }
};

export default notificationActions;
