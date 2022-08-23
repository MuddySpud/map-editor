import IState from "../../interfaces/state/IState";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import gNodeCode from "./gNodeCode";
import gStateCode from "./gStateCode";
import { NotificationType } from "../../interfaces/enums/NotificationType";
import gViewEffects from "../effects/gViewEffects";


const gRootCode = {

    optionFailedToLoadMessage: "One of the roots options as listed in the view failed to load",

    checkRootLoaded: (state: IState): void => {

        if (!state) {

            throw new Error("Could not load the state.")
        }

        const root: INodeBase = state.branchesState.tree.root;
        const message: string = `Could not load tree root and all its options.

The view could be corrupted.

Would you like to reset the view?
`;

        if (gRootCode.rootHasLoadError(root) === true) {

            gStateCode.addNotification(
                state,
                "Error loading the tree root",
                message,
                state.branchesState.tree.token,
                NotificationType.ErrorAndAction,
                gViewEffects.clearLiveAndReload
            );
        }
    },

    setOptionFailedToLoadError: (
        root: INodeBase,
        failedOptionKey: string | null): void => {

        gNodeCode.setError(
            root,
            `${gRootCode.optionFailedToLoadMessage}, key: ${failedOptionKey}.`
        );
    },

    rootHasLoadError: (root: INodeBase): boolean => {

        if (!root) {
            
            return true;
        }

        for (let i = 0; i < root.errors.length; i++) {

            if (root.errors[i].startsWith(gRootCode.optionFailedToLoadMessage) === true) {
                
                return true;
            }
        }

        return false;
    }
};

export default gRootCode;

