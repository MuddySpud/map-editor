import { Children, h, VNode } from "hyperapp-local";
import gHtmlActions from "../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../global/actions/gTooltipActions";
import NodeBaseElement from "../../../../../state/ui/payloads/NodeBaseElement";
import StringEvent from "../../../../../state/ui/payloads/StringEvent";
import INodeBase from "../../../../../interfaces/state/tree/INodeBase";
import imageActions from "../actions/imageActions";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";
import U from "../../../../../global/gUtilities";
import fileUploaderCode from "../code/fileUploaderCode";
import imageCode from "../code/imageCode";
// import progressBarCode from "../code/progressBarCode";
// import IImageUrlJson from "../interfaces/IImageUrlJson";

import "../scss/image.scss"
import IImageUrlJson from "../interfaces/IImageUrlJson";


const buildImageView = (
    parentImageUrlJson: IImageUrlJson | null,
    option: INode<ILensUI>): Children[] => {

    if (!parentImageUrlJson
        || !parentImageUrlJson.enableChildOptionImages) {

        return [];
    }

    const imageName: string = U.getFileName(imageCode.getImageName(option));

    const controlsView: Children[] = [

        buildImageUploadView(
            option,
            imageName),

        buildRemoveImageView(
            option,
            imageName)
    ];

    return controlsView;
};

const buildRemoveImageView = (
    option: INodeBase,
    imageName: string): VNode | null => {

    if (U.isNullOrWhiteSpace(imageName)) {

        return null;
    }

    const removeOptionView: VNode =

        h("div",
            {
                class: "btn-delete",
                onClick: [
                    imageActions.removeImage,
                    option
                ],
                onMouseOver: [
                    gTooltipActions.showTooltip,
                    (_event: any) => `Remove ${imageName}`
                ],
                onMouseOut: gTooltipActions.clearTooltip
            },
            ""
        );

    return removeOptionView;
};

const buildImageUploadView = (
    option: INode<ILensUI>,
    imageName: string): VNode | null => {

    if (!option
        || U.isNullOrWhiteSpace(option.key)) {

        return null;
    }

    const id: string = fileUploaderCode.getID(option.key as string);

    const controlsView: VNode =

        h("div", { class: "image-file" }, [
            h("label", {}, `${imageName}`),
            h("input",
                {
                    type: "file",
                    class: "hidden",
                    id: id,
                    accept: "image/gif,image/jpeg,image/jpg,image/png,image/svg",
                    onChange: [
                        imageActions.uploadImage,
                        (event: any) => {
                            return new NodeBaseElement(
                                option,
                                event.target
                            );
                        }
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                "Select an image to upload",
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            )
        ]);

    return controlsView;
};

const imageOptionViews = {

    buildImageButtonView: (option: INodeBase): VNode => {

        const controlsView: VNode =
    
            h("a",
                {
                    class: `option-image`,
                    onClick: [
                        imageActions.selectImage,
                        (event: any) => {
                            return new NodeBaseElement(
                                option,
                                event.target,
                            );
                        }
                    ],
                    onMouseOver: [
                        gTooltipActions.showTooltipWithEvent,
                        (event: any) => {
                            return new StringEvent(
                                "Show image inputs",
                                event
                            );
                        }
                    ],
                    onMouseOut: gTooltipActions.clearTooltip
                },
                ""
            );
    
        return controlsView;
    },
    
    buildInnerOptionView: (
        lensNode: INode<ILensUI>,
        option: INode<ILensUI>,
        optionText: string,
        tooltip: string): VNode | null => {

        let text: string = option.option;
        const parentImageUrlJson: IImageUrlJson | null = lensNode.ui.optionJson as IImageUrlJson;
        const imageUrlJson: IImageUrlJson | null = option.ui.optionJson as IImageUrlJson;

        if (imageUrlJson) {

            text = imageUrlJson.text;
        }

        const view: VNode =

            h("div", { class: "option-plugin" }, [
                h("div", { class: "textarea-wrapper" }, [
                    h("textarea",
                        {
                            id: `option_${option.key}`,
                            value: `${text}`,
                            class: "edit",
                            textmode: "MultiLine",
                            placeholder: `...enter the ${optionText} text here...`,
                            draggable: "false",
                            onInput: [
                                imageActions.setOptionText,
                                (event: any) => {
                                    return new NodeBaseElement(
                                        option,
                                        event.target,
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
                ]),

                ...buildImageView(
                    parentImageUrlJson,
                    option),
            ]);

        return view;
    }
};

export default imageOptionViews;


