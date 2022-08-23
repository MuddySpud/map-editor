import IState from "../../interfaces/state/IState";
import gStateCode from "../code/gStateCode";
import gValidationCode from "../code/gValidationCode";
import IValidationsTab from "../../interfaces/state/ui/tabs/IValidationsTab";
import { NotificationType } from "../../interfaces/enums/NotificationType";


const gValidationActions = {

    loadResults: (
        state: IState,
        response: any): IState => {

        if (!state
            || !response?.jsonData) {

            return state;
        }

        const validationsTab: IValidationsTab = state.lens.validationsTab;
        
        validationsTab.validationCase = gValidationCode.loadValidationResults(
            state,
            response.jsonData
        );

        if (validationsTab.validationCase) {

            gValidationCode.showValidationTab(state);

            const message: string = `Tree key: ${validationsTab.validationCase.treeKey}, 
Name: ${validationsTab.validationCase.treeName},
Success: ${validationsTab.validationCase.success}.`;

            gStateCode.addNotification(
                state,
                `Tree validation completed`,
                message,
                validationsTab.validationCase.treeToken,
                NotificationType.Info
            );
        }

        // Need to inform the user that validations have now been loaded
        // Either by a popup or by flagging the validations tab with colour
        // or an animation
        
        return gStateCode.cloneState(state);
    }
};

export default gValidationActions;
