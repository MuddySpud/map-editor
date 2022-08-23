import IState from "../../../interfaces/state/IState";
import gStateCode from "../../../global/code/gStateCode";


const recordPanelActions = {

    start: (state: IState): IState => {

        return gStateCode.cloneState(state);
    },

    reStart: (state: IState): IState => {

        return gStateCode.cloneState(state);
    },

    stop: (state: IState): IState => {

        return gStateCode.cloneState(state);
    },

    pause: (state: IState): IState => {

        return gStateCode.cloneState(state);
    },
};

export default recordPanelActions;