import ISpreadCase from "../../interfaces/state/cases/ISpreadCase";
import gTreeCode from "./gTreeCode";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import Spread from "../../state/tree/Spread";
import ISpreadView from "../../interfaces/state/tree/IShapeView";
import SpreadView from "../../state/tree/ShapeView";
import ITokenCount from "../../interfaces/state/tree/ITokenCount";
import TokenCount from "../../state/tree/TokenCount";
import ISpread from "../../interfaces/state/tree/ISpread";
import IState from "../../interfaces/state/IState";
import gStateCode from "./gStateCode";
import { TabType } from "../../interfaces/enums/TabType";
import gLensCode from "./gLensCode";
import gTabCode from "./gTabCode";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import gTreesStateCode from "./gTreesStateCode";
import { ActionType } from "../../interfaces/enums/ActionType";


const gSpreadCode = {

    clearSpreadTab: (state: IState): void => {

        state.lens.spreadTab.display = false;
        state.lens.spreadTab.stageBehaviour.clear();
        state.lens.spreadTab.spreadCase = null;
    },

    showSpreadTab: (state: IState): void => {

        state.lens.spreadTab.display = true;
        gLensCode.maximiseLens(state) === true;
    },

    showSelectedSpreadTab: (state: IState): void => {

        gSpreadCode.showSpreadTab(state);

        gTabCode.setSelectedTab(
            state,
            TabType.Spread);
    },

    getSubtreeSpreadRequestBody: (
        state: IState,
        tree: ITreeBase): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get spread',
            state,
            tree.key as string,
            ActionType.GetSubtreeSpread
        );

        const body: any = {
            key: tree.key,
            token: tree.token,
            action: ActionType.GetSubtreeSpread
        };

        return {
            body,
            callID
        };
    },

    loadSpreadCase: (
        state: IState,
        rawSpread: any,
        spreadCase: ISpreadCase): void => {

        if (!rawSpread
            || rawSpread.length === 0) {
            return;
        }

        const rTrees: any[] = rawSpread.trees;
        const rView: any[] = rawSpread.view;
        const rRootToken: any = rawSpread.rootToken;

        const trees: Array<ITreeSys> = gTreeCode.loadTrees(rTrees);
        const view: Array<ISpreadView> = gSpreadCode.loadViews(rView);

        const getTree = (token: string): ITreeSys => {

            const tree: ITreeSys | undefined = trees.find((tree: ITreeSys) => {

                return tree.token === token;
            });

            if (tree) {

                return tree;
            }

            throw new Error(`A tree with token: ${token} could not be found in the SpreadCase.trees.`);
        };

        const getView = (token: string): ISpreadView => {

            const spreadView: ISpreadView | undefined = view.find((spreadView: ISpreadView) => {

                return spreadView.token === token;
            });

            if (spreadView) {

                return spreadView;
            }

            throw new Error(`A spreadTemplate with token: ${token} could not be found in the SpreadCase.view.`);
        };

        const loadRootSpread = (
            state: IState,
            token: string): ISpread => {

            const tree: ITreeSys = getTree(token);

            const rootSpread = new Spread(
                gStateCode.getFreshKey(state),
                tree,
                1);

            loadSubSpreads(
                state,
                rootSpread);

            return rootSpread;
        };

        const loadSubSpreads = (
            state: IState,
            spread: ISpread): ISpread => {

            const spreadTemplate: ISpreadView = getView(spread.tree.token as string);
            let subtree: ITreeSys;
            let subSpread: ISpread;

            spreadTemplate.subTokens.forEach((tokenCount: ITokenCount) => {

                subtree = getTree(tokenCount.token);

                subSpread = new Spread(
                    gStateCode.getFreshKey(state),
                    subtree,
                    tokenCount.count);

                spread.subSpreads.push(subSpread);
            });

            spread.subSpreads.forEach((subSpread: ISpread) => {

                loadSubSpreads(
                    state,
                    subSpread);
            });

            return spread;
        };

        spreadCase.spread = loadRootSpread(
            state,
            rRootToken);
    },

    loadViews: (rawView: any[]): Array<ISpreadView> => {

        const view: Array<ISpreadView> = [];

        if (!rawView
            || rawView.length === 0) {
            return view;
        }

        let spreadTemplate: ISpreadView | null;

        rawView.forEach((rawTemplate: any) => {

            spreadTemplate = gSpreadCode.loadSpreadTemplate(rawTemplate);

            if (spreadTemplate) {
                view.push(spreadTemplate);
            }
        });

        return view;
    },

    loadSpreadTemplate: (rawTemplate: any): ISpreadView | null => {

        if (!rawTemplate) {
            return null;
        }

        const tokenCounts: Array<ITokenCount> = gSpreadCode.loadTokenCounts(rawTemplate.tokens);

        const spreadTemplate: ISpreadView = new SpreadView(
            rawTemplate.subToken,
            tokenCounts
        );

        return spreadTemplate;
    },

    loadTokenCounts: (rawTokenCounts: any[]): Array<ITokenCount> => {

        const tokenCounts: Array<ITokenCount> = [];

        if (!rawTokenCounts
            || rawTokenCounts.length === 0) {
            return tokenCounts;
        }

        let tokenCount: ITokenCount | null;

        rawTokenCounts.forEach((rawTokenCount: any) => {

            tokenCount = gSpreadCode.loadTokenCount(rawTokenCount);

            if (tokenCount) {
                tokenCounts.push(tokenCount);
            }
        });

        return tokenCounts;
    },

    loadTokenCount: (rawTokenCount: any): ITokenCount | null => {

        if (!rawTokenCount) {
            return null;
        }

        return new TokenCount(
            rawTokenCount.token,
            rawTokenCount.count
        );
    }
};

export default gSpreadCode;

