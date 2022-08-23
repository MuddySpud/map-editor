import IState from "../../interfaces/state/IState";
import IBoolElement from "../../interfaces/state/ui/payloads/IBoolElement";


const gStageActions = {

    nextStage: (
        state: IState,
        payload: IBoolElement): IState => {

        if (!state
            || payload.disabled !== false) {

            return state;
        }

        return state.lens.nodeTab.stageBehaviour.nextStage(state);
    },

    previousStage: (
        state: IState,
        payload: IBoolElement): IState => {

        if (!state
            || payload.disabled !== false) {
                
            return state;
        }

        return state.lens.nodeTab.stageBehaviour.previousStage(state);
    }
};

export default gStageActions;
