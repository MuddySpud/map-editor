import INode from "../../interfaces/state/tree/INode";
import Node from "../../state/tree/Node";
import IState from "../../interfaces/state/IState";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import U from "../gUtilities";
import { NodeType } from "../../interfaces/enums/NodeType";
import gNodeCode from "./gNodeCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import gStateCode from "./gStateCode";
import LensUI from "../../state/ui/UIs/LensUI";
import NodeBase from "../../state/tree/NodeBase";
import gSocketCode from "./gSocketCode";


const gOptionCode = {

    getLensNodeOption: (
        state: IState,
        optionID: string): INode<ILensUI> | null => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        let option: INode<ILensUI>;

        for (let i = 0; i < lensNode.nodes.length; i++) {

            option = lensNode.nodes[i];

            if (option.key === optionID) {

                return option;
            }
        }

        return null;
    },

    createLensUIOption: (state: IState): INode<ILensUI> => {

        let parent: INodeBase = state.lens.nodeTab.lensNode as unknown as NodeBase;
        let option: INode<ILensUI> = new Node<ILensUI>(LensUI);
        option.key = gStateCode.getFreshKey(state);
        option.type = NodeType.Discussion; // default as a discussion - can be changed later in the branchesView
        option.isParentRoot = parent.isRoot === true;
        option.isParentSilentRoot = parent.isSilentRoot === true;
        option.token = parent.token;
        option.isStash = parent.isStash;
        option.action = ActionType.CreateNode;
        option.order = ((parent.nodes.at(-1))?.order ?? 0) + 1;

        return option;
    },

    addOptionToLensNode: (state: IState): INode<ILensUI> => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        const newOption: INode<ILensUI> = gOptionCode.createLensUIOption(state);
        lensNode.nodes.push(newOption);
        newOption.parent = lensNode;

        window.TreeSolve.optionsPlugins.checkCurrent(
            state,
            lensNode);

        return newOption;
    },

    setOptionOrders: (state: IState): void => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;
        let order: number = 0;

        lensNode.nodes.forEach((option: INodeBase) => {

            if (option.action !== ActionType.DeleteNode
                && option.action !== ActionType.DeletePlug
                && !option.isHidden) {

                option.order = ++order;
            }
        });
    },

    validateOption: (
        option: INodeBase,
        optionCount: number): boolean => {

        if (option.isHidden === true) {

            return true;
        }

        gNodeCode.clearErrors(option);

        if (option.plug
            || option.isPlug === true) {

            return gSocketCode.validateSocket(option);
        }

        if (option.action === ActionType.DeleteNode) {
            // Don't need to validate anything for a delete.
            return true;
        }

        if (!option.parent) {

            gNodeCode.setError(
                option,
                "Option parent cannot be null."
            );
        }
        else if (option.parent.isVirtual === true
            && option.nodes.length > 0) {

            gNodeCode.setError(
                option,
                `A question on a virtual root cannot have children.`
            );
        }

        if (U.isNullOrWhiteSpace(option.option) === true) {

            let errorText: string = "";

            if (optionCount === 1
                && option.action === ActionType.CreateNode) {
                // Then it is the dummy option 
                if (option.parent
                    && option.parent.isVirtual === true) {

                    errorText += `There must be at least one Question - and its text cannot be empty.`;
                }
                else {
                    errorText += `A Discussion must have at least one Option - and its text cannot be empty.
If this node is not intended to have options, change the type above from Discussion to Solution. `;
                }

                gNodeCode.setError(
                    option,
                    errorText
                );
            }
            else {

                gNodeCode.setError(
                    option,
                    `Option cannot be empty. `
                );
            }
        }

        if (U.isNullOrWhiteSpace(option.key) === true) {

            gNodeCode.setError(
                option,
                `Key cannot be empty. `
            );
        }

        if (U.isNullOrWhiteSpace(option.token) === true) {

            gNodeCode.setError(
                option,
                `Token cannot be empty. `
            );
        }

        if (option.order < 1) {

            gNodeCode.setError(
                option,
                `Order cannot be less than 1.`
            );
        }

        if (option.type !== NodeType.Discussion
            && option.type !== NodeType.Solution
            && option.isLink !== true) {

            gNodeCode.setError(
                option,
                `Cannot have a type of ${option.type}.`
            );
        }

        return option.errors.length === 0;
    },

    isBlankOption: (option: INodeBase): boolean => {

        if (!U.isNegativeNumeric(option.key)) {
            return false;
        }

        if (option.action !== ActionType.CreateNode) {
            return false;
        }

        if (!U.isNullOrWhiteSpace(option.discussion)
            || option.isSocket === true) {

            return false;
        }

        if (!U.isNullOrWhiteSpace(option.option)) {
            return false;
        }

        return true;
    },

    isDeleteBlankOption: (option: INodeBase): boolean => {

        if (option.isHidden === true) {
            return false;
        }

        if (!U.isNegativeNumeric(option.key)) {
            return false;
        }

        if (option.action !== ActionType.DeleteNode) {
            return false;
        }

        if (!U.isNullOrWhiteSpace(option.discussion)
            || option.isSocket === true) {

            return false;
        }

        if (!U.isNullOrWhiteSpace(option.option)) {
            return false;
        }

        return true;
    },

    reLoadOptions: (
        node: INode<IBranchUI>,
        rawNode: any): any[] => {

        if (!rawNode
            || !rawNode.nodes) {
            return [];
        }

        const rawOptions = rawNode.nodes;
        let option: INode<IBranchUI> | null | undefined = null;
        let rawOption: any = null;
        let freshRawOptions: any[] = [];

        for (let i = 0; i < rawOptions.length; i++) {

            rawOption = rawOptions[i];

            option = node.nodes.find((o: INodeBase) => {
                return o.key === rawOption.key;
            });

            if (!option) {
                freshRawOptions.push(rawOption);
            }
            else {
                gNodeCode.reLoadNodeShallow(option, rawOption);
                option.parent = node;
            }
        }

        return freshRawOptions;
    },

    loadOptions: (
        rawOptions: any[],
        parent: INode<IBranchUI> | null = null): Array<INode<IBranchUI>> => {

        if (!rawOptions) {
            return [];
        }

        const options: Array<INode<IBranchUI>> = [];
        let option: INode<IBranchUI> | null = null;
        let rawOption: any = null;

        for (let i = 0; i < rawOptions.length; i++) {

            rawOption = rawOptions[i];
            option = gNodeCode.loadNodeShallow(rawOption);

            if (option) {

                options.push(option);
                option.parent = parent;
            }
        }

        return options;
    }
};

export default gOptionCode;