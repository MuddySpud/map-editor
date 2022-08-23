import IState from "../../interfaces/state/IState";
import { DialogueType } from "../../interfaces/enums/DialogueType";
import { ActionType } from "../../interfaces/enums/ActionType";
import { DelegateType } from "../../interfaces/enums/DelegateType";
import { NotificationType } from "../../interfaces/enums/NotificationType";
import INotification from "../../interfaces/state/notifications/INotification";
import Notification from "../../state/notifications/Notification";
import Settings from "../../state/user/Settings";
import HttpEffect from "../../state/effects/HttpEffect";
import IHttpEffect from "../../interfaces/state/effects/IHttpEffect";
import U from "../gUtilities";
import ISettings from "../../interfaces/state/user/ISettings";
import gNotificationActions from "../actions/gNotificationActions";
import gDialogueCode from "./gDialogueCode";
import gLensCode from "./gLensCode";
import { TabType } from "../../interfaces/enums/TabType";
import gTreesStateCode from "./gTreesStateCode";
import gTabCode from "./gTabCode";
import IStateAnyArray from "../../interfaces/state/IStateAnyArray";
import BranchesState from "../../state/BranchesState";
import TreesState from "../../state/TreesState";
import Notifications from "../../state/notifications/Notifications";
import { DisplayType } from "../../interfaces/enums/DisplayType";
import RepeateEffects from "../../state/effects/RepeateEffects";
import ProjectState from "../../state/ProjectState";
import RecordState from "../../state/RecordState";
import Lens from "../../state/ui/Lens";
import Status from "../../state/ui/Status";


