import { VNode } from "hyperapp-local";

import { OptionType } from "../../../../interfaces/enums/OptionType";
import IOptionsPlugin from "../../../../interfaces/plugins/IOptionsPlugin";
import INode from "../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../interfaces/state/ui/UIs/ILensUI";
import imageOptionViews from "./views/imageOptionViews";
import imageCode from "./code/imageCode";
import IImageUrlJson from "./interfaces/IImageUrlJson";
import IState from "../../../../interfaces/state/IState";


export default class ImageOptionsPlugin implements IOptionsPlugin {

    public name: string = "image option";
    public type: OptionType = OptionType.ImageUrlJson;
    public enabled: boolean = false;
    public buttonsClassName: string = "image-option"

    buildOptionView(
        lensNode: INode<ILensUI>,
        option: INode<ILensUI>,
        optionText: string,
        tooltip: string): VNode | null {

        return imageOptionViews.buildInnerOptionView(
            lensNode,
            option,
            optionText,
            tooltip
        );
    }

    buildOptionButtonViews(
        _state: IState,
        _lensNode: INode<ILensUI>,
        option: INode<ILensUI>): VNode[] {

        return [ imageOptionViews.buildImageButtonView(option) ];
    }

    setUp(
        _state: IState,
        _lensNode: INode<ILensUI>): void {
    }

    tearDown(
        _state: IState,
        _lensNode: INode<ILensUI>): void {
    }

    toggleEnable(
        state: IState,
        lensNode: INode<ILensUI>): boolean {

        let imageUrlJson: IImageUrlJson;

        if (lensNode.ui.optionJson?.type !== OptionType.ImageUrlJson) {

            imageUrlJson = imageCode.giveLensNodeNewImageUrlJson(
                state,
                lensNode);

            this.enabled = imageUrlJson.enableChildOptionImages;
        }
        else {
            imageUrlJson = lensNode.ui.optionJson as IImageUrlJson;
            this.enabled = imageUrlJson.enableChildOptionImages !== true;
            imageUrlJson.enableChildOptionImages = this.enabled;
        }

        lensNode.ui.raw = false;
        let optionImageUrlJson: IImageUrlJson;

        lensNode.nodes.forEach((option: INode<ILensUI>) => {

            optionImageUrlJson = imageCode.ensureImageUrlJson(
                state,
                option);

            optionImageUrlJson.enableImages = this.enabled;
        });

        return true;
    }

    reHydrate(
        state: IState,
        lensNode: INode<ILensUI>): boolean {

        this.enabled = imageCode.reHydrate(
            state,
            lensNode);

        return this.enabled;
    }

    checkMatch(lensNode: INode<ILensUI> | null): boolean {

        return imageCode.checkMatch(lensNode);
    }

    onRenderFinished(): void {

    }

    toJson(lensNode: INode<ILensUI>): void {

        imageCode.toJson(lensNode);
    }

    validate(lensNode: INode<ILensUI>): boolean {

        return imageCode.validate(lensNode);
    }

    checkForNoChanges(lensNode: INode<ILensUI>): boolean {

        return imageCode.checkForNoChanges(lensNode);
    }
}
