import IState from "../../interfaces/state/IState";
import gStateCode from "../code/gStateCode";
import gSpreadCode from "../code/gSpreadCode";
import SpreadCase from "../../state/cases/SpreadCase";


const gSpreadActions = {

    loadSpreadCase: (
        state: IState,
        response: any): IState => {

        if (!response?.jsonData) {

            return state;
        }

        if (!state.lens.spreadTab.spreadCase) {

            state.lens.spreadTab.spreadCase = new SpreadCase();
        }

        gSpreadCode.loadSpreadCase(
            state,
            response.jsonData,
            state.lens.spreadTab.spreadCase
        );

        return gStateCode.cloneState(state);
    }
};

export default gSpreadActions;
