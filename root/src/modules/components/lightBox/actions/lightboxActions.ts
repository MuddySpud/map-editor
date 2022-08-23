import IState from "../../../interfaces/state/IState";
import gStateCode from "../../../global/code/gStateCode";
import gDialogueCode from "../../../global/code/gDialogueCode";
import ITabSave from "../../../interfaces/state/ui/tabs/ITabSave";
import gTabCode from "../../../global/code/gTabCode";


const lightboxActions = {

    close: (state: IState): IState => {

        gDialogueCode.clearDialogue(state);
        const selectedTab: ITabSave | null = gTabCode.getSelectedTabSave(state);

        if (selectedTab) {

            selectedTab.saveLock = false;
        }

        return gStateCode.cloneState(state);
    }
};

export default lightboxActions;