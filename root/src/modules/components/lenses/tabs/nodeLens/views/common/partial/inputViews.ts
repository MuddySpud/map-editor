import { h, VNode, Children } from "hyperapp-local";

import gHtmlActions from "../../../../../../../global/actions/gHtmlActions";
import INodeLoader from "../../../../../../../interfaces/state/tree/INodeLoader";
import nodeLoaderActions from "../../../actions/nodeLoaderActions";
import NodeBaseElement from "../../../../../../../state/ui/payloads/NodeBaseElement";
import IHole from "../../../../../../../interfaces/state/tree/IHole";
import ISocketLoaderUI from "../../../../../../../interfaces/state/ui/UIs/ISocketLoaderUI";
import U from "../../../../../../../global/gUtilities";
import NodeLoaderElement from "../../../../../../../state/ui/payloads/NodeLoaderElement";
import buttonViews from "../../../../../lens/views/buttonViews";
import CssClasses from "../../../../../../../state/constants/CssClasses";
import branchTaskActions from "../../../actions/branchTaskActions";
import inputErrorViews from "../../../../../lens/views/inputErrorViews";
import ITreeBase from "../../../../../../../interfaces/state/tree/ITreeBase";
import autoCompleteViews from "../../../../../lens/views/autoCompleteViews";
import gTreeCode from "../../../../../../../global/code/gTreeCode";
import IState from "../../../../../../../interfaces/state/IState";
import NodeLoaderTreeBase from "../../../../../../../state/ui/payloads/NodeLoaderTreeBase";
import gNodeCode from "../../../../../../../global/code/gNodeCode";
import { LoaderType } from "../../../../../../../interfaces/enums/LoaderType";


