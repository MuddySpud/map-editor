import IState from "../../interfaces/state/IState";
import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import INode from "../../interfaces/state/tree/INode";
import gNodeCode from "./gNodeCode";
import gStateCode from "./gStateCode";
import gBranchesStateCode from "./gBranchesStateCode";
import gBlankAction from "../actions/gBlankAction";
import gTreesStateCode from "./gTreesStateCode";
import { ActionType } from "../../interfaces/enums/ActionType";


const gViewCode = {

    getLoadLiveViewRequestBody: (
        state: IState,
        treeKey: string): { body: any, callID: string } => {

        const callID: string = gTreesStateCode.registerTreeDataRequest(
            'Get live view',
            state,
            treeKey,
            ActionType.GetLiveView
        );

        const body: any = {

            key: treeKey,
            userKey: state.user.key,
            action: ActionType.GetLiveView
        };

        return {
            body,
            callID
        };
    },

    loadNodesAndReplaceRegistered: (
        state: IState,
        rawNodes: any): Array<INode<IBranchUI>> => {

        const loadedNodes = gViewCode.loadNodes(rawNodes);
        state.branchesState.registered = loadedNodes;

        return loadedNodes;
    },

    loadNodes: (rawNodes: any): Array<INode<IBranchUI>> => {

        if (!rawNodes) {

            return [];
        }

        const loadedNodes: Array<INode<IBranchUI>> = new Array<INode<IBranchUI>>();
        let node: INode<IBranchUI> | null;

        rawNodes.forEach((rawNode: any) => {

            node = gNodeCode.loadCompoundNode(rawNode);

            if (node) {

                node.ui.registered = true;
                loadedNodes.push(node);
            }
        });

        return loadedNodes;
    },

    getType: (ui: IBranchUI): string => {

        if (ui) {

            if (ui.selected === true) {

                return 's';
            }
            else if (ui.expanded === true) {

                return 'e';
            }
        }

        return 'c';
    },

    getView: (
        node: INode<IBranchUI>,
        viewNodes: Array<any>): void => {

        if (!node) {
            return;
        }

        let type: string = gViewCode.getType(node.ui);
        viewNodes.push({ k: node.key, t: type });

        gViewCode.getViewBranches(
            node.nodes,
            viewNodes);
    },

    queueCacheLiveView: (state: IState): void => {

        gStateCode.AddShortHttpRepeatEffect(
            state,
            `cacheView`,
            state.branchesState.tree.token,
            `${state.settings.apiUrl}/UserView`,
            gBranchesStateCode.getLiveViewForPUT,
            gBlankAction.responseAction);
    },

    getViewBranches: (
        nodes: Array<INode<IBranchUI>>,
        viewNodes: Array<any>): void => {

        if (!nodes
            || nodes.length === 0) {
            return;
        }

        let type: string;

        nodes.forEach((option: INode<IBranchUI>): void => {

            let getChildren: boolean = false;

            if (option.ui.selected === true) {
                type = 's';
                getChildren = true;
            }
            else if (option.ui.expanded === true) {

                if (option.ui.branchViewNodeControls === true) {
                    
                    type = 'c';
                }
                else {
                    type = 'e';
                    getChildren = true;
                }
            }
            else {
                type = 'c';
            }

            viewNodes.push({ k: option.key, t: type });

            if (getChildren) {

                gViewCode.getViewBranches(
                    option.nodes,
                    viewNodes);
            }
        });
    }
};

export default gViewCode;

