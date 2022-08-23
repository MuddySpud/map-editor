import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import U from "../../../../../global/gUtilities";
import ISpread from "../../../../../interfaces/state/tree/ISpread";
import gLinkCode from "../../../../../global/code/gLinkCode";


const spreadActions = {

    openInNewTab: (
        state: IState,
        spread: ISpread): IState => {

        if (!state
            || !spread
            || U.isNullOrWhiteSpace(spread.tree.key)) {

            return state;
        }

        const url: string = gLinkCode.buildLink(
            state,
            `author/tree/${spread.tree.key}`
        );

        window.open(url, "_blank");

        return state;
    },

    select: (
        state: IState,
        id: string): IState => {

        if (!state
            || !state.lens.spreadTab.spreadCase
            || U.isNullOrWhiteSpace(id) === true) {

            return state;
        }

        state.lens.spreadTab.spreadCase.selectedID = id;

        return gStateCode.cloneState(state);
    },

    toggleExpandSpread: (
        state: IState,
        spread: ISpread): IState => {

        // Set expanded to the opposite of what it was
        spread.ui.expanded = spread.ui.expanded !== true;

        return gStateCode.cloneState(state);
    }
};

export default spreadActions;
