import { VNode } from "hyperapp-local";

import IState from "../../../../interfaces/state/IState";
import treeActions from "../actions/treeActions";
import paginationViews from "../../../pagination/views/paginationViews";


const buildPagination = (
    state: IState,
    isBottom: boolean): VNode | null => {

    return paginationViews.buildView(
        isBottom,
        state.treesState.paginationDetails,
        treeActions.showTreesPage,
        null);
};

const treePaginationViews = {

    buildTopPagination: (state: IState): VNode | null => {

        return buildPagination(
            state,
            false
        );
    },

    buildBottomPagination: (state: IState): VNode | null => {

        return buildPagination(
            state,
            true
        );
    }
};

export default treePaginationViews;


