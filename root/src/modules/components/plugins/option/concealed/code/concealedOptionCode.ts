import gPluginCode from "../../../../../global/code/gPluginCode";
import { ActionType } from "../../../../../interfaces/enums/ActionType";
import U from "../../../../../global/gUtilities";
import { OptionType } from "../../../../../interfaces/enums/OptionType";
import INode from "../../../../../interfaces/state/tree/INode";
import ILensUI from "../../../../../interfaces/state/ui/UIs/ILensUI";
import IConcealedOptionJson from "../interfaces/IConcealedOptionJson";
import ConcealedOptionJson from "../models/ConcealedOptionJson";


const parseOptionJson = (option: INode<ILensUI>): any => {

    let rawConcealedOptionJson = {};

    try {

        rawConcealedOptionJson = JSON.parse(option.option);
    }
    catch {
        // swallow
        return rawConcealedOptionJson;
    }

    return rawConcealedOptionJson;
};

const concealedOptionCode = {

    checkMatch: (node: INode<ILensUI> | null): boolean => {

        if (!node
            || node.ui.optionJson?.type !== OptionType.ConcealedJson) {

            return true;
        }

        const concealedOptionJson: IConcealedOptionJson = node.ui.optionJson as IConcealedOptionJson;
        const ghostConcealedOptionJson: IConcealedOptionJson = node.ui.ghostOptionJson as IConcealedOptionJson;

        if ((!concealedOptionJson && ghostConcealedOptionJson)
            || (concealedOptionJson && !ghostConcealedOptionJson)) {

            return false;
        }

        if (concealedOptionJson.script !== ghostConcealedOptionJson.script
            || concealedOptionJson.comment !== ghostConcealedOptionJson.comment) {

            return false;
        }

        let success = true;

        for (let i = 0; i < node.nodes.length; i++) {

            success = concealedOptionCode.checkMatch(node.nodes[i]);

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

        const concealedOptionJson: IConcealedOptionJson = node.ui.optionJson as IConcealedOptionJson;

        if (!concealedOptionJson) {

            return false;
        }

        let success = true;
        let optionSuccess = true;
        let distinctOptions: any = {};

        for (let i = 0; i < node.nodes.length; i++) {

            optionSuccess = concealedOptionCode.validateOption(
                node.nodes[i],
                distinctOptions
            );

            success = optionSuccess && success;
        }

        return success;
    },

    validateOption: (
        node: INode<ILensUI> | null,
        distinctOptions: any): boolean => {

        if (!node) {

            return false;
        }

        if (node.isHidden === true) {

            return true;
        }

        const concealedOptionJson: IConcealedOptionJson = node.ui.optionJson as IConcealedOptionJson;
        concealedOptionJson.error = "";
        let success = true;

        if (U.isNullOrWhiteSpace(concealedOptionJson.script)) {

            const errorMessage = "Script cannot be empty";
            concealedOptionJson.error += errorMessage;
            success = false;
        }

        // Check that the options are unique for this node
        if (distinctOptions[concealedOptionJson.script] === true) {

            success = false;
            distinctOptions[concealedOptionJson.script] = false;

            if (concealedOptionJson.error.length > 0) {

                concealedOptionJson.error += "\n";
            }

            concealedOptionJson.error += "Duplicate concealed option script.";
        }
        else {
            distinctOptions[concealedOptionJson.script] = true;
        }

        return success;
    },

    checkForNoChanges: (node: INode<ILensUI> | null): boolean => {

        // Only check this node as calling code will check each option as well with this method
        if (!node) {

            return false;
        }

        const concealedOptionJson: IConcealedOptionJson = node.ui.optionJson as IConcealedOptionJson;

        return concealedOptionCode.compareToGhost(
            node,
            concealedOptionJson);
    },

    toJson: (node: INode<ILensUI>): void => {

        // If the lensNode has a ConcealedOption plugin this does not affect the 
        // lensNode only its options

        // Else need to check each option and see if it is a ConcealedOption then spit out json, if not spit out text
        node.nodes.forEach((option: INode<ILensUI>) => {

            concealedOptionCode.optionToJson(option);
        });
    },

    optionToJson: (node: INode<ILensUI>): void => {

        const concealedOptionJson: IConcealedOptionJson = node.ui.optionJson as IConcealedOptionJson;

        if (!concealedOptionJson) {
            return;
        }

        const changed: boolean = concealedOptionCode.compareToGhost(
            node,
            concealedOptionJson);

        if (changed
            && node.action === ActionType.None) {

            node.action = ActionType.UpdateNode;
        }

        const concealedOption = {

            script: concealedOptionJson.script,
            comment: concealedOptionJson.comment
        };

        node.option = JSON.stringify(concealedOption);
        gPluginCode.ensureBinOptionExists(node);
        node.bin.option.type = OptionType.ConcealedJson;
    },

    compareToGhost: (
        node: INode<ILensUI>,
        concealedOptionJson: IConcealedOptionJson): boolean => {

        const ghostConcealedOptionJson: IConcealedOptionJson = node.ui.ghostOptionJson as IConcealedOptionJson;

        if (!ghostConcealedOptionJson) {

            return false;
        }

        const match = concealedOptionJson.script === ghostConcealedOptionJson.script
            && concealedOptionJson.comment === ghostConcealedOptionJson.comment;

        return match;
    },

    reHydrate: (lensNode: INode<ILensUI>): boolean => {

        let option: INode<ILensUI>;
        let updateLensNode: boolean = false;

        for (let i = 0; i < lensNode.nodes.length; i++) {

            option = lensNode.nodes[i];

            if (option.bin?.option) {

                if (option.bin.option.type === OptionType.ConcealedJson) {

                    concealedOptionCode.rehydrateOptionJson(option);
                    updateLensNode = true
                }
            }
        }

        if (updateLensNode === true
            && !lensNode.ui.optionJson) {

            concealedOptionCode.giveLensNodeNewConcealedOptionJson(lensNode);
        }

        return updateLensNode;
    },

    rehydrateOptionJson: (option: INode<ILensUI>): void => {

        let rawConcealedOptionJson = parseOptionJson(option);

        option.ui.optionJson = new ConcealedOptionJson(
            rawConcealedOptionJson.script,
            rawConcealedOptionJson.comment
        );

        option.ui.ghostOptionJson = new ConcealedOptionJson(
            rawConcealedOptionJson.script,
            rawConcealedOptionJson.comment
        );
    },

    giveLensNodeNewConcealedOptionJson: (lensNode: INode<ILensUI>): IConcealedOptionJson => {

        if (lensNode.ui.optionJson?.type === OptionType.ConcealedJson) {

            return lensNode.ui.optionJson as IConcealedOptionJson;
        }

        const concealedOptionJson: IConcealedOptionJson = new ConcealedOptionJson("");
        lensNode.ui.optionJson = concealedOptionJson;

        const ghostConcealedOptionJson: IConcealedOptionJson = new ConcealedOptionJson(concealedOptionJson.script);
        lensNode.ui.ghostOptionJson = ghostConcealedOptionJson;

        return concealedOptionJson;
    },

    ensureConcealedOptionJson: (option: INode<ILensUI>): ConcealedOptionJson => {

        if (option.ui.optionJson?.type !== OptionType.ConcealedJson) {

            let rawConcealedOptionJson = parseOptionJson(option);

            option.ui.optionJson = new ConcealedOptionJson(
                rawConcealedOptionJson?.script ?? '{}',
                rawConcealedOptionJson?.comment ?? ''
            );
        }

        if (U.isNullOrWhiteSpace(option.option)) {

            option.option = `{${option.key}}`;
        }

        return option.ui.optionJson as ConcealedOptionJson;
    }
}

export default concealedOptionCode;
