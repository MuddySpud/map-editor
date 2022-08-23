import U from "../../../../../global/gUtilities";
import gNodeCode from "../../../../../global/code/gNodeCode";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import IVideoUrlJson from "../interfaces/IVideoUrlJson";
import VideoUrlJson from "../models/VideoUrlJson";
import { DiscussionType } from "../../../../../interfaces/enums/DiscussionType";
import gPluginCode from "../../../../../global/code/gPluginCode";


const videoCode = {

    checkMatch: (node: INode<ILensUI> | null): boolean => {

        if (!node
            || !node.ui.discussionJson
            || node.ui.discussionJson.type !== DiscussionType.VideoUrlJson) {

            return true;
        }

        const videoUrlJson: IVideoUrlJson = node.ui.discussionJson as IVideoUrlJson;
        const ghostVideoUrlJson: IVideoUrlJson = node.ui.ghostDiscussionJson as IVideoUrlJson;

        if ((!videoUrlJson && ghostVideoUrlJson)
            || (videoUrlJson && !ghostVideoUrlJson)
            || videoUrlJson.url !== ghostVideoUrlJson.url) {

            return false;
        }

        return true;
    },

    validate: (node: INode<ILensUI> | null): boolean => {

        if (!node) {

            return false;
        }

        const videoUrlJson: IVideoUrlJson = node.ui.discussionJson as IVideoUrlJson;

        if (!videoUrlJson) {

            return false;
        }

        return videoCode.validateVideoUrl(
            node,
            videoUrlJson
        );
    },

    validateVideoUrl: (
        node: INode<ILensUI>,
        videoUrlJson: IVideoUrlJson): boolean => {

        let success: boolean = videoCode.validateVideoUrlNotEmpty(
            node,
            videoUrlJson
        );

        if (!success) {

            return false;
        }

        try {
            const url = new URL(videoUrlJson.url);
            videoUrlJson.url = url.toString();
        }
        catch (error) {

            success = false;
            const errorMessage = `Not a valid url`;

            gNodeCode.setError(
                node,
                errorMessage
            );

            videoUrlJson.error = errorMessage;
        }

        return success;
    },

    validateVideoUrlNotEmpty: (
        node: INode<ILensUI>,
        videoUrlJson: IVideoUrlJson): boolean => {

        videoUrlJson.error = "";

        if (U.isNullOrWhiteSpace(videoUrlJson.url)) {

            const errorMessage = `Video url cannot be an empty string`;

            gNodeCode.setError(
                node,
                errorMessage
            );

            videoUrlJson.error = errorMessage;

            return false;
        }

        return true;
    },

    buildVideoUrlJsonFromDiscussion: (node: INode<ILensUI>): void => {

        if (node.ui.discussionJson?.type === DiscussionType.VideoUrlJson) {
            return;
        }

        let videoUrlJson: IVideoUrlJson;

        if (!node.ui.discussionJson
            && node.discussion.trim().startsWith("{")) {

            videoUrlJson = JSON.parse(node.discussion) as IVideoUrlJson;
            videoUrlJson.type = DiscussionType.VideoUrlJson;
        }
        else {
            videoUrlJson = new VideoUrlJson();
        }

        videoUrlJson.url = !videoUrlJson.url ? "" : videoUrlJson.url;

        node.ui.discussionJson = videoUrlJson;
        node.ui.ghostDiscussionJson = videoCode.cloneVideoUrl(videoUrlJson);
    },

    cloneVideoUrl: (rawVideoUrl: IVideoUrlJson): IVideoUrlJson => {

        const videoUrl: IVideoUrlJson = new VideoUrlJson();
        videoUrl.url = rawVideoUrl.url;

        return videoUrl;
    },

    toJson: (node: INode<ILensUI>): void => {

        const videoUrlJson: IVideoUrlJson = node.ui.discussionJson as IVideoUrlJson;

        if (!videoUrlJson) {
            return;
        }

        const videoUrl = {

            url: videoUrlJson.url
        };

        node.discussion = JSON.stringify(videoUrl);

        gPluginCode.ensureBinDiscussionExists(node);
        node.bin.discussion.type = DiscussionType.VideoUrlJson;
    }
}

export default videoCode;