const inputViews = {

    buildLimitInputView: (limit: IHole<ISocketLoaderUI>): VNode => {

        const detailsView =

            h("div", { class: "key input-box" }, [

                inputErrorViews.buildTitleErrorView(
                    'key',
                    limit.errors),

                inputViews.buildLimitKeyInputView(limit)
            ]);

        return detailsView;
    },

    buildLimitKeyInputView: (limit: IHole<ISocketLoaderUI>): VNode => {

        const key: string = U.isPositiveNumeric(limit.key) === true ? limit.key as string : '';

        const inputView: VNode =

            h("div", { class: "input-wrapper" }, [
                h("input",
                    {
                        value: `${key}`,
                        class: "edit",
                        type: "text",
                        placeholder: `...enter the option key...`,
                        onInput: [
                            nodeLoaderActions.setNodeBasePayloadKey,
                            (event: any) => {
                                return new NodeBaseElement(
                                    limit,
                                    event.target,
                                );
                            }
                        ],
                        onBlur: gHtmlActions.clearFocus
                    },
                    ""
                )
            ]);

        return inputView;
    },

    buildLocalTreeTypeView: (optionLoader: INodeLoader): VNode | null => {

        const localTree: boolean = optionLoader.ui.localTree;
        const localTreeClass: string = localTree === true ? CssClasses.yep : CssClasses.nope;

        return buttonViews.buildTypeButtonView(
            "Local tree",
            "Local or external to the current tree",
            localTreeClass,
            branchTaskActions.toggleLocalTree
        );
    },

    buildOptionInputView: (
        state: IState,
        optionLoader: INodeLoader,
        raw: boolean): Children[] => {

        const inputView: Children[] = [

            inputViews.buildLocalTreeTypeView(optionLoader),

            inputViews.buildOptionTokenAutoCompleteView(
                state,
                optionLoader),

            inputViews.buildOptionErrorInputView(
                state,
                optionLoader,
                raw)
        ];

        return inputView;
    },

    buildOptionTokenAutoCompleteView: (
        state: IState,
        optionLoader: INodeLoader): VNode | null => {

        if (optionLoader.ui.localTree === true) {

            return null;
        }

        const tokenErrors: Array<string> = gTreeCode.getTokenErrors(
            state,
            optionLoader.token);

        const view =

            h("div", { class: "token input-box" }, [

                inputErrorViews.buildTitleErrorView(
                    'token',
                    tokenErrors),

                inputViews.buildTokenAutoCompleteView(
                    state,
                    optionLoader)
            ]);

        return view;
    },

    buildTokenAutoCompleteView: (
        state: IState,
        optionLoader: INodeLoader): VNode => {

        const optionViews: VNode[] = [];

        inputViews.buildTokenSelectionView(
            state,
            optionLoader,
            optionViews);

        const selectInputView: VNode = inputViews.buildAutoCompleteInputView(
            "...enter the tree token...",
            optionLoader.token,
            optionLoader,
            LoaderType.Option
        );

        return autoCompleteViews.buildSelectView(
            optionViews,
            selectInputView,
            optionLoader.ui.showTreeSelection,
            branchTaskActions.nodeLoaderTokenSelectBlur,
            optionLoader
        );
    },

    buildTokenSelectionView: (
        state: IState,
        optionLoader: INodeLoader,
        optionViews: VNode[]): void => {

        const tokenValidation = state.lens.validationResults.treeToken;

        if (!tokenValidation
            || tokenValidation.value !== optionLoader.token
            || tokenValidation.matching.length === 0) {

            return;
        }

        if (tokenValidation.matching.length === 1
            && tokenValidation.matching[0].token === optionLoader.token) {
            // If there is only one selection possible and the token already matches it
            // Don't show it
            return;
        }

        const headerView = inputViews.buildSelectHeaderView();
        optionViews.push(headerView);
        let optionView: VNode;

        state.lens.validationResults.treeToken.matching.forEach((tree: ITreeBase) => {

            optionView = inputViews.buildSelectAutoCompleteBranchUI(
                optionLoader,
                tree);

            optionViews.push(optionView);
        });
    },

    buildSelectHeaderView: (): VNode => {

        const view: VNode =

            h("div", { class: "select-header" }, [
                h("div", { class: "select-cell" }, "token"),
                h("div", { class: "select-cell" }, "name"),
                h("div", { class: "select-cell" }, "key")
            ]);

        return view;
    },

    buildSelectAutoCompleteBranchUI: (
        optionLoader: INodeLoader,
        tree: ITreeBase): VNode => {

        alert('Need to update this see socketSelectView.buildSelectSocketUI');
        
        const view: VNode =

            h("div",
                {
                    class: "select-row",
                    onMouseDown: [
                        branchTaskActions.selectTreeToken,
                        (_event: any) => {
                            return new NodeLoaderTreeBase(
                                optionLoader,
                                tree
                            );
                        }
                    ]
                },
                [
                    h("div", { class: "select-cell" }, tree.token),
                    h("div", { class: "select-cell" }, tree.name),
                    h("div", { class: "select-cell" }, tree.key)
                ]
            );

        return view;
    },

    buildOptionErrorInputView: (
        state: IState,
        optionLoader: INodeLoader,
        raw: boolean): VNode => {

        let errorView: VNode | null = null;

        if (raw === false) {

            const keyErrors = gNodeCode.isNodeKeyValid(
                state,
                optionLoader.token,
                optionLoader.key);

            const errors = [
                ...keyErrors,
                ...optionLoader.errors
            ];

            errorView = inputErrorViews.buildTitleErrorView(
                'key',
                errors);
        }

        const detailsView =

            h("div", { class: "key input-box" }, [

                errorView,
                inputViews.buildOptionKeyInputView(optionLoader)
            ]);

        return detailsView;
    },

    buildOptionKeyInputView: (optionLoader: INodeLoader): VNode => {

        const key: string = U.isPositiveNumeric(optionLoader.key) === true ? optionLoader.key as string : '';

        const view: VNode =

            h("div", { class: "input-wrapper" }, [
                h("input",
                    {
                        value: `${key}`,
                        class: "edit",
                        type: "text",
                        placeholder: `...enter the key...`,
                        onInput: [
                            nodeLoaderActions.setNodeLoaderPayloadKey,
                            (event: any) => {
                                return new NodeLoaderElement(
                                    optionLoader,
                                    event.target,
                                    LoaderType.Option
                                );
                            }
                        ],
                        onBlur: gHtmlActions.clearFocus
                    },
                    ""
                )
            ]);

        return view;
    },

    buildAutoCompleteInputView: (
        placeholder: string,
        value: string,
        optionLoader: INodeLoader,
        type: LoaderType
    ): VNode => {

        const view: VNode =

            h("div", { class: "input-wrapper" }, [
                h("input",
                    {
                        value: value,
                        class: "edit",
                        type: "text",
                        placeholder: placeholder,
                        onInput: [
                            nodeLoaderActions.setNodeLoaderPayloadToken,
                            (event: any) => {
                                return new NodeLoaderElement(
                                    optionLoader,
                                    event.target,
                                    type
                                );
                            }
                        ],
                        onFocus: gHtmlActions.clearFocus,
                        onBlur: [
                            branchTaskActions.nodeLoaderTokenSelectBlur,
                            (_event: any) => optionLoader
                        ]
                    },
                    ""
                )
            ]);

        return view;
    },

    buildRootErrorInputView: (targetLoader: INodeLoader): VNode => {

        const detailsView =

            h("div", { class: "key input-box" }, [

                inputErrorViews.buildTitleErrorView(
                    'key',
                    targetLoader.errors),

                inputViews.buildRootInputView(targetLoader)
            ]);

        return detailsView;
    },

    buildRootInputView: (rootLoader: INodeLoader): VNode => {

        const key: string = U.isPositiveNumeric(rootLoader.key) === true ? rootLoader.key as string : '';

        const view: VNode =

            h("div", { class: "input-wrapper" }, [
                h("input",
                    {
                        value: `${key}`,
                        class: "edit",
                        type: "text",
                        placeholder: `...enter the key...`,
                        onInput: [
                            nodeLoaderActions.setNodeLoaderPayloadKey,
                            (event: any) => {
                                return new NodeLoaderElement(
                                    rootLoader,
                                    event.target,
                                    LoaderType.Root
                                );
                            }
                        ],
                        onBlur: gHtmlActions.clearFocus
                    },
                    ""
                )
            ]);

        return view;
    },

    buildTargetErrorInputView: (
        targetLoader: INodeLoader,
        raw: boolean): VNode => {

        let errorView: VNode | null = null;

        if (raw === false) {

            errorView = inputErrorViews.buildTitleErrorView(
                'key',
                targetLoader.errors);
        }

        const detailsView =

            h("div", { class: "key input-box" }, [

                errorView,
                inputViews.buildTargetInputView(targetLoader)
            ]);

        return detailsView;
    },

    buildTargetInputView: (targetLoader: INodeLoader): VNode => {

        const key: string = U.isPositiveNumeric(targetLoader.key) === true ? targetLoader.key as string : '';

        const view: VNode =

            h("div", { class: "input-wrapper" }, [
                h("input",
                    {
                        value: `${key}`,
                        class: "edit",
                        type: "text",
                        placeholder: `...enter the key...`,
                        onInput: [
                            nodeLoaderActions.setNodeLoaderPayloadKey,
                            (event: any) => {
                                return new NodeLoaderElement(
                                    targetLoader,
                                    event.target,
                                    LoaderType.Target
                                );
                            }
                        ],
                        onBlur: gHtmlActions.clearFocus
                    },
                    ""
                )
            ]);

        return view;
    },
};

export default inputViews;


