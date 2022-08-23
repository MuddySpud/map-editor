import IState from "../../interfaces/state/IState";
import gStateCode from "../code/gStateCode";
import IPaginationDetails from "../../interfaces/state/ui/payloads/IPaginationDetails";
import INotificationsCase from "../../interfaces/state/cases/INotificationsCase";
import NotificationsCase from "../../state/cases/NotificationsCase";
import gNotificationsCode from "../code/gNotificationsCode";


const gNotificationsActions = {

    loadNotificationsCase: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        if (!state.lens.notificationsTab.notificationsCase) {
            
            state.lens.notificationsTab.notificationsCase = new NotificationsCase(state.settings.defaultDataBatchSize);
        }

        const notificationsCase: INotificationsCase = state.lens.notificationsTab.notificationsCase;

        gNotificationsCode.loadNotificationsCase(
            response.jsonData.values,
            notificationsCase);

        const paginationDetails: IPaginationDetails = notificationsCase.notifications.paginationDetails;
        paginationDetails.totalItems = response.jsonData.total;

        return gStateCode.cloneState(state);
    }
};

export default gNotificationsActions;
