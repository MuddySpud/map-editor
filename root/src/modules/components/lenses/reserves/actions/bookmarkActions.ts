import IState from "../../../../interfaces/state/IState";
import gStateCode from "../../../../global/code/gStateCode";
import IBookmarkNavigation from "../../../../interfaces/state/tree/IBookmarkNavigation";
import gBookmarkCode from "../../../../global/code/gBookmarkCode";
import IBookmarkNavigationElement from "../../../../interfaces/state/ui/payloads/IBookmarkNavigationElement";
import U from "../../../../global/gUtilities";
import INodeBaseElement from "../../../../interfaces/state/ui/payloads/INodeBaseElement";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import BookmarkNavigation from "../../../../state/tree/BookmarkNavigation";
import IStateAnyArray from "../../../../interfaces/state/IStateAnyArray";


const bookmarkActions = {

    deleteBookmark: (
        state: IState,
        option: INode<ILensUI>): IState => {

        if (!state
            || !option
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        state.lens.nodeTab.lensNode.ui.raw = false;
        option.reserve.bookmarkNavigation = null;
        state.lens.nodeTab.lensBookmarkNavigation = null;
        option.ui.showOptionButtons = false;

        return gStateCode.cloneState(state);
    },

    toggleEnableBookmarkNavigation: (
        state: IState,
        payload: INodeBaseElement): IState => {

        if (!state
            || !payload) {

            return state;
        }

        const option: INode<ILensUI> = payload.node as INode<ILensUI>;

        if (!option.reserve.bookmarkNavigation) {

            const bookmarkNavigation: IBookmarkNavigation = new BookmarkNavigation();
            option.reserve.bookmarkNavigation = bookmarkNavigation;
            state.lens.nodeTab.lensBookmarkNavigation = bookmarkNavigation;
            // gBookmarkCode.disableClickSelect(bookmarkNavigation);
        }
        else {
            option.reserve.bookmarkNavigation = null;
            state.lens.nodeTab.lensBookmarkNavigation = null;
        }

        return gStateCode.cloneState(state);
    },

    cancelTargetClickSelect: (state: IState): IState => {

        if (!state
            || !state.lens.nodeTab.lensBookmarkNavigation) {

            return state;
        }

        const bookmarkNavigation: IBookmarkNavigation = state.lens.nodeTab.lensBookmarkNavigation;
        gBookmarkCode.disableClickSelect(bookmarkNavigation);

        return gStateCode.cloneState(state);;
    },

    setKey: (
        state: IState,
        payload: IBookmarkNavigationElement): IStateAnyArray => {

        if (!state
            || !payload) {

            return state;
        }

        const input: HTMLInputElement = payload.element as HTMLInputElement;
        const key: string = input.value;

        const bookmarkNavigation: IBookmarkNavigation = payload.bookmarkNavigation;

        if (U.isNumeric(key) === true) {

            bookmarkNavigation.key = key;
            bookmarkNavigation.ui.raw = false;
            bookmarkNavigation.ui.recognised = false;
        }

        // Once the key has been fully entered need to validate it...
        // if (state.branchesState.tree.token !== state.lens.validationResults.nodeKey.token
        //     || key !== state.lens.validationResults.nodeKey.key) {

        //     return [
        //         gStateCode.cloneState(state),
        //         gNodeEffects.validateNodeKey(
        //             state,
        //             state.branchesState.tree.token,
        //             key
        //         )
        //     ];
        // }

        return gStateCode.cloneState(state);
    }
};

export default bookmarkActions;


