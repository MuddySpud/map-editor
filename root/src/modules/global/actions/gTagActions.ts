import IState from "../../interfaces/state/IState";
import gStateCode from "../code/gStateCode";
import gTagsCode from "../code/gTagsCode";
import TagsCase from "../../state/cases/TagsCase";
import IPaginationDetails from "../../interfaces/state/ui/payloads/IPaginationDetails";
import ITagsCase from "../../interfaces/state/cases/ITagsCase";


const gTagActions = {

    loadTagsCase: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        if (!state.lens.tagsTab.tagsCase) {
            
            state.lens.tagsTab.tagsCase = new TagsCase(state.settings.defaultDataBatchSize);
        }

        const tagsCase: ITagsCase = state.lens.tagsTab.tagsCase;

        gTagsCode.loadTagsCase(
            response.jsonData.values,
            tagsCase
        );

        const paginationDetails: IPaginationDetails = tagsCase.paginationDetails;
        paginationDetails.totalItems = response.jsonData.total;

        return gStateCode.cloneState(state);
    }
};

export default gTagActions;
