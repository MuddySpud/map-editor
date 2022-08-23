import INotification from "../../interfaces/state/notifications/INotification";
import INotifications from "../../interfaces/state/notifications/INotifications";
import { NotificationType } from "../../interfaces/enums/NotificationType";
import gStateCode from "./gStateCode";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../interfaces/state/tree/INode";
import IState from "../../interfaces/state/IState";
import IBranchTask from "../../interfaces/state/tree/IBranchTask";
import IBranchTreeTask from "../../interfaces/state/tree/IBranchTreeTask";
import ISubtreeLoader from "../../interfaces/state/tree/ISubtreeLoader";
import IFailedAncestors from "../../interfaces/state/tree/IFailedAncestors";
import NotificationsCase from "../../state/cases/NotificationsCase";
import { TabType } from "../../interfaces/enums/TabType";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import gLensCode from "./gLensCode";
import INotificationsTab from "../../interfaces/state/ui/tabs/INotificationsTab";
import U from "../gUtilities";
import gTabCode from "./gTabCode";
import IAlias from "../../interfaces/state/bot/IAlias";


const gNotificationCode = {

    getStatusNotifications: (notifications: INotifications): Array<INotification> => {

        const notifies: Array<INotification> = notifications.values;
        const current: Array<INotification> = [];
        const liveTime: number = 6000; /* ms */
        const now: number = new Date().getTime();

        notifies.forEach((notification: INotification) => {

            if (notification.expired === false) {

                if (notification.type === NotificationType.Info) {
                    if (now - notification.created.getTime() < liveTime) {
                        // If less than LiveTime seconds old

                        if (gNotificationCode.isCurrent(notification) === true) {

                            current.push(notification);
                        }
                    }
                    else {
                        notification.expired = true;
                    }
                }
                else if (notification.type === NotificationType.Warning) {

                    if (gNotificationCode.isCurrent(notification) === true) {

                        current.push(notification);
                    }
                }
            }
        });

        return current;
    },

    isCurrent: (notification: INotification): boolean => {

        if (notification.hidden === false
            && notification.expired === false) {

            return true;
        }

        return false;
    },

    clearNotificationsTab: (state: IState): void => {

        state.lens.notificationsTab.notificationsCase = null;
        state.lens.notificationsTab.stageBehaviour.clear();
    },

    showNotifications: (state: IState): void => {

        state.lens.notificationsTab.notificationsCase = new NotificationsCase(state.settings.defaultDataBatchSize);
        gLensCode.maximiseLens(state) === true;

        gTabCode.setSelectedTab(
            state,
            TabType.Alerts);
    },

    showNotification: (
        state: IState,
        notification: INotification): void => {

        // This will only be for a local notification
        const notificationsTab: INotificationsTab = state.lens.notificationsTab;
        notificationsTab.local = true;

        state.notifications.selectedKey = notification.key;
        gNotificationCode.showNotifications(state);
    },

    getNotification: (
        notifications: Array<INotification>,
        selectedKey: string): INotification | null => {

        const notification: INotification | undefined = notifications.find((alert: INotification) => {
            return alert.key === selectedKey;
        });

        if (notification) {
            return notification;
        }

        return null;
    },

    buildNodeValidationFailedNotification: (state: IState): void => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        const logNodeErrors = (node: INodeBase): string => {

            if (node.errors.length === 0) {
                return ``;
            }

            let nodeErrors = `key: ${node.key}
`;
            let counter = 0;

            node.errors.forEach((error: string) => {
                nodeErrors += `    ${++counter}. ${error}    
`;
            });

            return nodeErrors;
        };

        let nodeErrors: string = logNodeErrors(lensNode);

        let optionError: string = "";
        let optionErrors: string = "";

        lensNode.nodes.forEach((option: INodeBase) => {

            optionError = logNodeErrors(option);

            if (optionError.length > 0) {
                optionErrors += `${optionError}
`;
            }
        });

        let errors: string = "";

        if (nodeErrors.length > 0) {
            errors = `Node errors:
${nodeErrors}
`;
        }

        if (optionErrors.length > 0) {
            errors += `Option errors:
${optionErrors}`;
        }

        let text: string = errors.trim();

        if (U.isNullOrWhiteSpace(text) === true) {

            text = 'No client side errors';
        }

        gStateCode.addNotification(
            state,
            `Validation failed`,
            text,
            state.branchesState.tree.token,
            NotificationType.Warning
        );
    },

    buildTreeValidationFailedNotification: (state: IState): void => {

        const lensTree: ITreeSys = state.lens.treeTab.lensTree as ITreeSys;

        const logTreeErrors = (tree: ITreeBase): string => {

            if (tree.errors.length === 0) {
                return ``;
            }

            let treeErrors = `key: ${tree.key}
`;
            let counter = 0;

            tree.errors.forEach((error: string) => {
                treeErrors += `    ${++counter}. ${error}    
`;
            });

            return treeErrors;
        };

        let nodeErrors: string = logTreeErrors(lensTree);
        let errors: string = "";

        if (nodeErrors.length > 0) {
            errors = `Tree errors:
${nodeErrors}
`;
        }

        let text: string = errors.trim();

        if (U.isNullOrWhiteSpace(text) === true) {

            text = 'No client side errors';
        }

        gStateCode.addNotification(
            state,
            `Validation failed`,
            text,
            lensTree.token,
            NotificationType.Warning
        );
    },

    buildAliasValidationFailedNotification: (state: IState): void => {

        const alias: IAlias = state.lens.botTab.lensBot.bot as IAlias;

        const logAliasErrors = (alias: IAlias): string => {

            if (alias.errors.length === 0) {
                return ``;
            }

            let aliasErrors = `key: ${alias.key}
`;
            let counter = 0;

            alias.errors.forEach((error: string) => {

                aliasErrors += `    ${++counter}. ${error}    
`;
            });

            return aliasErrors;
        };

        let nodeErrors: string = logAliasErrors(alias);
        let errors: string = "";

        if (nodeErrors.length > 0) {

            errors = `Alias errors:
${nodeErrors}
`;
        }

        let text: string = errors.trim();

        if (U.isNullOrWhiteSpace(text) === true) {

            text = 'No client side errors';
        }

        gStateCode.addNotification(
            state,
            `Validation failed for alias`,
            text,
            null,
            NotificationType.Warning
        );
    },

    buildBranchTaskValidationFailedNotification: (
        state: IState,
        type: string): void => {

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;
        const option: INodeBase = branchTask.optionLoader.node as INodeBase;
        const target: INodeBase = branchTask.targetLoader.node as INodeBase;
        let errors: string = "";

        if (option.errors.length > 0
            || branchTask.optionLoader.errors.length > 0) {

            errors += `Option errors:
option key: ${option.key}
`;

            let counter = 0;

            branchTask.optionLoader.errors.forEach((error: string) => {
                errors += `    ${++counter}. ${error}    
`;
            });

            option.errors.forEach((error: string) => {
                errors += `    ${++counter}. ${error}    
`;
            });
        }

        if (target.errors.length > 0) {

            errors += `Target errors:
target key: ${target.key}
`;

            let counter = 0;

            branchTask.targetLoader.errors.forEach((error: string) => {
                errors += `    ${++counter}. ${error}    
`;
            });
        }

        let text: string = errors.trim();

        if (U.isNullOrWhiteSpace(text) === true) {

            text = 'No client side errors';
        }

        gStateCode.addNotification(
            state,
            `${type} validation failed`,
            text,
            state.branchesState.tree.token,
            NotificationType.Warning
        );
    },

    buildBranchTreeTaskValidationFailedNotification: (state: IState): void => {

        const branchTreeTask: IBranchTreeTask = state.lens.nodeTab.lensBranchTreeTask as IBranchTreeTask;
        const option: INodeBase = branchTreeTask.socketLoader.node as INodeBase;
        const subtreeLoader: ISubtreeLoader = branchTreeTask.subtreeLoader as ISubtreeLoader;
        const tree: ITreeSys = subtreeLoader.subtree.tree as ITreeSys;
        const failedAncestors: IFailedAncestors = subtreeLoader.failedAncestors as IFailedAncestors;
        const failedDescendants: IFailedAncestors = subtreeLoader.failedDescendants as IFailedAncestors;
        let errors: string = "";

        if (option.errors.length > 0
            || branchTreeTask.socketLoader.errors.length > 0) {

            errors += `Option errors:
option key: ${option.key}
`;

            let counter = 0;

            branchTreeTask.socketLoader.errors.forEach((error: string) => {
                errors += `    ${++counter}. ${error}    
`;
            });

            option.errors.forEach((error: string) => {
                errors += `    ${++counter}. ${error}    
`;
            });
        }

        if (tree.errors.length > 0) {

            errors += `Tree errors:
tree key: ${tree.key}
`;

            let counter = 0;

            tree.errors.forEach((error: string) => {
                errors += `    ${++counter}. ${error}    
`;
            });
        }

        if (!failedAncestors.completed
            || !failedDescendants.completed) {

            errors += `Validation incomplete - will need to rely on database validation on save.
`;
        }

        if (failedAncestors.ancestorKeys.length > 0
            || failedDescendants.ancestorKeys.length > 0) {

            errors += `There were limits that were children of other limits - this is not allowed
`;
        }

        let text: string = errors.trim();

        if (U.isNullOrWhiteSpace(text) === true) {

            text = 'No client side errors';
        }

        gStateCode.addNotification(
            state,
            `Validation failed`,
            text,
            state.branchesState.tree.token,
            NotificationType.Warning
        );
    }
};

export default gNotificationCode;

