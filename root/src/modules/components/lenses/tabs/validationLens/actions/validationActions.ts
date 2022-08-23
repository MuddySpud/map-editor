import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import IPaginationPayload from "../../../../../interfaces/state/ui/payloads/IPaginationPayload";
import IValidationCase from "../../../../../interfaces/state/cases/IValidationCase";


const validationActions = {

    selectError: (
        state: IState,
        id: number): IState => {

        if (!state
            || !state.lens.validationsTab.validationCase) {

            return state;
        }

        state.lens.validationsTab.validationCase.selectedErrorID = id;

        return gStateCode.cloneState(state);
    },

    selectCfReport: (
        state: IState,
        id: number): IState => {

        if (!state
            || !state.lens.validationsTab.validationCase) {

            return state;
        }

        state.lens.validationsTab.validationCase.selectedCfReportID = id;

        return gStateCode.cloneState(state);
    },

    showCircularRefPage: (
        state: IState,
        paginationPayload: IPaginationPayload): IState => {

        if (!state
            || !paginationPayload
            || !paginationPayload.payload) {

            return state;
        }

        const validationCase: IValidationCase = paginationPayload.payload as IValidationCase;
        validationCase.circularRefPagination = paginationPayload.paginationDetails;

        return gStateCode.cloneState(state);
    },

    showValidationErrorsPage: (
        state: IState,
        paginationPayload: IPaginationPayload): IState => {

        if (!state
            || !paginationPayload
            || !paginationPayload.payload) {

            return state;
        }

        const validationCase: IValidationCase = paginationPayload.payload as IValidationCase;
        validationCase.errorsPagination = paginationPayload.paginationDetails;

        return gStateCode.cloneState(state);
    }
};

export default validationActions;
