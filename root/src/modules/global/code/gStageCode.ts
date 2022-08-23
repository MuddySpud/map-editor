import IState from "../../interfaces/state/IState";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import INode from "../../interfaces/state/tree/INode";
import { LensStage } from "../../interfaces/enums/LensStage";
import Stages from "../../state/ui/Stages";
import { StageTitle } from "../../interfaces/enums/StageTitle";
import IStageBehaviour from "../../interfaces/behaviours/IStageBehaviour";
import StageBehaviour from "../../behaviours/StageBehaviour";
import { NodeType } from "../../interfaces/enums/NodeType";
import IBranchTask from "../../interfaces/state/tree/IBranchTask";
import IBranchTreeTask from "../../interfaces/state/tree/IBranchTreeTask";
import BranchTaskStageBehaviour from "../../behaviours/BranchTaskStageBehaviour";
import BranchTreeTaskStageBehaviour from "../../behaviours/BranchTreeTaskStageBehaviour";
import SocketTaskStageBehaviour from "../../behaviours/SocketTaskStageBehaviour";
import ISocketTask from "../../interfaces/state/tree/ISocketTask";
import SwapSubtreeLinkStageBehaviour from "../../behaviours/SwapSubtreeLinkStageBehaviour";
import CreateSubtreeLinkStageBehaviour from "../../behaviours/CreateSubtreeLinkStageBehaviour";
import CreateSubtreeAndLinkStageBehaviour from "../../behaviours/CreateSubtreeAndLinkStageBehaviour";


