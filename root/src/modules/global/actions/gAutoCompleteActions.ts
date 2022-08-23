import IState from "../../interfaces/state/IState";
import ITokenValidation from "../../interfaces/state/ui/ITokenValidation";
import TokenValidation from "../../state/ui/TokenValidation";
import gStateCode from "../code/gStateCode";
import gTreeCode from "../code/gTreeCode";

const gAutoCompleteActions = {

    processTokenValidation: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        const tokenValidation: ITokenValidation = new TokenValidation();
        tokenValidation.success = response.jsonData.success;
        tokenValidation.value = response.jsonData.fragment;
        tokenValidation.matching = gTreeCode.loadTreesShallow(response.jsonData.trees);
        state.lens.validationResults.treeToken = tokenValidation;

        return gStateCode.cloneState(state);
    }
};

export default gAutoCompleteActions;
