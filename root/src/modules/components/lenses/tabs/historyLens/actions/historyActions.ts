import IState from "../../../../../interfaces/state/IState";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import gStateCode from "../../../../../global/code/gStateCode";
import U from "../../../../../global/gUtilities";
import gTreesCoreActions from "../../../../../global/actions/gTreesCoreActions";
import IPaginationPayload from "../../../../../interfaces/state/ui/payloads/IPaginationPayload";
import IHistoryCase from "../../../../../interfaces/state/cases/IHistoryCase";
import gHistoryEffects from "../../../../../global/effects/gHistoryEffects";


const historyActions = {

    select: (
        state: IState,
        id: string): IState => {

        if (!state
            || !state.lens.historyTab.historyCase
            || U.isNullOrWhiteSpace(id) === true) {

            return state;
        }

        state.lens.historyTab.historyCase.selectedID = id;

        return gStateCode.cloneState(state);
    },

    showHistoryPage: (
        state: IState,
        paginationPayload: IPaginationPayload): IStateAnyArray => {

        if (!state
            || !paginationPayload
            || !paginationPayload.payload
            || !state.lens.treeTab.lensTree
            || U.isPositiveNumeric(state.lens.treeTab.lensTree.key) === false) {

            return state;
        }

        const tagsCase: IHistoryCase = paginationPayload.payload as IHistoryCase;
        tagsCase.paginationDetails = paginationPayload.paginationDetails;

        return [
            gTreesCoreActions.setupForHistory(state),
            gHistoryEffects.getTreeHistory(state)
        ];
    }
};

export default historyActions;
