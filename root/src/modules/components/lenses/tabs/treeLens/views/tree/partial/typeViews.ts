import ITreeBase from "../../../../../../../interfaces/state/tree/ITreeBase";
import treeActions from "../../../actions/treeActions";
import buttonViews from "../../../../../lens/views/buttonViews";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import { Children, VNode } from "hyperapp-local";


const typeViews = {

    buildFlatView: (tree: ITreeBase): VNode => {

        let text: string = "Branched tree";
        let tooltip: string = `Click to select a flat tree,
with no branches, just a root and leaves`;

        if (tree.isFlat === true) {

            text = 'Flat tree';
            tooltip = `Click to select a branched tree,
with a root, branches and leaves`;
        }

        return buttonViews.buildTypeButtonView(
            text,
            tooltip,
            CssClasses.yep,
            treeActions.toggleFlat
        );
    },

    buildLoopView: (tree: ITreeBase): VNode => {

        let text: string = "Loop tree";
        let tooltip: string = `Click to make this a loop tree`;
        let className: string = CssClasses.nope;

        if (tree.isLoop === true) {

            className = CssClasses.yep;
            tooltip = `Click to stop this being a loop tree`;
        }

        return buttonViews.buildTypeButtonView(
            text,
            tooltip,
            className,
            treeActions.toggleLoop
        );
    },

    buildPluginsView: (tree: ITreeBase): Children[] => {

        const view: Children[] = [

            typeViews.buildDiscussionPluginView(tree),
            typeViews.buildDiscussionPluginAudioView(tree),
            typeViews.buildOptionPluginView(tree),
        ];

        return view;
    },

    buildDiscussionPluginView: (tree: ITreeBase): VNode => {

        let className: string = CssClasses.nope;
        let tooltip: string = `Click to to enable discussion plugins for 
nodes in this tree`;

        if (tree.allowDiscussionPlugins === true) {

            className = CssClasses.yep;

            tooltip = `Click to to disable discussion plugins for 
nodes in this tree`;
        }

        return buttonViews.buildTypeButtonView(
            "Discussion plugins",
            tooltip,
            className,
            treeActions.toggleAllowDiscussionPlugins
        );
    },

    buildOptionPluginView: (tree: ITreeBase): VNode => {

        let className: string = CssClasses.nope;
        let tooltip: string = `Click to to enable option plugins for 
nodes in this tree`;

        if (tree.allowOptionPlugins === true) {

            className = CssClasses.yep;

            tooltip = `Click to to disable option plugins for 
nodes in this tree`;
        }

        return buttonViews.buildTypeButtonView(
            "Option plugins",
            tooltip,
            className,
            treeActions.toggleAllowOptionPlugins
        );
    },

    buildDiscussionPluginAudioView: (tree: ITreeBase): VNode | null => {

        if (!tree.allowDiscussionPlugins) {

            return null;
        }

        let className: string = CssClasses.nope;
        let tooltip: string = `Click to to enable Audio text for 
node discussion plugins for this tree`;

        if (tree.allowDiscussionPluginAudio === true) {

            className = CssClasses.yep;

            tooltip = `Click to disable Audio text for
node discussion plugins for this tree`;
        }

        return buttonViews.buildTypeButtonView(
            "Discussion audio text",
            tooltip,
            className,
            treeActions.toggleAllowDiscussionPluginAudio
        );
    }
};

export default typeViews;


