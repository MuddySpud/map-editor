import IState from "../../interfaces/state/IState";
import gStateCode from "../code/gStateCode";
import gHistoryCode from "../code/gHistoryCode";
import HistoryCase from "../../state/cases/HistoryCase";
import IPaginationDetails from "../../interfaces/state/ui/payloads/IPaginationDetails";
import IHistoryCase from "../../interfaces/state/cases/IHistoryCase";


const gHistoryActions = {

    loadHistoryCase: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        if (!state.lens.historyTab.historyCase) {
            
            state.lens.historyTab.historyCase = new HistoryCase(state.settings.defaultDataBatchSize);
        }

        const historyCase: IHistoryCase = state.lens.historyTab.historyCase;

        gHistoryCode.loadHistoryCase(
            response.jsonData.values,
            historyCase);

        const paginationDetails: IPaginationDetails = historyCase.paginationDetails;
        paginationDetails.totalItems = response.jsonData.total;

        return gStateCode.cloneState(state);
    }
};

export default gHistoryActions;
