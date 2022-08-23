import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import INodeBaseElement from "../../../../../interfaces/state/ui/payloads/INodeBaseElement";
import IStateAnyArray from "../../../../../interfaces/state/IStateAnyArray";
import imageEffects from "../effects/imageEffects";
import imageCode from "../code/imageCode";
import U from "../../../../../global/gUtilities";
import gOptionCode from "../../../../../global/code/gOptionCode";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import IImageUrlJson from "../interfaces/IImageUrlJson";
import { ActionType } from "../../../../../interfaces/enums/ActionType";


const imageActions = {

    uploadImage: (
        state: IState,
        payload: INodeBaseElement): IStateAnyArray => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return state;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode;
        const lenNodeOptionJson: IImageUrlJson = lensNode.ui.optionJson as IImageUrlJson;

        if (lenNodeOptionJson.enableChildOptionImages) {

            const option: INode<ILensUI> = payload.node as INode<ILensUI>;
            const input: HTMLInputElement = payload.element as HTMLInputElement;
            const imageUrlJson: IImageUrlJson = option.ui.optionJson as IImageUrlJson;

            if (!input.files
                || input.files.length === 0) {

                imageUrlJson.uploading = false;

                return gStateCode.cloneState(state);
            }

            const file: File = input.files[0];
            lensNode.ui.raw = false;

            imageCode.setImageName(
                option,
                file.name
            );

            return [
                gStateCode.cloneState(state),
                imageEffects.resizeAndUploadImage(
                    state,
                    option.key as string,
                    file,
                    imageUrlJson
                )
            ];
        }

        return gStateCode.cloneState(state);
    },

    loadImageUploadResponse: (
        state: IState,
        result: any): IStateAnyArray => {

        if (!result
            || !result.response
            || U.isNullOrWhiteSpace(result.optionID)) {

            return state;
        }

        const option: INode<ILensUI> | null = gOptionCode.getLensNodeOption(
            state,
            result.optionID
        );

        if (!option) {

            return gStateCode.cloneState(state);
        }

        // If a file with the same name exists in the database then its details are returned instead.
        // Need to throw up a warning here to let the user know
        // Will need to dowload and display the image at some point
        const imageUrlJson: IImageUrlJson = option.ui.optionJson as IImageUrlJson;
        imageUrlJson.uploading = false;
        let action = ActionType.CreateAndAttachFile;

        if (!U.isNullOrWhiteSpace(result.response.jsonData.id)) {

            imageUrlJson.id = result.response.jsonData.id;
            action = ActionType.AttachFile;
        }
        else {
            imageUrlJson.id = gStateCode.getFreshKey(state);
        }

        imageUrlJson.fileID = result.response.jsonData.fileID;
        imageUrlJson.action = action;

        return gStateCode.cloneState(state);
    },

    selectImage: (
        state: IState,
        payload: INodeBaseElement): IStateAnyArray => {

        if (!state
            || !payload) {

            return gStateCode.cloneState(state);
        }

        const option: INode<ILensUI> = payload.node as INode<ILensUI>;

        const imageUrlJson: IImageUrlJson = imageCode.ensureImageUrlJson(
            state,
            option);

        imageUrlJson.uploading = true;
        imageUrlJson.action = ActionType.UploadOptionImage;

        return [
            gStateCode.cloneState(state),
            imageEffects.clickFileUpoader(
                state,
                payload.node.key as string)
        ];
    },

    removeImage: (
        state: IState,
        option: INode<ILensUI>): IStateAnyArray => {

        if (!state
            || !option) {

            return gStateCode.cloneState(state);
        }

        const imageUrlJson: IImageUrlJson = option.ui.optionJson as IImageUrlJson;
        option.option = imageUrlJson.text;
        option.ui.optionJson = null;
        imageCode.removeTypeAndEmptyBin(option);

        return gStateCode.cloneState(state);
    },

    UploadResizedImage: (
        state: IState,
        payload: any): IStateAnyArray => {

        if (!state
            || !payload) {

            return gStateCode.cloneState(state);
        }

        const image: File = payload.file;
        const optionKey: string = payload.optionKey;

        return [
            gStateCode.cloneState(state),
            imageEffects.uploadOptionImage(
                state,
                optionKey as string,
                image
            )
        ];
    },

    setOptionText: (
        state: IState,
        payload: INodeBaseElement): IState => {

        const textarea: HTMLTextAreaElement = payload.element as HTMLTextAreaElement;
        const option: INode<ILensUI> = payload.node as INode<ILensUI>;
        
        imageCode.ensureImageUrlJson(
            state, 
            option);

        const imageUrlJson: IImageUrlJson = option.ui.optionJson as IImageUrlJson;
        imageUrlJson.text = textarea.value;

        if (state.lens.nodeTab.lensNode) {

            state.lens.nodeTab.lensNode.ui.raw = false;
        }

        state.lens.nodeTab.enableSave = true;

        return gStateCode.cloneState(state);
    }
};

export default imageActions;
