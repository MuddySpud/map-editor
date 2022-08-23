import { h, VNode } from "hyperapp-local";

import TreeElement from "../../../../../../../state/ui/payloads/TreeElement";
import INodeBase from "../../../../../../../interfaces/state/tree/INodeBase";
import NodeBaseElement from "../../../../../../../state/ui/payloads/NodeBaseElement";
import U from "../../../../../../../global/gUtilities";
import gHtmlActions from "../../../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import inputErrorViews from "../../../../../lens/views/inputErrorViews";
import treeActions from "../../../actions/treeActions";
import ITreeSys from "../../../../../../../interfaces/state/tree/ITreeSys";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";


const editTreeDetailsViews = {

    buildNameInputView: (
        tree: ITreeSys,
        behaviour: IStageBehaviour | null = null): VNode => {

        const view: VNode =

            h("div", { class: "input-wrapper" }, [
                h("input",
                    {
                        value: `${tree.name}`,
                        class: "edit",
                        type: "text",
                        key: `name_${tree.key}`,
                        placeholder: `...enter a name, it must be unique, it is not displayed to users...`,
                        onInput: [
                            treeActions.setName,
                            (event: any) => {
                                return new TreeElement(
                                    tree,
                                    event.target,
                                    behaviour
                                );
                            }
                        ],
                        onBlur: gHtmlActions.clearFocus,
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => `Tree name - must be unique
It is not displayed to users`
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    ""
                )
            ]);

        return view;
    },


    buildTreeTitleInputView: (
        tree: ITreeSys,
        behaviour: IStageBehaviour | null = null): VNode => {

        const view: VNode =

            h("div", { class: "input-wrapper" }, [
                h("input",
                    {
                        value: `${tree.title}`,
                        class: "edit",
                        type: "text",
                        key: `treeTitle_${tree.key}`,
                        placeholder: `...enter a tree title...`,
                        onInput: [
                            treeActions.setTitle,
                            (event: any) => {
                                return new TreeElement(
                                    tree,
                                    event.target,
                                    behaviour
                                );
                            }
                        ],
                        onBlur: gHtmlActions.clearFocus,
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => "Tree title - this is displayed to users"
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    ""
                )
            ]);

        return view;
    },

    buildNameTitleErrorInputView: (
        tree: ITreeSys,
        nameTitle: string,
        behaviour: IStageBehaviour | null = null): VNode => {

        const view: VNode =

            h("div", { class: "name input-box" }, [

                inputErrorViews.buildKeyTitleErrorView(
                    nameTitle,
                    tree.key,
                    tree.errors
                ),

                editTreeDetailsViews.buildNameInputView(
                    tree,
                    behaviour
                )
            ]);

        return view;
    },

    buildTreeTitleErrorInputView: (
        tree: ITreeSys,
        treeTitle: string,
        behaviour: IStageBehaviour | null = null): VNode => {

        const view: VNode =

            h("div", { class: "tree-title input-box" }, [

                inputErrorViews.buildKeyTitleErrorView(
                    treeTitle,
                    tree.key,
                    tree.errors
                ),

                editTreeDetailsViews.buildTreeTitleInputView(
                    tree,
                    behaviour
                )
            ]);

        return view;
    },

    buildRootDiscussionTitleErrorInputView: (
        root: INodeBase,
        rootDiscussionTitle: string): VNode => {

        const view: VNode =

            h("div", { class: "root-discussion input-box" }, [

                inputErrorViews.buildKeyTitleErrorView(
                    rootDiscussionTitle,
                    root.key,
                    root.errors
                ),

                editTreeDetailsViews.buildRootDiscussionInputView(root)
            ]);

        return view;
    },

    buildDescriptionTitleInputView: (
        tree: ITreeSys,
        descriptionTitle: string,
        behaviour: IStageBehaviour | null = null): VNode => {

        const view: VNode =

            h("div", { class: "description input-box" }, [
                h("span", { class: "title" }, `${descriptionTitle}`),
                h("div",
                    {
                        class: "textarea-wrapper"
                    },
                    [
                        h("textarea",
                            {
                                value: `${tree.description}`,
                                class: "edit",
                                key: `description_${tree.key}`,
                                textmode: "MultiLine",
                                placeholder: `...enter a description...`,
                                draggable: "false",
                                onInput: [
                                    treeActions.setDescription,
                                    (event: any) => {
                                        return new TreeElement(
                                            tree,
                                            event.target,
                                            behaviour
                                        );
                                    }
                                ],
                                onMouseOver: [
                                    gTooltipActions.showTooltip,
                                    (_event: any) => "Tree description"
                                ],
                                onMouseOut: gTooltipActions.clearTooltip
                            },
                            ""
                        ),
                    ]
                )
            ]);

        return view;
    },

    buildNotesTitleInputView: (
        tree: ITreeSys,
        notesTitle: string,
        behaviour: IStageBehaviour | null = null): VNode => {

        const view: VNode =

            h("div", { class: "description input-box" }, [
                h("span", { class: "title" }, `${notesTitle}`),
                h("div",
                    {
                        class: "textarea-wrapper"
                    },
                    [
                        h("textarea",
                            {
                                value: `${tree.notes}`,
                                class: "edit",
                                key: `notes_${tree.key}`,
                                textmode: "MultiLine",
                                placeholder: `...enter any notes...`,
                                draggable: "false",
                                onInput: [
                                    treeActions.setNotes,
                                    (event: any) => {
                                        return new TreeElement(
                                            tree,
                                            event.target,
                                            behaviour
                                        );
                                    }
                                ],
                                onMouseOver: [
                                    gTooltipActions.showTooltip,
                                    (_event: any) => "Tree notes displayed only to tree authors"
                                ],
                                onMouseOut: gTooltipActions.clearTooltip
                            },
                            ""
                        ),
                    ]
                )
            ]);

        return view;
    },

    buildTagsTitleInputView: (
        tree: ITreeSys,
        tagsTitle: string,
        behaviour: IStageBehaviour | null = null): VNode => {

        const view: VNode =

            h("div", { class: "tags input-box" }, [
                h("span", { class: "title" }, `${tagsTitle}`),
                h("div",
                    {
                        class: "textarea-wrapper"
                    },
                    [
                        h("textarea",
                            {
                                value: `${tree.tags}`,
                                class: "edit",
                                key: `tags_${tree.key}`,
                                textmode: "MultiLine",
                                placeholder: `...enter tags - each tag on a new line, no spaces...`,
                                draggable: "false",
                                onInput: [
                                    treeActions.setTags,
                                    (event: any) => {
                                        return new TreeElement(
                                            tree,
                                            event.target,
                                            behaviour
                                        );
                                    }
                                ],
                                onMouseOver: [
                                    gTooltipActions.showTooltip,
                                    (_event: any) => `Use tags to group or classify trees
Each tag must be on a separate line`
                                ],
                                onMouseOut: gTooltipActions.clearTooltip
                            },
                            ""
                        ),
                    ]
                )
            ]);

        return view;
    },

    buildRootDiscussionInputView: (root: INodeBase): VNode => {

        const view: VNode =

            h("div",
                {
                    class: "textarea-wrapper"
                },
                [
                    h("textarea",
                        {
                            value: `${root.discussion}`,
                            class: "edit",
                            key: `rootDiscussion_${root.key}`,
                            textmode: "MultiLine",
                            placeholder: `...enter a root discussion...`,
                            draggable: "false",
                            onInput: [
                                treeActions.setRootDiscussion,
                                (event: any) => {
                                    return new NodeBaseElement(
                                        root,
                                        event.target,
                                    );
                                }
                            ],
                            onMouseOver: [
                                gTooltipActions.showTooltip,
                                (_event: any) => `Edit the root discussion for the tree`
                            ],
                            onMouseOut: gTooltipActions.clearTooltip
                        },
                        ""
                    ),
                ]
            );

        return view;
    },

    buildCreateInputView: (
        tree: ITreeSys,
        behaviour: IStageBehaviour | null = null,
        prefixedPhrase: string = ''): VNode[] => {

        if (!tree) {

            return [];
        }

        let nameTitle: string;
        let descriptionTitle: string;
        let tagsTitle: string;

        if (!U.isNullOrWhiteSpace(prefixedPhrase)) {

            nameTitle = `${prefixedPhrase} name`;
            descriptionTitle = `${prefixedPhrase} description`;
            tagsTitle = `${prefixedPhrase} tags`;
        }
        else {
            nameTitle = 'Name';
            descriptionTitle = 'Description';
            tagsTitle = 'Tags';
        }

        const view: VNode[] = [

            editTreeDetailsViews.buildNameTitleErrorInputView(
                tree,
                nameTitle,
                behaviour
            ),

            editTreeDetailsViews.buildDescriptionTitleInputView(
                tree,
                descriptionTitle,
                behaviour
            ),

            editTreeDetailsViews.buildTagsTitleInputView(
                tree,
                tagsTitle,
                behaviour
            )
        ];

        return view;
    },

    buildEditInputView: (
        tree: ITreeSys,
        behaviour: IStageBehaviour | null = null,
        prefixedPhrase: string = ''): VNode[] => {

        if (!tree) {

            return [];
        }

        let nameTitle: string;
        let descriptionTitle: string;
        let tagsTitle: string;
        let treeTitle: string;
        let notesTitle: string;

        if (!U.isNullOrWhiteSpace(prefixedPhrase)) {

            nameTitle = `${prefixedPhrase} name`;
            descriptionTitle = `${prefixedPhrase} description`;
            tagsTitle = `${prefixedPhrase} tags`;
            treeTitle = `${prefixedPhrase} title`;
            notesTitle = `${prefixedPhrase} notes`;
        }
        else {
            nameTitle = 'Name';
            descriptionTitle = 'Description';
            tagsTitle = 'Tags';
            treeTitle = `Title`;
            notesTitle = `Notes`;
        }

        const view: VNode[] = [

            editTreeDetailsViews.buildNameTitleErrorInputView(
                tree,
                nameTitle,
                behaviour
            ),

            editTreeDetailsViews.buildTreeTitleErrorInputView(
                tree,
                treeTitle,
                behaviour
            ),

            editTreeDetailsViews.buildDescriptionTitleInputView(
                tree,
                descriptionTitle,
                behaviour
            ),

            editTreeDetailsViews.buildNotesTitleInputView(
                tree,
                notesTitle,
                behaviour
            ),

            editTreeDetailsViews.buildTagsTitleInputView(
                tree,
                tagsTitle,
                behaviour
            )
        ];

        return view;
    }
};

export default editTreeDetailsViews;


