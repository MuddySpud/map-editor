import { h, VNode } from "hyperapp-local";

import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";
import NodeBaseElement from "../../../../../state/ui/payloads/NodeBaseElement";
import videoActions from "../actions/videoActions";
import gHtmlActions from "../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../global/actions/gTooltipActions";
import inputErrorViews from "../../../../lenses/lens/views/inputErrorViews";
import IState from "../../../../../interfaces/state/IState";
import IVideoUrlJson from "../interfaces/IVideoUrlJson";
import videoCode from "../code/videoCode";

import "../scss/video.scss"


const buildVideoUrlInputView = (
    node: INode<ILensUI>,
    videoUrlJson: IVideoUrlJson,
    invalid: boolean,
    tooltip: string): VNode => {

    if (!node.bin
        || !node.bin.discussion) {

        throw new Error("Bin.discussion cannot be null");
    }

    const view: VNode =

        h("div", { class: "discussion-input" }, [
            // h("h4", {}, "Video url"),
            h("div",
                {
                    class: {
                        "input-wrapper": true,
                        "invalid": invalid
                    }
                },
                [
                    h("input",
                        {
                            id: "videoUrl",
                            value: `${videoUrlJson.url}`,
                            type: "url",
                            class: "edit",
                            placeholder: `...enter the video url here...`,
                            onInput: [
                                videoActions.setDiscussionVideoUrl,
                                (event: any) => {
                                    return new NodeBaseElement(
                                        node,
                                        event.target
                                    );
                                }
                            ],
                            onBlur: gHtmlActions.clearFocus,
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => tooltip
                            ],
                            onMouseOut: gTooltipActions.clearTooltip
                        },
                        ""
                    )
                ]
            )
        ]);

    return view;
};

const videoDiscussionViews = {

    buildDiscussionView: (
        _state: IState,
        lensNode: INode<ILensUI>): VNode[] => {

        if (!lensNode.ui.discussionJson) {

            return [];
        }

        const videoUrlJson: IVideoUrlJson = lensNode.ui.discussionJson as IVideoUrlJson;

        if (!videoUrlJson) {

            return [];
        }

        videoCode.validateVideoUrl(
            lensNode,
            videoUrlJson);

        const invalid: boolean = lensNode.errors.length > 0;
        const end = "the video url...";

        const tooltip: string = lensNode.discussion.length === 0 ?
            `Enter ${end}` :
            `Edit ${end}`;

        const view: VNode[] = [

            h("div",
                {
                    id: "videoUrlJsonView",
                    class: {
                        "discussion-main": true,
                        "invalid": invalid
                    }
                },
                [
                    inputErrorViews.buildTitleErrorView(
                        "Video url",
                        [videoUrlJson.error]),

                    buildVideoUrlInputView(
                        lensNode,
                        videoUrlJson,
                        invalid,
                        tooltip)
                ]
            )
        ];

        return view;
    }
};

export default videoDiscussionViews;


