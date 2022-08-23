import IBranchUI from "../../interfaces/state/ui/UIs/IBranchUI";
import IState from "../../interfaces/state/IState";
import INode from "../../interfaces/state/tree/INode";
import IBranchTask from "../../interfaces/state/tree/IBranchTask";
import { ActionType } from "../../interfaces/enums/ActionType";
import BranchTask from "../../state/tree/BranchTask";
import U from "../gUtilities";
import INodeBase from "../../interfaces/state/tree/INodeBase";
import IStageBehaviour from "../../interfaces/behaviours/IStageBehaviour";
import { LensStage } from "../../interfaces/enums/LensStage";
import gNodeCode from "./gNodeCode";
import gOptionCode from "./gOptionCode";
import INodeLoader from "../../interfaces/state/tree/INodeLoader";
import gBranchesStateCode from "./gBranchesStateCode";
import gTreeCode from "./gTreeCode";
import ITabSave from "../../interfaces/state/ui/tabs/ITabSave";
import gSocketCode from "./gSocketCode";
import ISubtreeSys from "../../interfaces/state/tree/ISubtreeSys";
import gSubtreeCode from "./gSubtreeCode";
import IGlobalBranchFlags from "../../interfaces/state/ui/IGlobalBranchFlags";
import GlobalBranchFlags from "../../state/ui/GlobalBranchFlags";
import gBranchTreeTaskCode from "./gBranchTreeTaskCode";
import ITokenValidation from "../../interfaces/state/ui/ITokenValidation";
import INodeKeyValidation from "../../interfaces/state/ui/INodeKeyValidation";
import gTreesStateCode from "./gTreesStateCode";
import ITreeBase from "../../interfaces/state/tree/ITreeBase";


