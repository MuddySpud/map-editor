import IState from "../../interfaces/state/IState";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../interfaces/state/tree/INode";
import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import gOptionCode from "./gOptionCode";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import gNodeCode from "./gNodeCode";
import U from "../gUtilities";
import { ActionType } from "../../interfaces/enums/ActionType";
import IStSocket from "../../interfaces/state/tree/IStSocket";


const gSocketCode = {

    loadSocketsIntoLensNode: (state: IState): void => {

        if (!state
            || !state.lens.nodeTab.lensNode) {
            return;
        }

        // So far only coded for adding sockets to a node with no options
        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (!lensNode.link) {
            return;
        }

        const link: ISubtreeSys = lensNode.link as ISubtreeSys;

        link.stSockets.forEach((stSocket: IStSocket) => {

            gSocketCode.addPlugToLensNode(
                state,
                stSocket);
        });
    },

    addPlugToLensNode: (
        state: IState,
        stSocket: IStSocket): void => {

        const option: INode<ILensUI> = gOptionCode.addOptionToLensNode(state);
        option.option = `${stSocket.text}`;
        option.isPlug = true;
        option.plug = stSocket;
        option.plug.ui.selected = true;
        option.action = ActionType.CreatePlug;
    },

    validateSocket: (option: INodeBase): boolean => {

        if (U.isNullOrWhiteSpace(option.option) === true) {

            let errorText: string = `Option cannot be empty. `;

            gNodeCode.setError(
                option,
                errorText
            );
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

        if (!option.isPlug) {

            gNodeCode.setError(
                option,
                `Cannot have a type of ${option.type}.`
            );
        }

        return option.errors.length === 0;
    },

    validatePlug: (state: IState): boolean => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (!lensNode.link
            || lensNode.nodes.length === 0) {

            return true;
        }

        let option: INode<ILensUI>;

        for (let i = 0; i < lensNode.nodes.length; i++) {

            option = lensNode.nodes[i];

            if (gSocketCode.optionPlugIsValid(option) === false) {

                return false;
            }
        }

        return true;
    },

    optionPlugIsValid: (option: INode<ILensUI>): boolean => {

        if (option.action === ActionType.DeletePlug) {

            return true;
        }

        if (!option.plug) {

            return false;
        }

        return true;
    },

    optionIsLinkedOrDeleted: (
        option: INodeBase,
        stSockets: Array<IStSocket>): boolean => {

        if (option.action === ActionType.DeletePlug) {

            return true;
        }

        if (!option.plug) {
            return false;
        }

        for (let i = 0; i < stSockets.length; i++) {

            if (stSockets[i].key === option.plug.key) {
                return true;
            }
        }

        return false;
    },

    validateSockets: (state: IState): boolean => {

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (!lensNode.link
            || lensNode.nodes.length === 0) {
            return true;
        }

        const stSockets: Array<IStSocket> = lensNode.link.stSockets;

        const options: Array<INode<ILensUI>> = lensNode.nodes;
        let option: INodeBase;

        for (let i = 0; i < options.length; i++) {

            option = options[i];

            if (gSocketCode.optionIsLinkedOrDeleted(option, stSockets) === false) {

                gNodeCode.clearErrors(option);

                gNodeCode.setError(
                    option,
                    `Option has neither been marked as deleted nor linked to a valid socket. `
                );

                gSocketCode.validateSocket(option);
            }
        }

        return true;
    },

    clearAllLinkedSockets: (node: INode<ILensUI>): void => {

        node.nodes.forEach((option: INodeBase) => {

            option.plug = null;
            option.isPlug = false;
        });
    }
};

export default gSocketCode;

