import IState from "../../../interfaces/state/IState";
import gLensCode from "../../../global/code/gLensCode";
import gStateCode from "../../../global/code/gStateCode";
import ILensWarning from "../../../interfaces/state/ui/ILensWarning";


const warningActions = {

    acknowledge: (state: IState): IState => {

        const warning: ILensWarning | null = state.lens.warning;

        if (warning) {

            warning.tab.saveLock = false;
        }

        state.lens.warning = null;

        return gStateCode.cloneState(state);
    },

    closeTab: (state: IState): IState => {

        const warning: ILensWarning | null = state.lens.warning;

        if (warning) {

            warning.tab.saveLock = false;
            
            gLensCode.clearTab(
                state, 
                warning.tab.type);
        }

        state.lens.warning = null;

        return gStateCode.cloneState(state);
    }
};

export default warningActions;