const gBranchTaskCode = {

    isTargetSelect: (
        state: IState,
        target: INode<IBranchUI>): boolean => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return false;
        }

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;
        const stage: LensStage = stageBehaviour.getStage();

        if (stage === LensStage.SelectBranchTaskTarget) {

            const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;

            gBranchTaskCode.setUpTarget(
                state,
                branchTask,
                target
            );

            return true;
        }

        return false;
    },

    setUpTarget: (
        state: IState,
        branchTask: IBranchTask,
        target: INode<IBranchUI>): void => {

        // This should only be called from a click select
        gBranchTaskCode.clearTarget(state);
        target.ui.branchTaskTarget = true;

        const clonedTarget: INode<IBranchUI> = gNodeCode.cloneNodeAndParentAndOptions(target);
        const targetLoader: INodeLoader = branchTask.targetLoader;
        targetLoader.token = clonedTarget.token as string;
        targetLoader.key = clonedTarget.key as string;
        targetLoader.node = clonedTarget;
        targetLoader.ui.recognised = true;
        gBranchTaskCode.disableClickSelect(targetLoader);

        if (branchTask.optionLoader.node) {

            branchTask.optionLoader.node.order = ((targetLoader.node.nodes.at(-1))?.order ?? 0) + 1;
        }
    },

    failedOptionRules: (
        state: IState,
        stage: LensStage): boolean => {

        if (gBranchTaskCode.failedSelectOptionRules(state, stage) === true) {

            return true;
        }

        return false;
    },

    failedSelectOptionRules: (
        state: IState,
        stage: LensStage): boolean => {

        if (!state.lens.nodeTab.lensBranchTask) {

            return false;
        }

        if (stage !== LensStage.SelectBranchTaskOption) {

            return false;
        }

        if (!state.lens.nodeTab.lensBranchTask.optionLoader) {

            return true;
        }

        // For LensStage.SelectBranchTaskOption the only reason to be here is to click another option
        // So check for clickSelect
        const optionLoader: INodeLoader = state.lens.nodeTab.lensBranchTask.optionLoader;

        if (optionLoader.ui.clickSelect === false) {

            return true;
        }

        return false;
    },

    failedTargetRules: (
        state: IState,
        option: INode<IBranchUI>): boolean => {

        if (gBranchTaskCode.failedSelectTargetRules(state, option) === true) {

            return true;
        }

        return false;
    },

    failedSelectTargetRules: (
        state: IState,
        option: INode<IBranchUI>): boolean => {

        if (!state.lens.nodeTab.lensBranchTask) {

            return false;
        }

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;
        const stage: LensStage = stageBehaviour.getStage();

        if (stage !== LensStage.SelectBranchTaskTarget) {

            return false;
        }

        if (!state.lens.nodeTab.lensBranchTask.targetLoader) {

            return true;
        }

        const targetLoader: INodeLoader = state.lens.nodeTab.lensBranchTask.targetLoader;

        if (targetLoader.ui.clickSelect === false) {
            // Then not trying to choose a target 
            return true;
        }

        if (gBranchTaskCode.parentIsOption(option) === true) {

            return true;
        }

        return false;
    },

    parentIsOption: (option: INode<IBranchUI>): boolean => {

        // Only for use in the branchesView as a rough rule - should check keys in validation
        let parent: INode<IBranchUI> | null = option.parent;

        while (parent) {

            if (parent.ui.branchTaskOption === true) {
                return true;
            }

            parent = parent.parent;
        }

        return false;
    },

    setUpOption: (
        state: IState,
        optionLoader: INodeLoader,
        option: INode<IBranchUI>): void => {

        // This should only be called from a click select
        gBranchTaskCode.clearOption(state);
        option.ui.branchTaskOption = true;

        const clonedOption: INode<IBranchUI> = gNodeCode.cloneNodeAndParentAndOptions(option);
        optionLoader.token = clonedOption.token as string;
        optionLoader.key = clonedOption.key as string;
        optionLoader.node = clonedOption;
        optionLoader.ui.recognised = true;
        gBranchTaskCode.disableClickSelect(optionLoader);
    },

    getLoadNodesRequestJson: (state: IState): any => {

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'Get options',
            state,
            state.branchesState.tree.key as string,
            ActionType.GetOptions,
            branchTask.optionLoader.key
        );

        const body: any = {
            fromToken: branchTask.optionLoader.token,
            fromKey: branchTask.optionLoader.key,
            toToken: branchTask.targetLoader.token,
            toKey: branchTask.targetLoader.key,
            action: ActionType.GetMoveBranches
        };

        return {
            body,
            callID
        };
    },

    clearTarget: (state: IState): void => {

        state.branchesState.registered.forEach((node: INode<IBranchUI>) => {

            if (node.ui.branchTaskTarget === true) {
                node.ui.branchTaskTarget = false;
            }
        });
    },

    clearOption: (state: IState): void => {

        const branchOptions: Array<INode<IBranchUI>> = gBranchTaskCode.getBranchOptions(state);

        branchOptions.forEach((node: INode<IBranchUI>) => {

            node.ui.branchTaskOption = false;
        });
    },

    getBranchOptions: (state: IState): Array<INode<IBranchUI>> => {

        const options: Array<INode<IBranchUI>> = [];

        state.branchesState.registered.forEach((node: INode<IBranchUI>) => {

            if (node.ui.branchTaskOption === true) {

                options.push(node);
            }
        });

        return options;
    },

    getBranchTargets: (state: IState): Array<INode<IBranchUI>> => {

        const targets: Array<INode<IBranchUI>> = [];

        state.branchesState.registered.forEach((node: INode<IBranchUI>) => {

            if (node.ui.branchTaskTarget === true) {

                targets.push(node);
            }
        });

        return targets;
    },

    highlightSelectOption: (
        state: IState,
        option: INodeLoader): boolean => {

        if (!state
            || !option) {
            return false;
        }

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;
        const stage: LensStage = stageBehaviour.getStage();

        return stage === LensStage.SelectBranchTaskOption
            && option.ui.clickSelect === true;
    },

    highlightSelectTarget: (
        state: IState,
        target: INodeLoader): boolean => {

        if (!state
            || !target) {
            return false;
        }

        const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;

        return stageBehaviour.getStage() === LensStage.SelectBranchTaskTarget
            && target.ui.clickSelect === true;
    },

    clearBranchTask: (state: IState): void => {

        gBranchTaskCode.clearOption(state);
        gBranchTaskCode.clearTarget(state);
        state.lens.nodeTab.lensBranchTask = null;
    },

    disableClickSelect: (nodeLoader: INodeLoader): void => {

        nodeLoader.ui.clickSelect = false;
    },

    forceSelect: (nodeLoader: INodeLoader): void => {

        nodeLoader.ui.forceSet = true;
    },

    enableClickSelect: (nodeLoader: INodeLoader): void => {

        nodeLoader.ui.clickSelect = true;
    },

    isLensBranchTaskDirty: (state: IState): boolean => {

        if (!state
            || !state.lens.nodeTab.lensBranchTask) {

            return false;
        }

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;
        const freshBranchTask: IBranchTask = new BranchTask();

        return branchTask.optionLoader !== freshBranchTask.optionLoader
            || branchTask.optionLoader.key !== freshBranchTask.optionLoader.key
            || branchTask.optionLoader.token !== freshBranchTask.optionLoader.token
            || branchTask.targetLoader !== freshBranchTask.targetLoader
            || branchTask.targetLoader.key !== freshBranchTask.targetLoader.key
            || branchTask.targetLoader.token !== freshBranchTask.targetLoader.token;

        return false;
    },

    clearErrors: (branchTask: IBranchTask): void => {

        gBranchTaskCode.clearNodeLoaderErrors(branchTask.optionLoader);
        gBranchTaskCode.clearNodeLoaderErrors(branchTask.targetLoader);
    },

    clearNodeLoaderErrors: (nodeLoader: INodeLoader): void => {

        if (nodeLoader.node) {
            nodeLoader.node.errors = [];
        }

        nodeLoader.errors = [];
    },

    hasErrors: (branchTask: IBranchTask): boolean => {

        return gBranchTaskCode.nodeLoaderHasErrors(branchTask.optionLoader)
            || gBranchTaskCode.nodeLoaderHasErrors(branchTask.targetLoader);
    },

    nodeLoaderHasErrors: (nodeLoader: INodeLoader): boolean => {

        if (nodeLoader.errors.length > 0) {
            return true;
        }

        return false;
    },

    setError: (
        nodeLoader: INodeLoader,
        error: string): void => {

        if (!nodeLoader.errors.includes(error)) {
            nodeLoader.errors.push(error);
        }
    },

    isComplete: (branchTask: IBranchTask): boolean => {

        return U.isNullOrWhiteSpace(branchTask.optionLoader.key) === false
            && U.isNullOrWhiteSpace(branchTask.optionLoader.token) === false
            && U.isNullOrWhiteSpace(branchTask.targetLoader.key) === false
            && U.isNullOrWhiteSpace(branchTask.targetLoader.token) === false;
    },

    validateOption: (optionLoader: INodeLoader): void => {

        if (!optionLoader.node) {
            return;
        }

        const option: INodeBase = optionLoader.node;

        if (option.isRoot === true) {

            gBranchTaskCode.setError(
                optionLoader,
                `Option cannot be a root. `
            );
        }
        else if (option.isPlug === true) {

            gBranchTaskCode.setError(
                optionLoader,
                `Option cannot be a plug. `
            );
        }
    },

    validateTarget: (
        branchTask: IBranchTask,
        treeToken: string): void => {

        const targetLoader: INodeLoader = branchTask.targetLoader;
        const optionLoader: INodeLoader = branchTask.optionLoader;

        if (!targetLoader.node) {
            return;
        }

        const target: INodeBase = targetLoader.node;

        if (target.isLink === true) {

            gBranchTaskCode.setError(
                targetLoader,
                `Target cannot be a link.`
            );
        }


        if (targetLoader.token === branchTask.optionLoader.token
            && targetLoader.key === branchTask.optionLoader.key) {

            gBranchTaskCode.setError(
                targetLoader,
                `Option and target cannot be the same.`
            );
        }

        if (target.isSocket === true) {

            gBranchTaskCode.setError(
                targetLoader,
                `Target cannot be a socket.`
            );
        }

        // If the option and target are on the current tree then 
        // we can do ancestor validation - otherwise will leave it to the 
        // database
        if (optionLoader.token === targetLoader.token
            && optionLoader.token === treeToken) {

            if (gBranchesStateCode.ancestorKeyMatchesKey(
                target,
                optionLoader.key)) {

                gBranchTaskCode.setError(
                    branchTask.targetLoader,
                    `Option cannot be an ancestor of the target.`
                );
            }
        }
    },

    validateBranchTask: (state: IState): boolean => {

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;
        gBranchTaskCode.clearErrors(branchTask);
        gBranchTaskCode.validateOptionLoader(branchTask.optionLoader);

        gBranchTaskCode.validateTargetLoader(
            state,
            branchTask);

        return gBranchTaskCode.hasErrors(branchTask) === false
            && gBranchTaskCode.validateInsert(branchTask) === true;
    },

    validateOptionLoader: (
        optionLoader: INodeLoader,
        validateToken: boolean = true): void => {

        gBranchTaskCode.validateNodeLoader(
            optionLoader,
            'Option',
            validateToken);

        gBranchTaskCode.validateOption(optionLoader);
    },

    validateTargetLoader: (
        state: IState,
        branchTask: IBranchTask): void => {

        gBranchTaskCode.validateNodeLoader(branchTask.targetLoader, 'Target');

        if (branchTask.targetLoader.token !== state.branchesState.tree.token) {

            gBranchTaskCode.setError(
                branchTask.targetLoader,
                `Cannot set a target on another tree. `
            );
        }

        gBranchTaskCode.validateTarget(
            branchTask,
            state.branchesState.tree.token as string);
    },

    validateNodeLoader: (
        nodeLoader: INodeLoader,
        loaderType: string,
        validateToken: boolean = true): void => {

        if (U.isNullOrWhiteSpace(nodeLoader.key) === true) {

            gBranchTaskCode.setError(
                nodeLoader,
                `${loaderType}Key cannot be empty. `
            );
        }

        if (validateToken
            && U.isNullOrWhiteSpace(nodeLoader.token) === true) {

            gBranchTaskCode.setError(
                nodeLoader,
                `${loaderType}Token cannot be empty. `
            );
        }
    },

    getMoveBranchTaskForPost: (state: IState): { body: any, callID: string } => {

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'Move branch',
            state,
            state.branchesState.tree.key as string,
            branchTask.action,
            branchTask.optionLoader.key
        );

        const option = branchTask.optionLoader.node as INodeBase;

        const body: any = {
            fromKey: branchTask.optionLoader.key,
            toKey: branchTask.targetLoader.key,
            fromToken: branchTask.optionLoader.token,
            toToken: branchTask.targetLoader.token,
            optionOrder: option.order,
            optionText: option.option,
            action: branchTask.action
        };

        return {
            body,
            callID
        };
    },

    getCloneBranchTaskForPost: (state: IState): { body: any, callID: string } => {

        const branchTask: IBranchTask = state.lens.nodeTab.lensBranchTask as IBranchTask;

        const callID: string = gTreesStateCode.registerNodeDataRequest(
            'Clone branch',
            state,
            state.branchesState.tree.key as string,
            branchTask.action,
            branchTask.optionLoader.key
        );

        const option = branchTask.optionLoader.node as INodeBase;

        const body: any = {
            fromKey: branchTask.optionLoader.key,
            toKey: branchTask.targetLoader.key,
            fromToken: branchTask.optionLoader.token,
            toToken: branchTask.targetLoader.token,
            optionOrder: option.order,
            optionText: option.option,
            action: branchTask.action
        };

        return {
            body,
            callID
        }
    },

    validateInsert: (branchTask: IBranchTask): boolean => {

        if (!branchTask.targetLoader.node
            || !branchTask.optionLoader.node) {
            return true;
        }

        const target: INodeBase = branchTask.targetLoader.node;
        const moved: INodeBase = branchTask.optionLoader.node;

        gNodeCode.clearErrors(moved);

        let option: INodeBase;
        let length: number = target.nodes.length;

        let success = gOptionCode.validateOption(
            moved,
            length);

        if (moved.order > length + 1) {

            gNodeCode.setError(
                moved,
                `Order cannot be higher than the count of options on the target after insertion.`
            );
        }

        for (let i = 0; i < length; i++) {

            option = target.nodes[i];

            if (!option.isHidden
                && option.option === moved.option) {

                success = false;

                gNodeCode.setError(
                    moved,
                    "Duplicate option."
                );
            }
        }

        return success;
    },

    validateTabForSelectBranchTarget: (
        state: IState,
        tab: ITabSave,
        branchTask: IBranchTask): void => {

        const targetLoader: INodeLoader = branchTask.targetLoader;
        gBranchTaskCode.clearNodeLoaderErrors(targetLoader);

        gBranchTaskCode.validateTargetLoader(
            state,
            branchTask);

        if (gBranchTaskCode.nodeLoaderHasErrors(targetLoader) === true) {

            tab.enableSave = false;
        }

        if (U.isNullOrWhiteSpace(targetLoader.key) === false) {

            gBranchTaskCode.checkNodeAppearsInTree(
                state,
                tab,
                targetLoader,
                'discusssion'
            );
        }
        else {
            tab.enableSave = false;
        }
    },

    validateTabForSelectBranchOption: (
        state: IState,
        tab: ITabSave,
        optionLoader: INodeLoader): void => {

        tab.enableSave = true;
        gBranchTaskCode.clearNodeLoaderErrors(optionLoader);

        gBranchTaskCode.validateOptionLoader(
            optionLoader,
            false);

        if (gBranchTaskCode.nodeLoaderHasErrors(optionLoader) === true) {

            tab.enableSave = false;
        }

        if (optionLoader.token !== state.branchesState.tree.token) {

            const tokenErrors = gTreeCode.getTokenErrors(
                state,
                optionLoader.token);

            if (tokenErrors.length > 0) {

                tab.enableSave = false;
            }

            const keyErrors = gNodeCode.isNodeKeyValid(
                state,
                optionLoader.token,
                optionLoader.key);

            if (keyErrors.length > 0) {

                tab.enableSave = false;
            }

            gBranchTaskCode.checkNodeRecognised(
                state,
                optionLoader
            );
        }
        else if (U.isNullOrWhiteSpace(optionLoader.token) === false
            && U.isNullOrWhiteSpace(optionLoader.key) === false) {

            gBranchTaskCode.checkNodeAppearsInTree(
                state,
                tab,
                optionLoader,
                'option'
            );
        }
        else {
            tab.enableSave = false;
        }
    },

    checkNodeAppearsInTree: (
        state: IState,
        tab: ITabSave,
        nodeLoader: INodeLoader,
        nodeType: string): any => {

        const found: INode<IBranchUI> | null = gBranchesStateCode.getTreeNodeFromKey(
            state,
            nodeLoader.key as string
        );

        const errorMessage = `Key does not match any tree ${nodeType}s`;
        const errors = nodeLoader.errors;

        if (found) {

            nodeLoader.ui.recognised = true;
            tab.enableSave = true;

            for (let i = errors.length - 1; i >= 0; i--) {

                if (errors[i] === errorMessage) {

                    errors.splice(i, 1);
                }
            }

            return;
        }

        if (!errors.includes(errorMessage)) {

            errors.push(errorMessage);
        }

        nodeLoader.ui.recognised = false;
        tab.enableSave = false;
    },

    checkNodeRecognised: (
        state: IState,
        nodeLoader: INodeLoader): void => {

        nodeLoader.ui.recognised = false;
        const token: string = nodeLoader.token;
        const key: string = nodeLoader.key;
        const tokenValidation: ITokenValidation = state.lens.validationResults.treeToken;

        if (tokenValidation.value === token
            && tokenValidation.success === true) {

            const nodeKeyValidation: INodeKeyValidation = state.lens.validationResults.nodeKey;

            nodeLoader.ui.recognised = nodeKeyValidation.token === token
                && nodeKeyValidation.key === key
                && nodeKeyValidation.success === true;
        }
    },

    validateTabForNewTree: (
        state: IState,
        tab: ITabSave,
        tree: ITreeBase): void => {

        tab.enableSave = gTreeCode.isNewTreeValid(
            state,
            tree
        );
    },

    validateTabForNewSubTree: (
        tab: ITabSave,
        subtree: ISubtreeSys): void => {

        tab.enableSave = gSubtreeCode.isNewSubtreeValid(subtree);
    },

    validateTabForBranchTask: (
        state: IState,
        tab: ITabSave): void => {

        tab.enableSave = gBranchTaskCode.validateBranchTask(state);
    },

    validateTabForPluging: (
        state: IState,
        tab: ITabSave): void => {

        tab.enableSave = gSocketCode.validatePlug(state);
    },

    getGlobalBranchFlags: (state: IState): IGlobalBranchFlags => {

        const branchTask: IBranchTask | null = state.lens.nodeTab.lensBranchTask;

        if (branchTask) {

            const globalBranchFlags: IGlobalBranchFlags = new GlobalBranchFlags();
            globalBranchFlags.option = gBranchTaskCode.highlightSelectOption(state, branchTask.optionLoader);
            globalBranchFlags.target = gBranchTaskCode.highlightSelectTarget(state, branchTask.targetLoader);

            return globalBranchFlags;
        }
        else {

            return gBranchTreeTaskCode.getGlobalBranchFlags(state);
        }
    }
};

export default gBranchTaskCode;