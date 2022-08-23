import IState from "../../interfaces/state/IState";
import gStateCode from "../code/gStateCode";
import U from "../gUtilities";
import IStringEvent from "../../interfaces/state/ui/payloads/IStringEvent";


const gTooltipActions = {

    showTooltip: (
        state: IState,
        tooltip: string): IState => {

        if (state.status.tooltip === tooltip) {
            
            return state;
        }

        if (U.isNullOrWhiteSpace(tooltip)) {

            state.status.tooltip = '';
        }
        else {
            state.status.tooltip = tooltip;
        }

        return gStateCode.cloneState(state);
    },

    showTooltipWithEvent: (
        state: IState,
        tooltipEvent: IStringEvent): IState => {

        const event: Event = tooltipEvent.event;

        event.preventDefault();
        event.stopPropagation();

        return gTooltipActions.showTooltip(
            state,
            tooltipEvent.value);
    },

    clearTooltip: (state: IState): IState => {

        if (U.isNullOrWhiteSpace(state.status.tooltip) === true) {

            return state;
        }

        state.status.tooltip = '';

        return gStateCode.cloneState(state);
    }
};

export default gTooltipActions;

