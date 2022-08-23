import { timeout } from "../../../hyperApp/time";

import IState from "../../interfaces/state/IState";


const gTimedEffects = {

    runDelayedAction: (
        milliSecondDelay: number,
        actionDelegate: (state: IState) => IState
    ): any => {

        return timeout(actionDelegate, { delay: milliSecondDelay });
    }
};

export default gTimedEffects;
