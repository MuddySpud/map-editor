import IState from "../../interfaces/state/IState";
import gProjectCode from "../code/gProjectCode";
import gStateCode from "../code/gStateCode";


const gProjectActions = {

    loadSubtreeProject: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        gProjectCode.loadSubtree(
            state,
            response.jsonData
        );

        state.loading = false;

        return gStateCode.cloneState(state);
    }
};

export default gProjectActions;
