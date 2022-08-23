// import gNodeCode from "../../../../../global/code/gNodeCode";
// import U from "../../../../../global/gUtilities";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";


const textOptionCode = {

    checkMatch: (_node: INode<ILensUI> | null): boolean => {

        // The node will check options anyway so no need to do anything here.
        return true;
    },

    toJson: (node: INode<ILensUI>): void => {

        if (!node.bin) {

            return;
        }

        node.bin.option = null;
    }
}

export default textOptionCode;
