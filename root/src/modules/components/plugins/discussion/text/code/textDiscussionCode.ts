import gNodeCode from "../../../../../global/code/gNodeCode";
import U from "../../../../../global/gUtilities";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";


const textDiscussionCode = {

    checkMatch: (_node: INode<ILensUI> | null): boolean => {

        // The node will check discussions anyway so no need to do anything here.
        return true;
    },

    validate: (node: INode<ILensUI>): boolean => {

        if (!node) {

            return false;
        }

        if (U.isNullOrWhiteSpace(node.discussion)) {

            const errorMessage = `Node discussion cannot be an empty string`;

            gNodeCode.setError(
                node,
                errorMessage
            );

            return false;
        }

        return true;
    },

    toJson: (node: INode<ILensUI>): void => {

        if (!node.bin) {

            return;
        }

        node.bin.discussion = null;
    }
}

export default textDiscussionCode;
