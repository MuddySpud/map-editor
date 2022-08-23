import { h, VNode } from "hyperapp-local";

import U from "../../../../../../../global/gUtilities";
import gHtmlActions from "../../../../../../../global/actions/gHtmlActions";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import inputErrorViews from "../../../../../lens/views/inputErrorViews";
import botActions from "../../../actions/botActions";
import IStageBehaviour from "../../../../../../../interfaces/behaviours/IStageBehaviour";
import IAlias from "../../../../../../../interfaces/state/bot/IAlias";
import AliasElement from "../../../../../../../state/ui/payloads/AliasElement";


const aliasEditDetailsViews = {

    buildAliasTitleInputView: (
        alias: IAlias,
        behaviour: IStageBehaviour | null = null): VNode => {

        const view: VNode =

            h("div", { class: "input-wrapper" }, [
                h("input",
                    {
                        value: `${alias.title}`,
                        class: "edit",
                        type: "text",
                        key: `aliasTitle_${alias.key}`,
                        placeholder: `...enter a alias title...`,
                        onInput: [
                            botActions.setTitle,
                            (event: any) => {
                                return new AliasElement(
                                    alias,
                                    event.target,
                                    behaviour
                                );
                            }
                        ],
                        onBlur: gHtmlActions.clearFocus,
                        onMouseOver: [
                            gTooltipActions.showTooltip,
                            (_event: any) => "Bot alias title - this is displayed to users"
                        ],
                        onMouseOut: gTooltipActions.clearTooltip
                    },
                    ""
                )
            ]);

        return view;
    },

    buildAliasTitleErrorInputView: (
        alias: IAlias,
        aliasTitle: string,
        behaviour: IStageBehaviour | null = null): VNode => {

        const view: VNode =

            h("div", { class: "alias-title input-box" }, [

                inputErrorViews.buildKeyTitleErrorView(
                    aliasTitle,
                    alias.key,
                    alias.errors
                ),

                aliasEditDetailsViews.buildAliasTitleInputView(
                    alias,
                    behaviour
                )
            ]);

        return view;
    },

    buildDescriptionTitleInputView: (
        alias: IAlias,
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
                                value: `${alias.description}`,
                                class: "edit",
                                key: `description_${alias.key}`,
                                textmode: "MultiLine",
                                placeholder: `...enter a description...`,
                                draggable: "false",
                                onInput: [
                                    botActions.setDescription,
                                    (event: any) => {
                                        return new AliasElement(
                                            alias,
                                            event.target,
                                            behaviour
                                        );
                                    }
                                ],
                                onMouseOver: [
                                    gTooltipActions.showTooltip,
                                    (_event: any) => "Bot alias description"
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

    buildVersionTitleInputView: (
        alias: IAlias,
        versionTitle: string,
        behaviour: IStageBehaviour | null = null): VNode => {

        const view: VNode =

            h("div", { class: "version input-box" }, [
                h("span", { class: "title" }, `${versionTitle}`),
                h("div",
                    {
                        class: "input-wrapper"
                    },
                    [
                        h("input",
                            {
                                value: `${alias.version}`,
                                class: "edit",
                                type: "text",
                                key: `version_${alias.key}`,
                                placeholder: `...enter a version...`,
                                draggable: "false",
                                onInput: [
                                    botActions.setVersion,
                                    (event: any) => {
                                        return new AliasElement(
                                            alias,
                                            event.target,
                                            behaviour
                                        );
                                    }
                                ],
                                onMouseOver: [
                                    gTooltipActions.showTooltip,
                                    (_event: any) => "Alias version"
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
        alias: IAlias,
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
                                value: `${alias.tags}`,
                                class: "edit",
                                key: `tags_${alias.key}`,
                                textmode: "MultiLine",
                                placeholder: `...enter tags - each tag on a new line, no spaces...`,
                                draggable: "false",
                                onInput: [
                                    botActions.setTags,
                                    (event: any) => {
                                        return new AliasElement(
                                            alias,
                                            event.target,
                                            behaviour
                                        );
                                    }
                                ],
                                onMouseOver: [
                                    gTooltipActions.showTooltip,
                                    (_event: any) => `Use tags to group or classify bot aliases
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

    buildCreateInputView: (
        alias: IAlias,
        behaviour: IStageBehaviour | null = null,
        prefixedPhrase: string = ''): VNode[] => {

        if (!alias) {

            return [];
        }

        let titleTitle: string;
        let descriptionTitle: string;
        let tagsTitle: string;
        let versionTitle: string;

        if (!U.isNullOrWhiteSpace(prefixedPhrase)) {

            titleTitle = `${prefixedPhrase} title`;
            descriptionTitle = `${prefixedPhrase} description`;
            tagsTitle = `${prefixedPhrase} tags`;
            versionTitle = `${prefixedPhrase} version`;
        }
        else {
            titleTitle = 'Title';
            descriptionTitle = 'Description';
            tagsTitle = 'Tags';
            versionTitle = 'Version';
        }

        const view: VNode[] = [

            aliasEditDetailsViews.buildAliasTitleErrorInputView(
                alias,
                titleTitle,
                behaviour
            ),

            aliasEditDetailsViews.buildDescriptionTitleInputView(
                alias,
                descriptionTitle,
                behaviour
            ),

            aliasEditDetailsViews.buildTagsTitleInputView(
                alias,
                tagsTitle,
                behaviour
            ),

            aliasEditDetailsViews.buildVersionTitleInputView(
                alias,
                versionTitle,
                behaviour
            )
        ];

        return view;
    },

    buildEditInputView: (
        alias: IAlias,
        behaviour: IStageBehaviour | null = null,
        prefixedPhrase: string = ''): VNode[] => {

        if (!alias) {

            return [];
        }

        let nameTitle: string;
        let descriptionTitle: string;
        let tagsTitle: string;
        let versionTitle: string;

        if (!U.isNullOrWhiteSpace(prefixedPhrase)) {

            nameTitle = `${prefixedPhrase} name`;
            descriptionTitle = `${prefixedPhrase} description`;
            tagsTitle = `${prefixedPhrase} tags`;
            versionTitle = `${prefixedPhrase} version`;
        }
        else {
            nameTitle = 'Name';
            descriptionTitle = 'Description';
            tagsTitle = 'Tags';
            versionTitle = 'Version';
        }

        const view: VNode[] = [

            aliasEditDetailsViews.buildAliasTitleErrorInputView(
                alias,
                nameTitle,
                behaviour
            ),

            aliasEditDetailsViews.buildDescriptionTitleInputView(
                alias,
                descriptionTitle,
                behaviour
            ),

            aliasEditDetailsViews.buildTagsTitleInputView(
                alias,
                tagsTitle,
                behaviour
            ),

            aliasEditDetailsViews.buildVersionTitleInputView(
                alias,
                versionTitle,
                behaviour
            )
        ];

        return view;
    }
};

export default aliasEditDetailsViews;