const gStageCode = {

    buildStages: (state: IState): IStageBehaviour => {

        if (!state
            || !state.lens.nodeTab.lensNode) {

            return gStageCode.buildBlank();
        }

        if (state.lens.nodeTab.stageBehaviour) {

            const stageBehaviour: IStageBehaviour = state.lens.nodeTab.stageBehaviour as IStageBehaviour;

            if (stageBehaviour.stages.replacement !== StageTitle.None) {

                return gStageCode.buildNodeStagesFromTitle(
                    state,
                    stageBehaviour.stages.replacement);
            }
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode as INode<ILensUI>;

        if (lensNode.isSocket === true) {

            if (!state.lens.nodeTab.lensSocketTask) {

                throw new Error("lensSocketTask cannot be null if lensNode is a socket");
            }

            return gStageCode.buildMarkSocketStages(state.lens.nodeTab.lensSocketTask);
        }
        else if (lensNode.type === NodeType.Discussion
            || lensNode.type === NodeType.Solution
            || lensNode.isRoot === true) {

            return gStageCode.buildEditNodeStages();
        }
        else if (lensNode.isLink === true) {

            if (!lensNode.link) {

                return gStageCode.buildEditNodeStages();
            }
            else {

                return gStageCode.buildEditSubtreeLinkStages();
            }
        }
        else if (lensNode.isStashRoot === true) {

            return gStageCode.buildEditStashStages();
        }
        else {

            alert("StageTitle not built yet...");
        }

        return gStageCode.buildBlank();
    },

    buildNodeStagesFromTitle: (
        state: IState,
        stageTitle: StageTitle): IStageBehaviour => {

        if (stageTitle === StageTitle.LensEditNode) {

            return gStageCode.buildEditNodeStages();
        }
        if (stageTitle === StageTitle.LensCreateNode) {

            return gStageCode.buildCreateNodeStages();
        }
        else if (stageTitle === StageTitle.LensCreateSubtreeLink) {

            return gStageCode.buildCreateSubtreeLinkStages(state.lens.nodeTab.lensNode as INode<ILensUI>);
        }
        else if (stageTitle === StageTitle.LensEditSubtreeLink) {

            return gStageCode.buildEditSubtreeLinkStages();
        }
        else if (stageTitle === StageTitle.LensCreateSubtreeAndLink) {

            return gStageCode.buildCreateSubtreeAndLinkStages(state.lens.nodeTab.lensNode as INode<ILensUI>);
        }
        else if (stageTitle === StageTitle.LensMarkSocket
            || stageTitle === StageTitle.LensEditHole) {

            return gStageCode.buildMarkSocketStages(state.lens.nodeTab.lensSocketTask as ISocketTask);
        }
        else if (stageTitle === StageTitle.LensSearchNodes) {

            return gStageCode.buildSearchNodeStages();
        }
        else if (stageTitle === StageTitle.LensMoveBranch) {

            return gStageCode.buildMoveBranchStages(state.lens.nodeTab.lensBranchTask as IBranchTask);
        }
        else if (stageTitle === StageTitle.LensCloneBranch) {

            return gStageCode.buildCloneBranchStages(state.lens.nodeTab.lensBranchTask as IBranchTask);
        }
        else if (stageTitle === StageTitle.LensBranchToSubtree) {

            return gStageCode.buildBranchToSubtreeStages(state.lens.nodeTab.lensBranchTreeTask as IBranchTreeTask);
        }

        throw new Error(`StageTitle: ${stageTitle}, not built yet...`);
    },

    setNodeReplacement: (
        state: IState,
        stageTitle: StageTitle): void => {

        state.lens.nodeTab.stageBehaviour = new StageBehaviour(
            new Stages(
                stageTitle,
                []
            ));

        state.lens.nodeTab.stageBehaviour.stages.replacement = stageTitle;
    },

    buildEditNodeStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensEditNode,
                [LensStage.NodeEdit]
            )
        );
    },

    buildEditStashStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensEditNode,
                [LensStage.NodeEdit]
            )
        );
    },

    buildCreateNodeStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensCreateNode,
                [LensStage.NodeCreate]
            )
        );
    },

    buildCreateStashStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensCreateNode,
                [LensStage.NodeCreate]
            )
        );
    },

    buildEditSubtreeLinkStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensEditSubtreeLink,
                [
                    LensStage.SubtreeEdit,
                ]
            )
        );
    },

    buildCreateSubtreeLinkStages: (lensNode: INode<ILensUI>): IStageBehaviour => {

        return new CreateSubtreeLinkStageBehaviour(
            new Stages(
                StageTitle.LensCreateSubtreeLink,
                [
                    LensStage.SearchInput,
                    LensStage.SearchResults,
                    LensStage.SubtreeLinkCreate
                ]
            ),
            lensNode
        );
    },

    buildCreateSubtreeAndLinkStages: (lensNode: INode<ILensUI>): IStageBehaviour => {

        return new CreateSubtreeAndLinkStageBehaviour(
            new Stages(
                StageTitle.LensCreateSubtreeAndLink,
                [
                    LensStage.CreateTree,
                    LensStage.CreateSubtree,
                    LensStage.SubtreeAndLinkCreate
                ]
            ),
            lensNode
        );
    },

    buildSwapSubtreeLinkStages: (lensNode: INode<ILensUI>): IStageBehaviour => {

        return new SwapSubtreeLinkStageBehaviour(
            new Stages(
                StageTitle.LensSwapSubtreeLink,
                [
                    LensStage.SearchInput,
                    LensStage.SearchResults,
                    LensStage.Plugs,
                    LensStage.SubtreeLinkSwap
                ]
            ),
            lensNode
        );
    },

    buildSearchNodeStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensSearchNodes,
                [
                    LensStage.SearchInput,
                    LensStage.SearchResults
                ]
            )
        );
    },

    buildFilterTreeStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensFilterTrees,
                [
                    LensStage.SearchInput
                ]
            )
        );
    },

    buildFilterBotStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensFilterBots,
                [
                    LensStage.SearchInput
                ]
            )
        );
    },

    buildMoveBranchStages: (branchTask: IBranchTask): IStageBehaviour => {

        return new BranchTaskStageBehaviour(
            new Stages(
                StageTitle.LensMoveBranch,
                [
                    LensStage.SelectBranchTaskOption,
                    LensStage.SelectBranchTaskTarget,
                    LensStage.EditMoveBranch
                ]
            ),
            branchTask
        );
    },

    buildCloneBranchStages: (branchTask: IBranchTask): IStageBehaviour => {

        return new BranchTaskStageBehaviour(
            new Stages(
                StageTitle.LensCloneBranch,
                [
                    LensStage.SelectBranchTaskOption,
                    LensStage.SelectBranchTaskTarget,
                    LensStage.EditCloneBranch
                ]
            ),
            branchTask
        );
    },

    buildMoveToHereStages: (branchTask: IBranchTask): IStageBehaviour => {

        return new BranchTaskStageBehaviour(
            new Stages(
                StageTitle.LensMoveBranch,
                [
                    LensStage.SelectBranchTaskTarget,
                    LensStage.SelectBranchTaskOption,
                    LensStage.EditMoveBranch
                ]
            ),
            branchTask
        );
    },

    buildCloneToHereStages: (branchTask: IBranchTask): IStageBehaviour => {

        return new BranchTaskStageBehaviour(
            new Stages(
                StageTitle.LensCloneBranch,
                [
                    LensStage.SelectBranchTaskTarget,
                    LensStage.SelectBranchTaskOption,
                    LensStage.EditCloneBranch
                ]
            ),
            branchTask
        );
    },

    buildStashBranchStages: (branchTask: IBranchTask): IStageBehaviour => {

        return new BranchTaskStageBehaviour(
            new Stages(
                StageTitle.LensStashBranch,
                [
                    LensStage.SelectBranchTaskOption,
                    LensStage.SelectStashAction
                ]
            ),
            branchTask
        );
    },

    buildBranchToSubtreeStages: (branchTreeTask: IBranchTreeTask): IStageBehaviour => {

        return new BranchTreeTaskStageBehaviour(
            new Stages(
                StageTitle.LensBranchToSubtree,
                [
                    LensStage.SelectBranchTaskOption,
                    LensStage.CreateTree,
                    LensStage.CreateSubtree,
                    LensStage.CreateSubtreeLowerBoundaries,
                    LensStage.SelectBranchTaskLimit,
                    LensStage.ReviewBranchToSubtree
                ]
            ),
            branchTreeTask
        );
    },

    buildMarkSocketStages: (socketTask: ISocketTask): IStageBehaviour => {

        return new SocketTaskStageBehaviour(
            new Stages(
                StageTitle.LensMarkSocket,
                [
                    LensStage.CreateSubtree,
                    LensStage.MarkSocket
                ]
            ),
            socketTask
        );
    },

    buildSettingsStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensSettings,
                [
                    LensStage.SettingsEdit
                ]
            )
        );
    },

    buildViewSettingsStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensViewSettings,
                [
                    LensStage.ViewSettingsEdit,
                ]
            )
        );
    },

    buildValidationStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensValidations,
                [
                    LensStage.ShowBranchesValidation,
                ]
            )
        );
    },

    buildNotificationStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensNotification,
                [
                    LensStage.ShowNotifications,
                ]
            )
        );
    },

    buildEditaliasestages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensEditAlias,
                [
                    LensStage.AliasEdit,
                ]
            ),
            true
        );
    },

    buildEditTreeStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensEditTree,
                [
                    LensStage.TreeEdit,
                ]
            ),
            true
        );
    },

    buildCloneTreeStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensCloneTree,
                [
                    LensStage.TreeClone,
                ]
            ),
            true
        );
    },

    buildTreeHistoryStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensTreeHistory,
                [
                    LensStage.TreeHistory,
                ]
            )
        );
    },

    buildSubtreeShapeStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensSubtreeShape,
                [
                    LensStage.SubtreeShape,
                ]
            )
        );
    },

    buildSubtreeSpreadStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensSubtreeSpread,
                [
                    LensStage.SubtreeSpread,
                ]
            )
        );
    },

    buildTreeTagsStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensTreeTags,
                [
                    LensStage.TreeTags,
                ]
            )
        );
    },

    buildCreateTreeStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensCreateTree,
                [
                    LensStage.TreeEdit,
                ]
            ),
            true
        );
    },

    buildCreateAliasStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensCreateAlias,
                [
                    LensStage.AliasEdit,
                ]
            ),
            true
        );
    },

    buildCreateSubtreeStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensCreateSubtree,
                [
                    LensStage.SubtreeEdit,
                ]
            ),
            true
        );
    },

    buildEditSubtreeStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensEditSubtree,
                [
                    LensStage.SubtreeEdit,
                ]
            ),
            true
        );
    },

    buildTreeHubStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensTreeHub,
                [
                    LensStage.TreeHub,
                ]
            )
        );
    },

    buildSubtreeHubStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensSubtreeHub,
                [
                    LensStage.SubtreeHub,
                ]
            )
        );
    },

    buildPublishHubStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensPublish,
                [
                    LensStage.BotHub,
                ]
            )
        );
    },


    buildBotAliasHubStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensAliasHub,
                [
                    LensStage.BotHub,
                ]
            )
        );
    },

    buildBotDraftHubStages: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.LensDraftHub,
                [
                    LensStage.BotHub,
                ]
            )
        );
    },

    buildBlank: (): IStageBehaviour => {

        return new StageBehaviour(
            new Stages(
                StageTitle.None,
                [
                    LensStage.None,
                ]
            )
        );
    }
};

export default gStageCode;

