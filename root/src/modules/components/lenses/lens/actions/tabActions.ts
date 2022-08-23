import IState from "../../../../interfaces/state/IState";
import { TabType } from "../../../../interfaces/enums/TabType";
import gStateCode from "../../../../global/code/gStateCode";
import altsLensActions from "../../tabs/altsLens/actions/altsLensActions";
import gLensCode from "../../../../global/code/gLensCode";
import TabTypeEvent from "../../../../state/ui/payloads/TabTypeEvent";
import gTabCode from "../../../../global/code/gTabCode";


const tabActions = {

    showTab: (
        state: IState,
        tabType: TabType): IState => {

        gTabCode.setSelectedTab(
            state,
            tabType);

        if (state.lens.minimised) {

            gLensCode.maximiseLens(state);
        }

        if (tabType === TabType.Alts) {

            altsLensActions.onSelected(state);
        }

        return gStateCode.cloneState(state);
    },

    closeTab: (
        state: IState,
        tabTypeEvent: TabTypeEvent): IState => {

        const event: Event = tabTypeEvent.event;

        event.preventDefault();
        event.stopPropagation();

        gLensCode.clearTab(
            state,
            tabTypeEvent.tabType
        );

        return gStateCode.cloneState(state);
    }
};

export default tabActions;