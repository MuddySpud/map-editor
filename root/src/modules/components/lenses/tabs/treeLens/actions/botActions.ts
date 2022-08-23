import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";


const botActions = {

    overWriteBot: (state: IState): IStateAnyArray => {

        return gStateCode.cloneState(state);
    }
};

export default botActions;
