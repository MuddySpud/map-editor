import { Children, VNode } from "hyperapp-local";
import { DiscussionType } from "../../interfaces/enums/DiscussionType";
import IDiscussionPlugin from "../../interfaces/plugins/IDiscussionPlugin";
import IDiscussionPlugins from "../../interfaces/plugins/IDiscussionPlugins";
import IState from "../../interfaces/state/IState";
import INode from "../../interfaces/state/tree/INode";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import discussionViews from "../../components/lenses/tabs/nodeLens/views/node/partial/discussionViews";
import TextDiscussionPlugin from "../../components/plugins/discussion/text/TextDiscussionPlugin";
import INodeBase from "../../interfaces/state/tree/INodeBase";


export default class DiscussionPlugins implements IDiscussionPlugins {

    public currentPlugin: IDiscussionPlugin | null = null;
    public defaultDiscussionPlugin: IDiscussionPlugin = new TextDiscussionPlugin();
    public plugins: Array<IDiscussionPlugin> = [this.defaultDiscussionPlugin];

    public buildDiscussionView(
        state: IState,
        lensNode: INode<ILensUI>,
        includeSelectView: boolean = false): Children[] {

        this.checkCurrent(
            state,
            lensNode
        );

        let plugin: IDiscussionPlugin = this.defaultDiscussionPlugin;

        if (this.currentPlugin) {

            plugin = this.currentPlugin;
        }

        return discussionViews.buildDiscussionView(
            state,
            lensNode,
            includeSelectView && state.branchesState.tree.allowDiscussionPlugins,
            plugin.buildDiscussionView
        );
    }

    public buildButtonsView(
        state: IState,
        lensNode: INode<ILensUI>): Children[] {

        if (!state.branchesState.tree.allowDiscussionPlugins) {

            return [];
        }

        this.checkCurrent(
            state,
            lensNode
        );

        let plugin: IDiscussionPlugin = this.defaultDiscussionPlugin;

        if (this.currentPlugin) {

            plugin = this.currentPlugin;
        }

        return plugin.buildButtonsView(
            state,
            lensNode
        );
    }

    public checkCurrent(
        state: IState,
        lensNode: INode<ILensUI>): void {

        if (!state.branchesState.tree.allowDiscussionPlugins) {
            return;
        }

        // If new is none - set current = null & wipe all child OptionJsons
        const discussionJsonType: DiscussionType | null = lensNode.bin?.discussion?.type ?? DiscussionType.None;

        if (discussionJsonType === this.currentPlugin?.type
            && lensNode.ui.discussionJson) {
            return
        }

        this.tearDown(
            state,
            lensNode
        );

        if (discussionJsonType === DiscussionType.None) {
            return
        }

        let plugin: IDiscussionPlugin;

        for (let i = 0; i < this.plugins.length; i++) {

            plugin = this.plugins[i];

            if (plugin.type === discussionJsonType) {

                this.currentPlugin = plugin;

                this.currentPlugin.setUp(
                    state,
                    lensNode
                );

                break;
            }
        }
    }

    public setUp(
        state: IState,
        lensNode: INode<ILensUI>,
        discussionType: DiscussionType): void {

        if (!discussionType
            || discussionType === DiscussionType.None
            || discussionType === this.currentPlugin?.type
            || !state.branchesState.tree.allowDiscussionPlugins) {
            return;
        }

        let plugin: IDiscussionPlugin;

        for (let i = 0; i < this.plugins.length; i++) {

            plugin = this.plugins[i];
            this.currentPlugin = plugin;

            if (plugin.type === discussionType) {

                plugin.setUp(
                    state,
                    lensNode);

                return;
            }
        }
    }

    public tearDown(
        state: IState,
        lensNode: INode<ILensUI>): void {

        if (!state.branchesState.tree.allowDiscussionPlugins) {
            return;
        }

        if (this.currentPlugin) {

            this.currentPlugin.tearDown(
                state,
                lensNode);
        }

        this.currentPlugin = null;

        if (lensNode.ui?.discussionJson) {

            lensNode.ui.discussionJson = null;
        }

        if (lensNode.bin?.discussion) {

            lensNode.bin.discussion = null;
        }
    }

    public checkMatch(
        _state: IState,
        lensNode: INode<ILensUI>): boolean {

        // this.checkCurrent(
        //     state,
        //     lensNode
        // );

        if (this.currentPlugin) {

            return this.currentPlugin.checkMatch(lensNode);
        }

        return true;
    }

    public cleanUpForDeleteNode(
        _state: IState,
        lensNode: INode<ILensUI>): void {

        if (!lensNode.bin) {

            return;
        }

        lensNode.bin.discussion = null;
    }

    public getPluginName(discussionType: DiscussionType): string {

        let plugin: IDiscussionPlugin;

        for (let i = 0; i < this.plugins.length; i++) {

            plugin = this.plugins[i];

            if (plugin.type === discussionType) {

                return plugin.name;
            }
        }

        return this.defaultDiscussionPlugin.name;
    }

    public buildExpandedEditorView(state: IState): VNode | null {

        if (state.branchesState.tree.allowDiscussionPlugins
            && state.lens.nodeTab.lensNode) {

            const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode;

            this.checkCurrent(
                state,
                lensNode
            );

            if (this.currentPlugin) {

                return this.currentPlugin.buildExpandedEditorView(lensNode);
            }
        }

        return this.defaultDiscussionPlugin.buildExpandedEditorView(null);
    }

    public pluginsOnRenderFinished() {

        for (let i = 0; i < this.plugins.length; i++) {

            this.plugins[i].onRenderFinished();
        }
    }

    public toJson(
        _state: IState,
        lensNode: INode<ILensUI>): void {

        if (this.currentPlugin) {

            this.currentPlugin.toJson(lensNode);
        }
    }

    validate(node: INodeBase): boolean {

        const lensNode: INode<ILensUI> = node as INode<ILensUI>;

        if (!lensNode.ui
            || !lensNode.ui.discussionJson) {

            // Don't validate
            return true;
        }

        if (this.currentPlugin) {

            return this.currentPlugin.validate(lensNode);
        }

        return true;
    }

    runsInBackground(): boolean {

        if (this.currentPlugin) {

            return this.currentPlugin.runsInBackground();
        }

        return false;
    }
}
