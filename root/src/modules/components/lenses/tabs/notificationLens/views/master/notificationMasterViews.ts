import { VNode } from "hyperapp-local";

import IState from "../../../../../../interfaces/state/IState";
import ILensMasterView from "../../../../../../interfaces/views/ILensMasterView";
import IStageBehaviour from "../../../../../../interfaces/behaviours/IStageBehaviour";
import notificationsTabViews from "../tab/notificationsTabViews";
import INotifications from "../../../../../../interfaces/state/notifications/INotifications";

import '../../scss/index.scss';


class notificationMasterViewsClass implements ILensMasterView {

    public getStageBehaviour(state: IState): IStageBehaviour {

        return state.lens.notificationsTab.stageBehaviour;
    }

    public buildLensView(state: IState): VNode | null {

        if (!state
            || !state.lens.notificationsTab.notificationsCase
            || !state.lens.notificationsTab.display) {

            return null;
        }

        let notifications: INotifications;

        if (state.lens.notificationsTab.local === true) {

            notifications = state.notifications;
        }
        else {
            notifications = state.lens.notificationsTab.notificationsCase.notifications;
        }

        return notificationsTabViews.buildTabView(
            state.lens.notificationsTab,
            notifications,
            state.lens.treeTab.lensTree?.key);
    }
}

const notificationMasterViews = new notificationMasterViewsClass();

export default notificationMasterViews;

