import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import ILinkDiscussionJson from "../interfaces/ILinkDiscussionJson";
import gPluginCode from "../../../../../global/code/gPluginCode";
import LinkDiscussionJson from "../models/LinkDiscussionJson";
import { NodeType } from "../../../../../interfaces/enums/NodeType";
import U from "../../../../../global/gUtilities";
import gNodeCode from "../../../../../global/code/gNodeCode";


const linkDiscussionCode = {

    checkMatch: (node: INode<ILensUI> | null): boolean => {

        if (!node
            || !node.ui.discussionJson
            || node.ui.discussionJson.type !== DiscussionType.LinkJson) {

            return true;
        }

        const linkJson: ILinkDiscussionJson = node.ui.discussionJson as ILinkDiscussionJson;
        const ghostlinkJson: ILinkDiscussionJson = node.ui.ghostDiscussionJson as ILinkDiscussionJson;

        if ((!linkJson && ghostlinkJson)
            || (linkJson && !ghostlinkJson)) {

            return false;
        }

        return true;
    },

    buildLinkJsonFromDiscussion: (node: INode<ILensUI>): void => {

        if (node.ui.discussionJson?.type === DiscussionType.LinkJson) {
            return;
        }

        let linkJson: ILinkDiscussionJson;

        if (!node.ui.discussionJson
            && node.discussion.trim().startsWith("{")) {

            linkJson = JSON.parse(node.discussion) as ILinkDiscussionJson;
            linkJson.type = DiscussionType.LinkJson;
        }
        else {
            linkJson = new LinkDiscussionJson();
            node.discussion = "{}";
        }

        node.ui.discussionJson = linkJson;
        node.ui.ghostDiscussionJson = linkDiscussionCode.cloneLinkDiscussion(linkJson);
        gPluginCode.ensureBinDiscussionExists(node);
        node.bin.discussion.type = DiscussionType.LinkJson;
        node.type = NodeType.Solution;
    },

    cloneLinkDiscussion: (rawlinkJson: ILinkDiscussionJson): ILinkDiscussionJson => {

        const linkJson: ILinkDiscussionJson = new LinkDiscussionJson();
        linkJson.link = rawlinkJson.link;

        return linkJson;
    },

    validate: (node: INode<ILensUI>): boolean => {

        const link: ILinkDiscussionJson = node.ui.discussionJson as ILinkDiscussionJson;

        if (!link) {

            return false;
        }

        link.error = "";
        let success = true;

        if (U.isNullOrWhiteSpace(link.link)) {

            const errorMessage = `Link cannot be an empty string`;

            gNodeCode.setError(
                node,
                errorMessage
            );

            link.error = errorMessage;
            success = false;
        }

        return success;
    },

    toJson: (node: INode<ILensUI>): void => {

        const linkJson: ILinkDiscussionJson = node.ui.discussionJson as ILinkDiscussionJson;

        if (!linkJson) {
            return;
        }

        const link = {

            link: linkJson.link,
        };

        node.discussion = JSON.stringify(link);

        gPluginCode.ensureBinDiscussionExists(node);
        node.bin.discussion.type = DiscussionType.LinkJson;
    }
}

export default linkDiscussionCode;
