import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";
import gNodeCode from "../../../../../global/code/gNodeCode";
import U from "../../../../../global/gUtilities";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import IConcealedDiscussionJson from "../interfaces/IConcealedDiscussionJson";
import ConcealedDiscussionJson from "../models/ConcealedDiscussionJson";
import gPluginCode from "../../../../../global/code/gPluginCode";


const concealedDiscussionCode = {

    checkMatch: (node: INode<ILensUI> | null): boolean => {

        if (!node
            || !node.ui.discussionJson
            || node.ui.discussionJson.type !== DiscussionType.ConcealedJson) {

            return true;
        }

        const concealedDiscussionJson: IConcealedDiscussionJson = node.ui.discussionJson as IConcealedDiscussionJson;
        const ghostConcealedDiscussionJson: IConcealedDiscussionJson = node.ui.ghostDiscussionJson as IConcealedDiscussionJson;

        if ((!concealedDiscussionJson && ghostConcealedDiscussionJson)
            || (concealedDiscussionJson && !ghostConcealedDiscussionJson)) {

            return false;
        }

        return true;
    },

    buildConcealedDiscussionJsonFromDiscussion: (node: INode<ILensUI>): void => {

        if (node.ui.discussionJson?.type === DiscussionType.ConcealedJson) {
            return;
        }

        let concealedDiscussionJson: IConcealedDiscussionJson;

        if (!node.ui.discussionJson
            && node.discussion.trim().startsWith("{")) {

            concealedDiscussionJson = JSON.parse(node.discussion) as IConcealedDiscussionJson;
            concealedDiscussionJson.type = DiscussionType.ConcealedJson;
        }
        else {
            concealedDiscussionJson = new ConcealedDiscussionJson();
            node.discussion = "{}";
        }

        node.ui.discussionJson = concealedDiscussionJson;
        node.ui.ghostDiscussionJson = concealedDiscussionCode.cloneConcealedDiscussion(concealedDiscussionJson);
        gPluginCode.ensureBinDiscussionExists(node);
        node.bin.discussion.type = DiscussionType.ConcealedJson;
    },

    cloneConcealedDiscussion: (_rawConcealedDiscussionJson: IConcealedDiscussionJson): IConcealedDiscussionJson => {

        const concealedDiscussionJson: IConcealedDiscussionJson = new ConcealedDiscussionJson();

        return concealedDiscussionJson;
    },

    validate: (node: INode<ILensUI>): boolean => {

        if (!node) {

            return false;
        }

        // Need to validate there is at least one input too
        if (U.isNullOrWhiteSpace(node.inputs)) {

            const errorMessage = `Inputs cannot be an empty`;

            gNodeCode.setError(
                node,
                errorMessage
            );

            return false;
        }

        return true;
    },

    toJson: (node: INode<ILensUI>): void => {

        const concealedDiscussionJson: IConcealedDiscussionJson = node.ui.discussionJson as IConcealedDiscussionJson;

        if (!concealedDiscussionJson) {
            return;
        }

        gPluginCode.ensureBinDiscussionExists(node);
        node.bin.discussion.type = DiscussionType.ConcealedJson;
    }
}

export default concealedDiscussionCode;
