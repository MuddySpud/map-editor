import IShapeCase from "../../interfaces/state/cases/IShapeCase";
import gTreeCode from "./gTreeCode";
import ITreeSys from "../../interfaces/state/tree/ITreeSys";
import Shape from "../../state/tree/Shape";
import IShapeView from "../../interfaces/state/tree/IShapeView";
import ShapeView from "../../state/tree/ShapeView";
import ITokenCount from "../../interfaces/state/tree/ITokenCount";
import TokenCount from "../../state/tree/TokenCount";
import IShape from "../../interfaces/state/tree/IShape";
import IState from "../../interfaces/state/IState";
import gStateCode from "./gStateCode";
import { TabType } from "../../interfaces/enums/TabType";
import gLensCode from "./gLensCode";
import gTabCode from "./gTabCode";
import { ActionType } from "../../interfaces/enums/ActionType";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";
import gTreesStateCode from "./gTreesStateCode";


const gShapeCode = {

    clearShapeTab: (state: IState): void => {

        state.lens.shapeTab.display = false;
        state.lens.shapeTab.stageBehaviour.clear();
        state.lens.shapeTab.shapeCase = null;
    },

    showShapeTab: (state: IState): void => {

        state.lens.shapeTab.display = true;
        gLensCode.maximiseLens(state) === true;
    },

    showSelectedShapeTab: (state: IState): void => {

        gShapeCode.showShapeTab(state);

        gTabCode.setSelectedTab(
            state,
            TabType.Shape);
    },

    getSubtreeShapeRequestBody: (
        state: IState,
        tree: ITreeBase): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get shape',
            state,
            tree.key as string,
            ActionType.GetSubtreeShape
        );

        const body: any = {
            key: tree.key,
            token: tree.token,
            action: ActionType.GetSubtreeShape
        };

        return {
            body,
            callID
        };
    },

    loadShapeCase: (
        state: IState,
        rawShape: any,
        shapeCase: IShapeCase): void => {

        if (!rawShape
            || rawShape.length === 0) {
            return;
        }

        const rTrees: any[] = rawShape.trees;
        const rView: any[] = rawShape.view;
        const rRootToken: any = rawShape.rootToken;

        const trees: Array<ITreeSys> = gTreeCode.loadTrees(rTrees);
        const view: Array<IShapeView> = gShapeCode.loadViews(rView);

        const getTree = (token: string): ITreeSys => {

            const tree: ITreeSys | undefined = trees.find((tree: ITreeSys) => {

                return tree.token === token;
            });

            if (tree) {

                return tree;
            }

            throw new Error(`A tree with token: ${token} could not be found in the ShapeCase.trees.`);
        };

        const getView = (token: string): IShapeView => {

            const shapeView: IShapeView | undefined = view.find((shapeView: IShapeView) => {

                return shapeView.token === token;
            });

            if (shapeView) {

                return shapeView;
            }

            throw new Error(`A shapeTemplate with token: ${token} could not be found in the ShapeCase.view.`);
        };

        const loadRootShape = (
            state: IState,
            token: string): IShape => {

            const tree: ITreeSys = getTree(token);

            const rootShape = new Shape(
                gStateCode.getFreshKey(state),
                tree,
                1);

            loadSubShapes(
                state,
                rootShape);

            return rootShape;
        };

        const loadSubShapes = (
            state: IState,
            shape: IShape): IShape => {

            const shapeTemplate: IShapeView = getView(shape.tree.token as string);
            let subtree: ITreeSys;
            let subShape: IShape;

            shapeTemplate.subTokens.forEach((tokenCount: ITokenCount) => {

                subtree = getTree(tokenCount.token);

                subShape = new Shape(
                    gStateCode.getFreshKey(state),
                    subtree,
                    tokenCount.count);

                shape.subShapes.push(subShape);
            });

            shape.subShapes.forEach((subShape: IShape) => {

                loadSubShapes(
                    state,
                    subShape);
            });

            return shape;
        };

        shapeCase.shape = loadRootShape(
            state,
            rRootToken);
    },

    loadViews: (rawView: any[]): Array<IShapeView> => {

        const view: Array<IShapeView> = [];

        if (!rawView
            || rawView.length === 0) {
            return view;
        }

        let shapeTemplate: IShapeView | null;

        rawView.forEach((rawTemplate: any) => {

            shapeTemplate = gShapeCode.loadShapeTemplate(rawTemplate);

            if (shapeTemplate) {
                view.push(shapeTemplate);
            }
        });

        return view;
    },

    loadShapeTemplate: (rawTemplate: any): IShapeView | null => {

        if (!rawTemplate) {
            return null;
        }

        const tokenCounts: Array<ITokenCount> = gShapeCode.loadTokenCounts(rawTemplate.subTokens);

        const shapeTemplate: IShapeView = new ShapeView(
            rawTemplate.token,
            tokenCounts
        );

        return shapeTemplate;
    },

    loadTokenCounts: (rawTokenCounts: any[]): Array<ITokenCount> => {

        const tokenCounts: Array<ITokenCount> = [];

        if (!rawTokenCounts
            || rawTokenCounts.length === 0) {
            return tokenCounts;
        }

        let tokenCount: ITokenCount | null;

        rawTokenCounts.forEach((rawTokenCount: any) => {

            tokenCount = gShapeCode.loadTokenCount(rawTokenCount);

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
            rawTokenCount.subToken,
            rawTokenCount.count
        );
    }
};

export default gShapeCode;

