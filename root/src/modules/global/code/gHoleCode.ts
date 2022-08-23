import IHole from "../../interfaces/state/tree/IHole";
import gNodeCode from "./gNodeCode";
import ISocketLoaderUI from "../../interfaces/state/ui/UIs/ISocketLoaderUI";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import SocketLoaderUI from "../../state/ui/UIs/SocketLoaderUI";
import IStSocket from "../../interfaces/state/tree/IStSocket";
import IState from "../../interfaces/state/IState";
import IBranchTreeTask from "../../interfaces/state/tree/IBranchTreeTask";
import ISubtreeLoader from "../../interfaces/state/tree/ISubtreeLoader";
import gBranchesStateCode from "./gBranchesStateCode";
import U from "../gUtilities";
import gStSocketCode from "./gStSocketCode";
import ISocketLoader from "../../interfaces/state/tree/ISocketLoader";
import { ActionType } from "../../interfaces/enums/ActionType";


const gHoleCode = {

    cloneHoles: (
        inputHoles: Array<IHole<ISocketLoaderUI>>,
        cloneLink: boolean = true): Array<IHole<ISocketLoaderUI>> => {

        const holes: Array<IHole<ISocketLoaderUI>> = [];
        let node: INodeBase;
        let hole: IHole<ISocketLoaderUI>;

        inputHoles.forEach((inputHole: IHole<ISocketLoaderUI>) => {

            node = gNodeCode.cloneNodeBase(
                inputHole,
                cloneLink);
            
            if (node) {

                hole = node as IHole<ISocketLoaderUI>;
                hole.ui = new SocketLoaderUI();
                holes.push(hole);
            }
        });

        return holes;
    },

    holeHasErrors: (hole: IHole<ISocketLoaderUI>): boolean => {

        if (hole.errors.length > 0) {
            return true;
        }

        return false;
    },

    validateLimits: (
        state: IState,
        branchTreeTask: IBranchTreeTask): boolean => {

        const subtreeLoader: ISubtreeLoader = branchTreeTask.subtreeLoader;
        const rootLoader: ISocketLoader = branchTreeTask.socketLoader;
        const sortedHoleKeys: Array<string> = gHoleCode.getSortedHoleKeys(subtreeLoader);
        let valid: boolean = true;
        let limitCount: number = 0;

        subtreeLoader.subtree.stSockets.forEach((stSocket: IStSocket) => {

            limitCount = 0;

            if (stSocket.holes.length === 0) {

                valid = false;

                gStSocketCode.setError(
                    stSocket,
                    'A socket must have at least one boundary'
                );
            }

            stSocket.holes.forEach((hole: IHole<ISocketLoaderUI>) => {

                if (hole.action === ActionType.MapLimitToSocket) {

                    ++limitCount;
                }

                valid = valid
                    && gHoleCode.validateLimit(
                        state,
                        rootLoader,
                        sortedHoleKeys,
                        hole
                    );
            });

            if (limitCount > 1) {

                valid = false;

                gStSocketCode.setError(
                    stSocket,
                    `A socket can be mapped to multiple holes but only have a single limit - as it can only lead to a single onward chain.`
                );
            }
        });

        return valid;
    },


    getSortedHoleKeys: (subtreeLoader: ISubtreeLoader): Array<string> => {

        let holeKeys: Array<string> = [];

        subtreeLoader.subtree.stSockets.forEach((stSocket: IStSocket) => {

            stSocket.holes.forEach((limit: IHole<ISocketLoaderUI>) => {

                holeKeys.push(limit.key as string);
            });
        });

        return holeKeys.sort();
    },

    buildLimitKeys: (
        sortedHoleKeys: Array<string>,
        key: string): Array<string> => {

        let limitKeys: Array<string> = [];

        sortedHoleKeys.forEach((holeKey: string) => {

            if (holeKey !== key) {

                limitKeys.push(holeKey);
            }
        });

        return limitKeys;
    },

    validateLimit: (
        state: IState,
        rootLoader: ISocketLoader,
        sortedHoleKeys: Array<string>,
        limit: IHole<ISocketLoaderUI>): boolean => {

        if (U.isPositiveNumeric(limit.key) === false) {

            gHoleCode.setError(
                limit,
                `The limit key is not a positive number. `
            );
        }

        if (U.isNullOrWhiteSpace(limit.key) === true) {

            gHoleCode.setError(
                limit,
                `The limit token is blank. `
            );
        }

        if (limit.isRoot === true) {

            gHoleCode.setError(
                limit,
                `Limit cannot be a root. `
            );
        }
        else if (limit.isLink === true) {

            gHoleCode.setError(
                limit,
                `Limit cannot be a link. `
            );
        }
        else if (limit.isPlug === true) {

            gHoleCode.setError(
                limit,
                `Limit cannot be a plug. `
            );
        }

        const limitKey: string = limit.key as string;
        let nextIndex: number = 0;

        for (let i = 0; i < sortedHoleKeys.length; i++) {

            if (sortedHoleKeys[i] === limitKey) {

                nextIndex = i + 1;

                if (nextIndex < sortedHoleKeys.length
                    && sortedHoleKeys[nextIndex] === limitKey) {

                    gHoleCode.setError(
                        limit,
                        `This option has been selected as a boundary more than once. `
                    );

                    break;
                }
            }
        }

        const limitKeys = gHoleCode.buildLimitKeys(
            sortedHoleKeys,
            limitKey
        );

        // Check if any existing limits are ancestors of the new limit
        gHoleCode.checkAncestorsForLimits(
            state,
            rootLoader.key,
            limit,
            limitKey,
            limitKeys
        );

        return limit.errors.length === 0;
    },

    checkAncestorsForLimits: (
        state: IState,
        rootKey: string,
        limit: IHole<ISocketLoaderUI>,
        limitKey: string,
        limitKeys: Array<string>): void => {

        const token: string = state.branchesState.tree.token as string;

        let parent: INodeBase | null = gBranchesStateCode.getRegisteredNode(
            state,
            token,
            limitKey);

        let node: INodeBase;
        let ancestorKey: string | undefined = undefined;

        while (parent) {

            node = parent;
            ancestorKey = limitKeys.find((key: string) => key === node.key);

            if (ancestorKey) {

                gHoleCode.setError(
                    limit,
                    `This option is a child of another limit, key: ${ancestorKey}. `
                );
            }

            parent = node.parent;

            if (parent
                && parent.key === rootKey) {

                // The limit is a descendant of the link
                return;
            }
        }

        gHoleCode.setError(
            limit,
            `This option is not a child of the chosen root. `
        );
    },

    setError: (
        hole: IHole<ISocketLoaderUI>,
        error: string): void => {

        if (!hole.errors.includes(error)) {
            hole.errors.push(error);
        }
    },

    cloneHole: (
        inputNode: INodeBase,
        cloneLink: boolean = true): IHole<ISocketLoaderUI> => {

        return gNodeCode.shallowCloneNode(
            SocketLoaderUI,
            inputNode,
            cloneLink
        );

    },

    getHolesBody: (holes: Array<IHole<ISocketLoaderUI>>): any => {

        const limits: any[] = [];

        holes.forEach((hole: IHole<ISocketLoaderUI>) => {

            limits.push(gHoleCode.getHoleBody(hole));
        });

        return limits;
    },

    getHoleBody: (hole: IHole<ISocketLoaderUI>): any => {

        return {
            key: hole.key,
            r: hole.r,
            action: hole.action
        };
    },

    loadHoles: (rawHoles: any[]): Array<IHole<ISocketLoaderUI>> => {

        const holes: Array<IHole<ISocketLoaderUI>> = [];

        if (!rawHoles
            || rawHoles.length === 0) {

            return holes;
        }

        let node: INodeBase | null;
        let hole: IHole<ISocketLoaderUI>;

        rawHoles.forEach((rawNode: any) => {

            node = gNodeCode.loadNodeShallow(rawNode);

            if (node) {

                hole = node as IHole<ISocketLoaderUI>;
                hole.ui = new SocketLoaderUI();
                holes.push(hole);
            }
        });

        return holes;
    }
};

export default gHoleCode;

