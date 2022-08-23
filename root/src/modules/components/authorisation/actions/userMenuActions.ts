import IState from "../../../interfaces/state/IState";
import IStateAnyArray from "../../../interfaces/state/IStateAnyArray";
import gStateCode from "../../../global/code/gStateCode";


const userMenuActions = {

    close: (state: IState): IStateAnyArray => {

        state.user.showMenu = false;

        return gStateCode.cloneState(state);
    }
}

export default userMenuActions;

