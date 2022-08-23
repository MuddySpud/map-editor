import { interval } from "../../hyperApp/time";

import gRepeatActions from "../global/actions/gRepeatActions";
import IState from "../interfaces/state/IState";


const repeatSubscriptions = {

    buildRepeatSubscriptions: (state: IState) => {

        const buildRepeats = () => {

            return interval(
                gRepeatActions.httpSilentRepeat,
                { delay: state.settings.repeatActionPollingTime }
            );
        };

        const buildReLoadData = (): any => {

            if (state.repeatEffects.reLoadPostHttp.length > 0) {

                return interval(
                    gRepeatActions.httpSilentReLoad,
                    { delay: state.settings.httpSilentReLoadDelay }
                );
            }
        };

        const buildReLoadDataImmediate = (): any => {

            if (state.repeatEffects.reLoadPostHttpImmediate.length > 0) {

                return interval(
                    gRepeatActions.httpSilentReLoadImmediate,
                    { delay: 10 }
                );
            }
        };

        const buildReRecordState = (): any => {

            if (state.repeatEffects.reLoadPostHttpImmediate.length > 0) {

                return interval(
                    gRepeatActions.httpRecordState,
                    { delay: 50 }
                );
            }
        };

        const repeatSubscription: any[] = [

            buildReLoadData(),
            buildReLoadDataImmediate(),
            buildRepeats(),
            buildReRecordState()
        ];

        return repeatSubscription;
    }
};

export default repeatSubscriptions;

