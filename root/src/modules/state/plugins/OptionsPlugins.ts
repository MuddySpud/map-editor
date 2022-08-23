import { VNode } from "hyperapp-local";
import { OptionType } from "../../interfaces/enums/OptionType";
import TextOptionsPlugin from "../../components/plugins/option/text/TextOptionsPlugin";
import IOptionsPlugin from "../../interfaces/plugins/IOptionsPlugin";
import IOptionsPlugins from "../../interfaces/plugins/IOptionsPlugins";
import IState from "../../interfaces/state/IState";
import INode from "../../interfaces/state/tree/INode";
import ILensUI from "../../interfaces/state/ui/UIs/ILensUI";
import optionsViews from "../../components/lenses/tabs/nodeLens/views/node/partial/optionsViews";
import INodeBase from "../../interfaces/state/tree/INodeBase";


export default class OptionsPlugins implements IOptionsPlugins {

    public currentPlugin: IOptionsPlugin | null = null;
    public defaultOptionPlugin: IOptionsPlugin = new TextOptionsPlugin();
    public plugins: Array<IOptionsPlugin> = [this.defaultOptionPlugin];

    public toggleEnableOptionPlugins(state: IState): void {

        if (!state
            || !state.lens.nodeTab.lensNode) {
            return;
        }

        const lensNode: INode<ILensUI> = state.lens.nodeTab.lensNode;

        for (let i = 0; i < this.plugins.length; i++) {

            if (this.plugins[i].toggleEnable(
                state,
                lensNode)) {

                return;
            }
        }
    }

    public buildOptionsView(
        state: IState,
        lensNode: INode<ILensUI>,
        optionsHeader: string,
        optionText: string,
        showAddRemove: boolean): VNode | null {

        this.checkCurrent(
            state,
            lensNode
        );

        let plugin: IOptionsPlugin = this.defaultOptionPlugin;

        if (this.currentPlugin) {

            plugin = this.currentPlugin;
        }

        return optionsViews.buildOptionsView(
            state,
            lensNode,
            optionsHeader,
            optionText,
            showAddRemove,
            plugin.enabled,
            plugin.buttonsClassName,
            plugin.buildOptionView
        );
    }

    public buildOptionButtonsView(
        state: IState,
        lensNode: INode<ILensUI>,
        option: INode<ILensUI>): VNode[] {

        const views: VNode[] = [];
        let pluginButtonViews: VNode[];
        let plugin: IOptionsPlugin;

        for (let i = 0; i < this.plugins.length; i++) {

            plugin = this.plugins[i];

            pluginButtonViews = plugin.buildOptionButtonViews(
                state,
                lensNode,
                option
            );

            views.push(...pluginButtonViews);
        }

        return views;
    }

    public checkCurrent(
        state: IState,
        lensNode: INode<ILensUI>): void {

        if (!state.branchesState.tree.allowOptionPlugins) {
            return;
        }

        // If new is none - set current = null & wipe all child OptionJsons
        const optionJsonType: OptionType | null = lensNode.ui.optionJson?.type ?? OptionType.None;

        if (optionJsonType === OptionType.None) {

            this.currentPlugin = null;
            lensNode.ui.optionJson = null;

            lensNode.nodes.forEach((node: INode<ILensUI>) => {

                node.ui.optionJson = null;
            });

            return
        }

        let plugin: IOptionsPlugin;

        for (let i = 0; i < this.plugins.length; i++) {

            plugin = this.plugins[i];

            if (plugin.type === optionJsonType) {

                if (this.currentPlugin
                    && this.currentPlugin.type !== optionJsonType) {
                    // If current exists and doesn't match new - teardown
                    this.currentPlugin.tearDown(
                        state,
                        lensNode
                    );
                }

                this.currentPlugin = plugin;
                // If new is not None - setup
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
        optionType: OptionType): void {

        if (!optionType
            || optionType === OptionType.None
            || optionType === this.currentPlugin?.type
            || !state.branchesState.tree.allowOptionPlugins) {
            return;
        }

        let plugin: IOptionsPlugin;

        for (let i = 0; i < this.plugins.length; i++) {

            plugin = this.plugins[i];
            this.currentPlugin = plugin;

            if (plugin.type === optionType) {

                plugin.setUp(
                    state,
                    lensNode);

                return;
            }
        }
    }

    public tearDown(
        state: IState,
        lensNode: INode<ILensUI>,
        optionType: OptionType): void {

        if (!optionType
            || optionType === OptionType.None
            || optionType !== this.currentPlugin?.type
            || !state.branchesState.tree.allowOptionPlugins) {
            return;
        }

        let plugin: IOptionsPlugin;

        for (let i = 0; i < this.plugins.length; i++) {

            plugin = this.plugins[i];
            this.currentPlugin = null;

            if (plugin.type === optionType) {

                plugin.tearDown(
                    state,
                    lensNode);

                return;
            }
        }
    }

    public checkMatch(
        state: IState,
        lensNode: INode<ILensUI>): boolean {

        this.checkCurrent(
            state,
            lensNode
        );

        if (this.currentPlugin) {

            return this.currentPlugin.checkMatch(lensNode);
        }

        return true;
    }

    public reHydrate(
        state: IState,
        lensNode: INode<ILensUI>): void {

        if (!state
            || !lensNode) {
            return;
        }

        for (let i = 0; i < this.plugins.length; i++) {

            if (this.plugins[i].reHydrate(
                state,
                lensNode)) {

                return;
            }
        }

        if (this.currentPlugin) {

            this.currentPlugin.reHydrate(
                state,
                lensNode);
        }
    }

    public getPluginName(optionType: OptionType): string {

        let plugin: IOptionsPlugin;

        for (let i = 0; i < this.plugins.length; i++) {

            plugin = this.plugins[i];

            if (plugin.type === optionType) {

                return plugin.name;
            }
        }

        return this.defaultOptionPlugin.name;
    }

    public pluginsOnRenderFinished() {

        for (let i = 0; i < this.plugins.length; i++) {

            this.plugins[i].onRenderFinished();
        }
    }

    public toJson(
        state: IState,
        lensNode: INode<ILensUI>): void {

        this.checkCurrent(
            state,
            lensNode
        );

        if (this.currentPlugin) {

            this.currentPlugin.toJson(lensNode);
        }
    }

    validate(node: INodeBase): boolean {

        const lensNode: INode<ILensUI> = node as INode<ILensUI>;

        if (!lensNode.ui
            || !lensNode.ui.optionJson) {

            // Nothing to validate
            return true;
        }

        if (this.currentPlugin) {

            return this.currentPlugin.validate(lensNode);
        }

        return true;
    }

    checkForNoChanges(node: INodeBase): boolean {

        const lensNode: INode<ILensUI> = node as INode<ILensUI>;

        if (!lensNode.ui
            || !lensNode.ui.optionJson) {

            // Nothing to check
            return true;
        }

        if (this.currentPlugin) {

            return this.currentPlugin.checkForNoChanges(lensNode);
        }

        return true;
    }
}
