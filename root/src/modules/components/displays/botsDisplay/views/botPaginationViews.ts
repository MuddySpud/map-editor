import { VNode } from "hyperapp-local";

import botActions from "../actions/botActions";
import paginationViews from "../../../pagination/views/paginationViews";
import IPaginationDetails from "../../../../interfaces/state/ui/payloads/IPaginationDetails";


const buildPagination = (
    paginationDetails: IPaginationDetails,
    isBottom: boolean): VNode | null => {

    return paginationViews.buildView(
        isBottom,
        paginationDetails,
        botActions.showBotsPage,
        null
    );
};

const botPaginationViews = {

    buildTopPagination: (paginationDetails: IPaginationDetails): VNode | null => {

        return buildPagination(
            paginationDetails,
            false
        );
    },

    buildBottomPagination: (paginationDetails: IPaginationDetails): VNode | null => {

        return buildPagination(
            paginationDetails,
            true
        );
    }
};

export default botPaginationViews;


