import IState from "../../interfaces/state/IState";
import gSession from "../gSession";


const gHtmlActions = {

    clearFocus: (state: IState): IState => {

        gSession.clearAllFocusFilters();

        return state;
    }
};

export default gHtmlActions;
