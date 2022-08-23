import IState from "../../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gStateCode from "../../../../../global/code/gStateCode";
import U from "../../../../../global/gUtilities";
import gTagsCode from "../../../../../global/code/gTagsCode";
import TagsCase from "../../../../../state/cases/TagsCase";
import IPaginationPayload from "../../../../../interfaces/state/ui/payloads/IPaginationPayload";
import ITagsCase from "../../../../../interfaces/state/cases/ITagsCase";
import gTreesCoreActions from "../../../../../global/actions/gTreesCoreActions";
import IPaginationDetails from "../../../../../interfaces/state/ui/payloads/IPaginationDetails";
import gTagEffects from "../../../../../global/effects/gTagEffects";


const tagActions = {

    select: (
        state: IState,
        id: string): IState => {

        if (!state
            || !state.lens.tagsTab.tagsCase
            || U.isNullOrWhiteSpace(id) === true) {

            return state;
        }

        state.lens.tagsTab.tagsCase.selectedKey = id;

        return gStateCode.cloneState(state);
    },

    loadTagsCase: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        if (!state.lens.tagsTab.tagsCase) {
            state.lens.tagsTab.tagsCase = new TagsCase(state.settings.defaultDataBatchSize);
        }

        gTagsCode.loadTagsCase(
            response.jsonData.values,
            state.lens.tagsTab.tagsCase);

        const paginationDetails: IPaginationDetails = state.lens.tagsTab.tagsCase.paginationDetails;
        paginationDetails.totalItems = response.jsonData.total;

        return gStateCode.cloneState(state);
    },

    showTagsPage: (
        state: IState,
        paginationPayload: IPaginationPayload): IStateAnyArray => {

        if (!state
            || !paginationPayload
            || !paginationPayload.payload
            || !state.lens.treeTab.lensTree
            || U.isPositiveNumeric(state.lens.treeTab.lensTree.key) === false) {

            return state;
        }

        const tagsCase: ITagsCase = paginationPayload.payload as ITagsCase;
        tagsCase.paginationDetails = paginationPayload.paginationDetails;

        return [
            gTreesCoreActions.setupForTags(state),
            gTagEffects.getTreeKin(state)
        ];
    }
};

export default tagActions;
