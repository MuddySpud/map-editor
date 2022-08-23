import U from "../../../../../global/gUtilities";
import gNodeCode from "../../../../../global/code/gNodeCode";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import IImageUrlJson from "../interfaces/IImageUrlJson";
import { OptionType } from "../../../../../interfaces/enums/OptionType";
import INodeBase from "../../../../../interfaces/state/tree/INodeBase";
import ImageUrlJson from "../models/ImageUrlJson";
import gFileCode from "../../../../../global/code/gFileCode";
import IState from "../../../../../interfaces/state/IState";
import gStateCode from "../../../../../global/code/gStateCode";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import gPluginCode from "../../../../../global/code/gPluginCode";


const imageCode = {

    getImageName: (option: INode<ILensUI>): string => {

        const imageUrlJson: IImageUrlJson = option.ui.optionJson as IImageUrlJson;

        return imageUrlJson?.fileName ?? "";
    },

    setImageName: (
        option: INode<ILensUI>,
        imageName: string): void => {

        const imageUrlJson: IImageUrlJson = option.ui.optionJson as IImageUrlJson;
        imageUrlJson.fileName = imageName;
    },

    getNewEmptyImageUrlJson: (state: IState): IImageUrlJson => {

        const id: string = gStateCode.getFreshKey(state);

        return new ImageUrlJson(
            "",
            id,
            ""
        );
    },

    getNewImageUrlJson: (
        state: IState,
        text: string): IImageUrlJson => {

        const id: string = gStateCode.getFreshKey(state);

        return new ImageUrlJson(
            text,
            id,
            ""
        );
    },

    ensureImageUrlJson: (
        state: IState,
        node: INode<ILensUI>): IImageUrlJson => {

        if (node.ui.optionJson?.type !== OptionType.ImageUrlJson) {

            node.ui.optionJson = imageCode.getNewImageUrlJson(
                state,
                node.option
            );
        }

        if (U.isNullOrWhiteSpace(node.option)) {

            node.option = "{}";
        }


        return node.ui.optionJson as IImageUrlJson;
    },

    checkMatch: (node: INode<ILensUI> | null): boolean => {

        if (!node
            || node.ui.optionJson?.type !== OptionType.ImageUrlJson) {

            return true;
        }

        const imageUrlJson: IImageUrlJson = node.ui.optionJson as IImageUrlJson;
        const ghostImageUrlJson: IImageUrlJson = node.ui.ghostOptionJson as IImageUrlJson;

        if ((!imageUrlJson && ghostImageUrlJson)
            || (imageUrlJson && !ghostImageUrlJson)) {

            return false;
        }

        if (imageUrlJson.text !== ghostImageUrlJson.text
            || imageUrlJson.fileID !== ghostImageUrlJson.fileID
            || imageUrlJson.fileName !== ghostImageUrlJson.fileName
            || imageUrlJson.enableChildOptionImages !== ghostImageUrlJson.enableChildOptionImages) {

            return false;
        }

        let success = true;

        for (let i = 0; i < node.nodes.length; i++) {

            success = imageCode.checkMatch(node.nodes[i]);

            if (!success) {

                return false;
            }
        }

        return true;
    },

    validate: (node: INode<ILensUI> | null): boolean => {

        if (!node) {

            return false;
        }

        const imageUrlJson: IImageUrlJson = node.ui.optionJson as IImageUrlJson;

        if (!imageUrlJson) {

            return false;
        }

        let success = true;

        for (let i = 0; i < node.nodes.length; i++) {

            success = success
                && imageCode.validateOption(node.nodes[i]);
        }

        return true;
    },

    validateOption: (node: INode<ILensUI> | null): boolean => {

        if (!node) {

            return false;
        }

        const imageUrlJson: IImageUrlJson = node.ui.optionJson as IImageUrlJson;

        if (!imageUrlJson
            || U.isNullOrWhiteSpace(imageUrlJson.fileName)) {

            // Then just text
            return true;
        }

        imageUrlJson.error = "";
        let success = true;

        if (U.isNullOrWhiteSpace(imageUrlJson.fileName)) {

            const errorMessage = `Image name cannot be an empty string
`;

            gNodeCode.setError(
                node,
                errorMessage
            );

            imageUrlJson.error += errorMessage;
            success = false;
        }

        if (U.isNullOrWhiteSpace(imageUrlJson.fileID)) {

            const errorMessage = `Cache image fileID cannot be an empty string
`;

            gNodeCode.setError(
                node,
                errorMessage
            );

            imageUrlJson.error += errorMessage;
            success = false;
        }

        return success;
    },

    checkForNoChanges: (node: INode<ILensUI> | null): boolean => {

        // Only check this node as calling code will check each option as well with this method
        if (!node) {

            return false;
        }

        const imageUrlJson: IImageUrlJson = node.ui.optionJson as IImageUrlJson;

        if (!imageUrlJson
            || U.isNullOrWhiteSpace(imageUrlJson.fileName)) {

            // Then just text
            return true;
        }

        return imageCode.compareToGhost(
            node,
            imageUrlJson);
    },

    removeTypeAndEmptyBin: (node: INodeBase): void => {

        if (node?.bin?.option?.type) {

            delete node.bin.option.type;
        }

        imageCode.deleteEmptyBin(node);
    },

    deleteEmptyBin: (node: INodeBase): void => {

        if (!node.bin) {
            return;
        }

        if (U.isObjectEmpty(node.bin?.option)) {

            delete node.bin.option;
        }
        else {
            return;
        }

        if (U.isObjectEmpty(node.bin)) {

            delete node.bin;
        }
    },

    toJson: (node: INode<ILensUI>): void => {

        // If the lensNode has a IImageUrlJson plugin this does not affect the 
        // lensNode only its options

        // Else need to check each option and see if it is an imageUrlJson then spit out json if not spit out text
        node.nodes.forEach((option: INode<ILensUI>) => {

            imageCode.optionToJson(option);
        });
    },

    optionToJson: (node: INode<ILensUI>): void => {

        const imageUrlJson: IImageUrlJson = node.ui.optionJson as IImageUrlJson;

        if (!imageUrlJson) {
            return;
        }

        const changed: boolean = imageCode.compareToGhost(
            node,
            imageUrlJson);

        if (changed
            && node.action === ActionType.None) {

            node.action = ActionType.UpdateNode;
        }

        if (!imageUrlJson.enableImages
            || U.isNullOrWhiteSpace(imageUrlJson.fileID)
            || U.isNullOrWhiteSpace(imageUrlJson.fileName)) {

            node.option = imageUrlJson.text;

            imageCode.removeTypeAndEmptyBin(node);

            return;
        }

        gFileCode.addFileToNode(
            node,
            imageUrlJson.id,
            imageUrlJson.fileName,
            imageUrlJson.fileID,
            imageUrlJson.action,
        );

        const imageUrl = {

            text: imageUrlJson.text,
            fileName: imageUrlJson.fileName,
            fileID: imageUrlJson.fileID
        };

        node.option = JSON.stringify(imageUrl);
        gPluginCode.ensureBinOptionExists(node);
        node.bin.option.type = OptionType.ImageUrlJson;
    },

    compareToGhost: (
        node: INode<ILensUI>,
        imageUrlJson: IImageUrlJson): boolean => {

        const ghostImageUrlJson: IImageUrlJson = node.ui.ghostOptionJson as IImageUrlJson;

        if (!ghostImageUrlJson) {

            return false;
        }

        const match = imageUrlJson.fileID === ghostImageUrlJson.fileID
            && imageUrlJson.fileName === ghostImageUrlJson.fileName
            && imageUrlJson.text === ghostImageUrlJson.text
            && imageUrlJson.enableChildOptionImages === ghostImageUrlJson.enableChildOptionImages;

        return match;
    },

    reHydrate: (
        state: IState,
        lensNode: INode<ILensUI>): boolean => {

        let option: INode<ILensUI>;
        let updateLensNode: boolean = false;

        for (let i = 0; i < lensNode.nodes.length; i++) {

            option = lensNode.nodes[i];

            if (option.bin?.option) {

                if (option.bin.option.type === OptionType.ImageUrlJson) {

                    imageCode.rehydrateOptionJson(option);
                    updateLensNode = true
                }
            }
        }

        if (updateLensNode === true
            && !lensNode.ui.optionJson) {

            imageCode.giveLensNodeNewImageUrlJson(
                state,
                lensNode
            );
        }

        return updateLensNode;
    },

    rehydrateOptionJson: (option: INode<ILensUI>): void => {

        let rawOptionImageUrl;

        try {

            rawOptionImageUrl = JSON.parse(option.option);
        }
        catch {
            // swallow
            return;
        }

        option.ui.optionJson = new ImageUrlJson(
            rawOptionImageUrl.text,
            rawOptionImageUrl.fileID,
            rawOptionImageUrl.fileName
        );

        option.ui.ghostOptionJson = new ImageUrlJson(
            rawOptionImageUrl.text,
            rawOptionImageUrl.fileID,
            rawOptionImageUrl.fileName
        );
    },

    giveLensNodeNewImageUrlJson: (
        state: IState,
        lensNode: INode<ILensUI>): IImageUrlJson => {

        const imageUrlJson: IImageUrlJson = imageCode.getNewImageUrlJson(
            state,
            lensNode.option);

        imageUrlJson.enableChildOptionImages = true;
        lensNode.ui.optionJson = imageUrlJson;

        const ghostImageUrlJson: IImageUrlJson = new ImageUrlJson(
            imageUrlJson.text,
            imageUrlJson.fileID,
            imageUrlJson.fileName);

        ghostImageUrlJson.enableChildOptionImages = true;
        lensNode.ui.ghostOptionJson = ghostImageUrlJson;

        return imageUrlJson;
    }
}

export default imageCode;
