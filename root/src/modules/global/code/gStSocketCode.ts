import { ActionType } from "../../interfaces/enums/ActionType";
import U from "../gUtilities";
import IStSocket from "../../interfaces/state/tree/IStSocket";
import StSocket from "../../state/tree/StSocket";
import ISocketHole from "../../interfaces/state/tree/ISocketHole";
import SocketHole from "../../state/tree/SocketHole";
import gHoleCode from "./gHoleCode";
import IState from "../../interfaces/state/IState";
import gTreesStateCode from "./gTreesStateCode";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";


const gStSocketCode = {

    convertToSocketHole: (rawSocketHole: any): ISocketHole | null => {

        if (!rawSocketHole) {

            return null;
        }

        const socketHole: ISocketHole = new SocketHole(
            rawSocketHole.stSocketKey,
            rawSocketHole.stSocketText,
            rawSocketHole.overrideOption
        );

        return socketHole;
    },

    convertToStSocket: (rawStSocket: any): IStSocket | null => {

        if (!rawStSocket) {

            return null;
        }

        const stSocket: IStSocket = new StSocket(rawStSocket.key);
        stSocket.r = rawStSocket.r;
        stSocket.text = rawStSocket.text;

        return stSocket;
    },

    getLoadSocketsRequestBody: (state: IState): { body: any, callID: string } => {

        const tree: ITreeBase = state.branchesState.tree;
        
        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get sockets',
            state,
            tree.key as string,
            ActionType.GetSockets
        );

        const body: any = {
            key: tree.key as string,
            token: tree.token,
            action: ActionType.GetSockets
        };

        return {
            body,
            callID
        };
    },

    cloneSocket: (input: IStSocket | null): IStSocket | null => {

        if (!input) {

            return null;
        }

        const stSocket: IStSocket = new StSocket(input.key);
        stSocket.r = input.r;
        stSocket.text = input.text;

        return stSocket;
    },

    clearStSocketErrors: (stSocket: IStSocket): void => {

        stSocket.errors = [];
    },

    clearStSocketsErrors: (stSockets: Array<IStSocket>): void => {

        stSockets.forEach((stSocket: IStSocket) => {

            gStSocketCode.clearStSocketErrors(stSocket);
        });
    },

    setError: (
        stSocket: IStSocket,
        error: string): void => {

        if (!stSocket.errors.includes(error)) {
            stSocket.errors.push(error);
        }
    },

    validateStSocket: (stSocket: IStSocket): boolean => {

        if (stSocket.action === ActionType.DeleteStSocket) {
            // Don't need to validate anything for a delete.
            return true;
        }

        gStSocketCode.clearStSocketErrors(stSocket);

        if (U.isNullOrWhiteSpace(stSocket.text) === true) {

            gStSocketCode.setError(
                stSocket,
                ` Text cannot be empty. `
            );
        }

        return stSocket.errors.length === 0;
    },

    validateStSockets: (stSockets: Array<IStSocket>): boolean => {

        let valid: boolean = true;
        let distinctSocketTexts: any = {};

        stSockets.forEach((stSocket: IStSocket) => {

            valid = gStSocketCode.validateStSocket(stSocket)
                && valid;

            // Check that the socket texts are unique for this subtree
            if (distinctSocketTexts[stSocket.text] === true) {

                valid = false;
                distinctSocketTexts[stSocket.text] = false;

                gStSocketCode.setError(
                    stSocket,
                    "Duplicate socket.");
            }
            else {
                distinctSocketTexts[stSocket.text] = true;
            }
        });

        return valid;
    },

    checkStSocketsMatch: (
        stSocket1: IStSocket,
        stSocket2: IStSocket): boolean => {

        if (!stSocket1
            || !stSocket2) {

            return false;
        }

        if (stSocket1.key !== stSocket2.key
            || stSocket1.r !== stSocket2.r
            || stSocket1.text !== stSocket2.text
            || stSocket1.token !== stSocket2.token) {

            return false;
        }

        return true;
    },

    compareStSockets: (
        stSocket1: IStSocket,
        stSocket2: IStSocket): number => {

        if (stSocket1.key < stSocket2.key) {
            return -1;
        }
        else if (stSocket1.key > stSocket2.key) {
            return 1;
        }

        return 0;
    },

    checkStSocketListMatch: (
        stSockets1: Array<IStSocket>,
        stSockets2: Array<IStSocket>): boolean => {

        if (!stSockets1
            || !stSockets2) {

            return false;
        }

        const stSocketsFiltered1: Array<IStSocket> = gStSocketCode.getNonAutoAddedSockets(stSockets1);
        const stSocketsFiltered2: Array<IStSocket> = gStSocketCode.getNonAutoAddedSockets(stSockets2);

        if (stSocketsFiltered1.length !== stSocketsFiltered2.length) {

            return false;
        }

        stSocketsFiltered1.sort(gStSocketCode.compareStSockets);
        stSocketsFiltered2.sort(gStSocketCode.compareStSockets);
        let match: boolean = false;

        for (let i = 0; i < stSocketsFiltered1.length; i++) {

            match = gStSocketCode.checkStSocketsMatch(
                stSocketsFiltered1[i],
                stSocketsFiltered2[i]
            );

            if (!match) {

                return false;
            }
        }

        return true;
    },

    getNonAutoAddedSockets: (stSockets: Array<IStSocket>): Array<IStSocket> => {

        return stSockets.filter((stSocket: IStSocket) => !stSocket.ui.autoAdded);
    },

    cloneStSocket: (input: IStSocket): IStSocket => {

        const stSocket: IStSocket = new StSocket(input.key);
        stSocket.action = input.action;
        stSocket.r = input.r;
        stSocket.text = input.text;
        stSocket.token = input.token;

        stSocket.holes = gHoleCode.cloneHoles(
            input.holes,
            false
        );

        return stSocket;
    },

    cloneStSockets: (stSockets: Array<IStSocket>): Array<IStSocket> => {

        const output: Array<IStSocket> = [];

        stSockets.forEach((stSocket: IStSocket) => {

            output.push(gStSocketCode.cloneStSocket(stSocket));
        });

        return output;
    },

    getSocketsBody: (stSockets: Array<IStSocket>): any => {

        const output: any[] = [];

        stSockets.forEach((stSocket: IStSocket) => {

            output.push(gStSocketCode.getSocketBody(stSocket));
        });

        return output;
    },

    getSocketBody: (stSocket: IStSocket): any => {

        return {
            key: stSocket.key,
            r: stSocket.r,
            text: stSocket.text,
            action: stSocket.action,
            holes: gHoleCode.getHolesBody(stSocket.holes)
        };
    },

    loadStSocket: (rawStSocket: any): IStSocket => {

        const stSocket: IStSocket = new StSocket(rawStSocket.key);
        stSocket.r = rawStSocket.r;
        stSocket.text = rawStSocket.text;
        stSocket.holes = gHoleCode.loadHoles(rawStSocket.holes);

        return stSocket;
    },

    loadStSockets: (rawSockets: any[]): Array<IStSocket> => {

        const stSockets: Array<IStSocket> = [];
        let stSocket: IStSocket;

        rawSockets.forEach((rawSocket: any) => {

            stSocket = gStSocketCode.loadStSocket(rawSocket);
            stSockets.push(stSocket);
        });

        return stSockets;
    }
};

export default gStSocketCode;

