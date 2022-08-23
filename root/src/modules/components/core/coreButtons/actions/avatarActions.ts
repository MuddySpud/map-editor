
import IState from "../../../../interfaces/state/IState";
import gStateCode from "../../../../global/code/gStateCode";


const avatarActions = {

    toggleUserMenu: (state: IState): IState => {

        state.user.showMenu = state.user.showMenu === false;

        return gStateCode.cloneState(state);
    }
}

export default avatarActions;

