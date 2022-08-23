import gTreesStateCode from "../../../../../global/code/gTreesStateCode";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import gErrorActions from "../../../../../global/actions/gErrorActions";
import IState from "../../../../../interfaces/state/IState";
import imageActions from "../actions/imageActions";
import { UploadFile } from "./UploadFile";
import { ClickFileUploader } from "./ClickFileUploader";
import gOptionCode from "../../../../../global/code/gOptionCode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../../../../interfaces/state/tree/INode";
import imageCode from "../code/imageCode";
import { ResizeAndUploadImage } from "./ResizeImage";
import IImageUrlJson from "../interfaces/IImageUrlJson";


const uploadOptionImage = (
    callID: string,
    url: string,
    optionID: string,
    subscriptionID: string,
    file: File): any => {

    const formData = new FormData();
    formData.append("optionImage", file);

    const props: any = {
        action: imageActions.loadImageUploadResponse,
        requestType: "POST",
        optionID: optionID,
        formData: formData,
        url: url,
        callID: callID,
        actionType: ActionType.UploadOptionImage,
        subscriptionID: subscriptionID,
        error: (
            state: IState,
            errorDetails: any) => {

            const option: INode<ILensUI> | null = gOptionCode.getLensNodeOption(
                state,
                optionID
            );

            if (option) {

                imageCode.setImageName(
                    option,
                    "");
            }

            return gErrorActions.reportHttpError(
                state,
                callID,
                state.branchesState.tree.token,
                url,
                "",
                imageEffects.uploadOptionImage.name,
                "Error uploading option image file the server",
                errorDetails.stack,
                errorDetails,
                errorDetails.status,
                errorDetails.response
            );
        }
    };

    return UploadFile(props);
};


const imageEffects = {

    uploadOptionImage: (
        state: IState,
        optionID: string,
        image: File): any => {

        if (!state
            || !optionID
            || !image) {
            return;
        }

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'Upload option image file',
            state,
            state.branchesState.tree.key as string,
            ActionType.UploadOptionImage,
            optionID
        );

        const url: string = `${state.settings.apiUrl}/File/OptionImageUpload`;
        const subscriptionID: string = state.subscriptionState.subscriptionID;

        return uploadOptionImage(
            callID,
            url,
            optionID,
            subscriptionID,
            image);
    },

    resizeAndUploadImage: (
        state: IState,
        optionID: string,
        file: File,
        imageUrlJson: IImageUrlJson): any => {

        if (!state
            || !optionID
            || !file) {
            return;
        }

        if (file.type === 'image/svg+xml'
            || file.type === 'image/gif') {

            return imageEffects.uploadOptionImage(
                state,
                optionID,
                file
            );
        }
        else if (file.type === "image/png"
            || file.type === 'image/jpg'
            || file.type === 'image/jpeg') {

            const props = {
                file: file,
                maxSize: state.settings.defaultImageSize,
                optionKey: optionID,
                imageUrlJson: imageUrlJson
            };

            return ResizeAndUploadImage(props);
        }

        throw new Error(`File type: ${file.type} not coded for yet.`);
    },

    clickFileUpoader: (
        _state: IState,
        optionID: string): any => {

        if (!optionID) {
            return;
        }

        const props: any = {
            optionID: optionID
        };

        return ClickFileUploader(props);
    }
};

export default imageEffects;
