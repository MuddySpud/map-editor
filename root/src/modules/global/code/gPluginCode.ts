import INodeBase from "../../interfaces/state/tree/INodeBase";


const gPluginCode = {

    ensureBinOptionExists: (node: INodeBase): void => {

        if (!node.bin) {

            node.bin = {};
        }

        if (!node.bin.option) {

            node.bin.option = {};
        }
    },

    ensureBinDiscussionExists: (node: INodeBase): void => {

        if (!node.bin) {

            node.bin = {};
        }

        if (!node.bin.discussion) {

            node.bin.discussion = {};
        }
    }
};

export default gPluginCode;

