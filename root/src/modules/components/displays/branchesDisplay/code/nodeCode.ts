import INode from "../../../../interfaces/state/tree/INode";
import IBranchUI from "../../../../interfaces/state/ui/UIs/IBranchUI";
import gSession from "../../../../global/gSession";
import Filters from "../../../../state/constants/Filters";


const nodeCode = {

    closeInfo: (option: INode<IBranchUI>): void => {

        option.ui.info = false;
        gSession.removeFocusFilter(Filters.infoControlFocusFilter);
    }
};

export default nodeCode;