// This is where all alerts to data changes should be made
const gStateCode = {

    resetState: (state: IState): void => {

        state.branchesState = new BranchesState();
        state.treesState = new TreesState();
        state.projectState = new ProjectState();
        state.record = new RecordState();
        state.notifications = new Notifications(state.settings.defaultDataBatchSize);
        state.status = new Status();
        state.repeatEffects = new RepeateEffects();
        state.lens = new Lens();
        state.loading = true;
        state.displayType = DisplayType.Trees;
    },

    AddReLoadDataEffect: (
        state: IState,
        name: string,
        token: string | null,
        url: string,
        getDataDelegate: (state: IState) => { body: any, callID: string, callChain: Array<string>, success: boolean },
        actionDelegate: (state: IState, response: any) => IStateAnyArray): void => {

        const effect: IHttpEffect | undefined = state
            .repeatEffects
            .reLoadPostHttp
            .find((effect: IHttpEffect) => {

                return effect.name === name;
            });

        if (effect) { // already added.
            return;
        }

        const httpEffect: IHttpEffect = new HttpEffect(
            name,
            token,
            url,
            getDataDelegate,
            actionDelegate);

        state.repeatEffects.reLoadPostHttp.push(httpEffect);
    },

    AddReLoadDataEffectImmediate: (
        state: IState,
        name: string,
        token: string | null,
        url: string,
        getDataDelegate: (state: IState) => { body: any, callID: string, callChain: Array<string>, success: boolean },
        actionDelegate: (state: IState, response: any) => IStateAnyArray): void => {

        const effect: IHttpEffect | undefined = state
            .repeatEffects
            .reLoadPostHttpImmediate
            .find((effect: IHttpEffect) => {

                return effect.name === name;
            });

        if (effect) { // already added.
            return;
        }

        const httpEffect: IHttpEffect = new HttpEffect(
            name,
            token,
            url,
            getDataDelegate,
            actionDelegate);

        state.repeatEffects.reLoadPostHttpImmediate.push(httpEffect);
    },

    AddReLoadDataEffectImmediateWithBody: (
        state: IState,
        name: string,
        token: string | null,
        url: string,
        actionDelegate: (state: IState, response: any) => IStateAnyArray,
        body: any): void => {

        const effect: IHttpEffect | undefined = state
            .repeatEffects
            .reLoadPostHttpImmediate
            .find((effect: IHttpEffect) => {

                return effect.name === name;
            });

        if (effect) { // already added.
            return;
        }

        const httpEffect: IHttpEffect = new HttpEffect(
            name,
            token,
            url,
            null,
            actionDelegate,
            body);

        state.repeatEffects.reLoadPostHttpImmediate.push(httpEffect);
    },

    getFreshKey: (state: IState): string => {

        const nextKey = state.nextKey--;

        return `${nextKey}`;
    },

    getGuidKey: (): string => {

        return U.generateGuid();
    },

    cloneState: (state: IState): IState => {

        let newState: IState = { ...state };
        newState.record.registerNewState(newState);
        newState.record.time = performance.now();

        return newState;
    },

    showLensSettings: (state: IState): void => {

        const lensSettings = new Settings();
        lensSettings.key = state.settings.key;
        lensSettings.r = state.settings.r;
        lensSettings.apiUrl = state.settings.apiUrl;
        lensSettings.highlightLensNodeInBranchUI = state.settings.highlightLensNodeInBranchUI;
        lensSettings.loadSessionView = state.settings.loadSessionView;
        lensSettings.showAllNotifications = state.settings.showAllNotifications;
        lensSettings.fontSize = state.settings.fontSize;
        lensSettings.repeatActionPollingTime = state.settings.repeatActionPollingTime;
        lensSettings.linkUrl = state.settings.linkUrl;
        lensSettings.nodeSearchMappings = state.settings.nodeSearchMappings;
        lensSettings.searchTermMappings = state.settings.searchTermMappings;
        lensSettings.subtreeSearchMappings = state.settings.subtreeSearchMappings;
        lensSettings.treeSearchMappings = state.settings.treeSearchMappings;
        lensSettings.searchFieldMappings = state.settings.searchFieldMappings;

        state.lens.settingsTab.lensSettings = lensSettings;
        gLensCode.maximiseLens(state) === true;

        gTabCode.setSelectedTab(
            state,
            TabType.Settings);
    },

    saveViewSettings: (state: IState): void => {

        if (state.lens.settingsTab.lensSettings) {
            state.settings = state.lens.settingsTab.lensSettings;
            state.lens.settingsTab.lensSettings = null;
        }
    },

    getSettingsCache: (state: IState): any => {

        const callID: string = gTreesStateCode.registerDataRequest(
            'Save settings',
            state,
            state.branchesState.tree.key as string,
            ActionType.UpdateUserSettings,
        );

        const settings: ISettings = state.settings;

        const body: any = {
            key: settings.key,
            r: settings.r,
            token: state.branchesState.tree.token,
            userKey: state.user.key,
            highlightLensNodeInBranchUI: settings.highlightLensNodeInBranchUI,
            showAllNotifications: settings.showAllNotifications,
            loadSessionView: settings.loadSessionView,
            fontSize: settings.fontSize,
            action: ActionType.UpdateUserSettings
        };

        return {
            body,
            callID
        };
    },

    AddShortHttpRepeatEffect: (
        state: IState,
        name: string,
        token: string | null,
        url: string,
        getDataDelegate: (state: IState) => { body: any, callID: string, callChain: Array<string>, success: boolean },
        actionDelegate: (state: IState, response: any) => IStateAnyArray): void => {

        const effect: IHttpEffect | undefined = state
            .repeatEffects
            .shortIntervalHttp
            .find((effect: IHttpEffect) => {

                return effect.name === name;
            });

        if (effect) { // already added.
            return;
        }

        const httpEffect: IHttpEffect = new HttpEffect(
            name,
            token,
            url,
            getDataDelegate,
            actionDelegate);

        state.repeatEffects.shortIntervalHttp.push(httpEffect);
    },

    addNotification: (
        state: IState,
        title: string,
        text: string,
        token: string | null,
        type: NotificationType,
        actionDelegate?: any,
        link: string = '',
        payload: any = null,
        callID: string | null = null,
        callChain: Array<string> = [],
        status: number = -1,
        response: any = ""): INotification | null => {

        if (U.isNullOrWhiteSpace(callID) === true) {

            callID = gStateCode.getGuidKey();
        }

        if (U.hasDuplicates(callChain) === true) {

            return null;
        }

        if (callID) {

            callChain.push(callID);
        }

        const notification: INotification = new Notification(
            gStateCode.getFreshKey(state),
            callID as string,
            title,
            text,
            token,
            new Date(),
            type,
            false,
            actionDelegate,
            link,
            payload,
            callChain,
            status,
            response
        );

        state.notifications.values.push(notification);
        state.notifications.paginationDetails.totalItems = state.notifications.values.length;

        if (notification.type === NotificationType.Error) {

            gDialogueCode.buildDialogue(
                state,
                DialogueType.Error,
                null,
                DelegateType.None,
                notification.title,
                notification.text,
                null,
                link);
        }
        else if (notification.type === NotificationType.ErrorAndAction) {

            gDialogueCode.buildDialogue(
                state,
                DialogueType.errorAction,
                actionDelegate,
                DelegateType.Effect,
                notification.title,
                notification.text,
                null,
                link);
        }

        gStateCode.AddShortHttpRepeatEffect(
            state,
            `cacheNotifications`,
            token,
            `${state.settings.apiUrl}/Notifications/Add`,
            gStateCode.getNotificationCache,
            gNotificationActions.updateNotificationKeys);

        return notification;
    },

    getNotificationCache: (state: IState): { body: any, callID: string, callChain: Array<string>, success: boolean } => {

        const notifications: Array<INotification> = state.notifications.values;
        const newNotifications: Array<any> = [];
        const callChain: Array<string> = [];

        notifications.forEach((notification: INotification) => {

            if (U.isNegativeNumeric(notification.key) === true
                && U.isNullOrWhiteSpace(notification.link) === true) {
                // If a link exists it has already been registered in the database...
                newNotifications.push({
                    callID: notification.callID,
                    hidden: notification.hidden,
                    text: notification.text ?? '',
                    title: notification.title,
                    type: notification.type,
                    token: notification.token,
                    created: notification.created,
                    callChain: notification.callChain
                });

                U.extend(callChain, notification.callChain);
            }
        });

        if (newNotifications.length === 0) {

            return {
                body: null,
                callID: '',
                callChain: callChain,
                success: false
            }
        }

        const callID: string = gTreesStateCode.registerDataRequest(
            'Add notifications',
            state,
            '',
            ActionType.AddNotifications,
        );

        const body: any = {
            key: state.user.key,
            notifications: newNotifications,
            action: ActionType.AddNotifications
        };

        return {
            body,
            callID,
            callChain: callChain,
            success: true
        };
    }
};

export default gStateCode;

