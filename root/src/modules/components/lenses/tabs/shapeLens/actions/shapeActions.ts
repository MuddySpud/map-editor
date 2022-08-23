import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import U from "../../../../../global/gUtilities";
import IShape from "../../../../../interfaces/state/tree/IShape";
import gLinkCode from "../../../../../global/code/gLinkCode";


const shapeActions = {

    openInNewTab: (
        state: IState,
        shape: IShape): IState => {

        if (!state
            || !shape
            || U.isNullOrWhiteSpace(shape.tree.key)) {

            return state;
        }

        const url: string = gLinkCode.buildLink(
            state,
            `author/tree/${shape.tree.key}`
        );

        window.open(url, "_blank");

        return state;
    },

    select: (
        state: IState,
        id: string): IState => {

        if (!state
            || !state.lens.shapeTab.shapeCase
            || U.isNullOrWhiteSpace(id) === true) {

            return state;
        }

        state.lens.shapeTab.shapeCase.selectedID = id;

        return gStateCode.cloneState(state);
    },

    toggleExpandShape: (
        state: IState,
        shape: IShape): IState => {

        // Set expanded to the opposite of what it was
        shape.ui.expanded = shape.ui.expanded !== true;

        return gStateCode.cloneState(state);
    }
};

export default shapeActions;
