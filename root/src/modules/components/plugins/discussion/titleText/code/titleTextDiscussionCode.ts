import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import ITitleTextDiscussionJson from "../interfaces/ITitleTextDiscussionJson";
import TitleTextDiscussionJson from "../models/TitleTextDiscussionJson";
import gPluginCode from "../../../../../global/code/gPluginCode";


const titleTextDiscussionCode = {

    checkMatch: (node: INode<ILensUI> | null): boolean => {

        if (!node
            || !node.ui.discussionJson
            || node.ui.discussionJson.type !== DiscussionType.TitleTextJson) {

            return true;
        }

        const titleTextJson: ITitleTextDiscussionJson = node.ui.discussionJson as ITitleTextDiscussionJson;
        const ghostTitleTextJson: ITitleTextDiscussionJson = node.ui.ghostDiscussionJson as ITitleTextDiscussionJson;

        if ((!titleTextJson && ghostTitleTextJson)
            || (titleTextJson && !ghostTitleTextJson)) {

            return false;
        }

        return true;
    },

    buildTitleTextJsonFromDiscussion: (node: INode<ILensUI>): void => {

        if (node.ui.discussionJson?.type === DiscussionType.TitleTextJson) {
            return;
        }

        let titleTextJson: ITitleTextDiscussionJson;

        if (!node.ui.discussionJson
            && node.discussion.trim().startsWith("{")) {

            titleTextJson = JSON.parse(node.discussion) as ITitleTextDiscussionJson;
            titleTextJson.type = DiscussionType.TitleTextJson;
        }
        else {
            titleTextJson = new TitleTextDiscussionJson();
            node.discussion = "{}";
        }

        node.ui.discussionJson = titleTextJson;
        node.ui.ghostDiscussionJson = titleTextDiscussionCode.cloneTitleTextDiscussion(titleTextJson);
        gPluginCode.ensureBinDiscussionExists(node);
        node.bin.discussion.type = DiscussionType.TitleTextJson;
    },

    cloneTitleTextDiscussion: (rawTitleTextJson: ITitleTextDiscussionJson): ITitleTextDiscussionJson => {

        const titleTextJson: ITitleTextDiscussionJson = new TitleTextDiscussionJson();
        titleTextJson.text = rawTitleTextJson.text;
        titleTextJson.title  = rawTitleTextJson.title;

        return titleTextJson;
    },

    validate: (_node: INode<ILensUI>): boolean => {

        return true;
    },

    toJson: (node: INode<ILensUI>): void => {

        const titleTextJson: ITitleTextDiscussionJson = node.ui.discussionJson as ITitleTextDiscussionJson;

        if (!titleTextJson) {
            return;
        }

        const textTitle = {

            title: titleTextJson.title,
            text: titleTextJson.text
        };

        node.discussion = JSON.stringify(textTitle);

        gPluginCode.ensureBinDiscussionExists(node);
        node.bin.discussion.type = DiscussionType.TitleTextJson;
    }
}

export default titleTextDiscussionCode;
