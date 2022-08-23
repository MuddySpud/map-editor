import { h, VNode } from "hyperapp-local";

import ISearchTerm from "../../../../../../../interfaces/state/Search/ISearchTerm";
import FieldMapping from "../../../../../../../state/search/FieldMapping";
import gHtmlActions from "../../../../../../../global/actions/gHtmlActions";
import searchActions from "../../../actions/searchActions";
import SearchTermElement from "../../../../../../../state/ui/payloads/SearchTermElement";
import { JoinerType } from "../../../../../../../interfaces/enums/search/JoinerType";
import { TermType } from "../../../../../../../interfaces/enums/search/TermType";
import { InputType } from "../../../../../../../interfaces/enums/search/InputType";
import ISettings from "../../../../../../../interfaces/state/user/ISettings";
import ITermMappings from "../../../../../../../interfaces/state/search/ITermMappings";
import ITermMapping from "../../../../../../../interfaces/state/search/ITermMapping";
import ISearchCase from "../../../../../../../interfaces/state/Search/ISearchCase";
import searchSelectors from "../../../code/searchSelectors";
import ISearchBrief from "../../../../../../../interfaces/state/Search/ISearchBrief";
import gTooltipActions from "../../../../../../../global/actions/gTooltipActions";
import ITabSave from "../../../../../../../interfaces/state/ui/tabs/ITabSave";


const searchTermViews = {

    buildSearchTermView: (
        tab: ITabSave,
        searchCase: ISearchCase,
        searchTerm: ISearchTerm,
        settings: ISettings,
        index: number): VNode | null => {

        const brief: ISearchBrief = searchCase.brief as ISearchBrief;

        let subtreeFieldMappings: Array<FieldMapping> = searchSelectors.getFieldMappings(
            settings,
            brief.type
        );

        let subtreeTermMappings: ITermMappings = settings.searchTermMappings;
        let selectedMapping: FieldMapping;

        const buildJoinerView = (): VNode | null => {

            // Don't draw for the first row
            if (index === 0) {

                return null;
            }

            const view: VNode =

                h("div", { class: "joiner" },
                    [
                        h("div", { class: "drop-down" },
                            [
                                h("select",
                                    {
                                        onInput: [
                                            searchActions.setJoiner,
                                            (event: any) => {
                                                return new SearchTermElement(
                                                    tab,
                                                    searchCase,
                                                    searchTerm,
                                                    event.target,
                                                );
                                            }
                                        ]
                                    },
                                    [
                                        h("option",
                                            {
                                                value: "and",
                                                selected: searchTerm.joiner === JoinerType.And
                                            },
                                            "and"
                                        ),
                                        h("option",
                                            {
                                                value: "or",
                                                selected: searchTerm.joiner === JoinerType.Or
                                            },
                                            "or"
                                        ),
                                        h("option",
                                            {
                                                value: "not",
                                                selected: searchTerm.joiner === JoinerType.Not
                                            },
                                            "not"
                                        )
                                    ]
                                )
                            ]
                        )
                    ]
                );

            return view;
        };

        const buildFieldView = (): VNode => {

            const options: VNode[] = [];

            subtreeFieldMappings.forEach((mapping: FieldMapping) => {

                let selected: boolean = false;

                if (mapping.fieldType === searchTerm.field) {

                    selectedMapping = mapping;
                    selected = true;
                }

                const optionView: VNode =

                    h("option",
                        {
                            value: `${mapping.fieldType}`,
                            selected: selected
                        },
                        mapping.display
                    );

                options.push(optionView);
            });

            const view: VNode =

                h("div", { class: "field" },
                    [
                        h("div", { class: "drop-down" },
                            [
                                h("select",
                                    {
                                        onInput: [
                                            searchActions.setField,
                                            (event: any) => {
                                                return new SearchTermElement(
                                                    tab,
                                                    searchCase,
                                                    searchTerm,
                                                    event.target,
                                                );
                                            }
                                        ]
                                    },
                                    options)
                            ]
                        )
                    ]
                );

            return view;
        };

        const buildTermsView = (): VNode | null => {

            if (!selectedMapping
                || !selectedMapping.terms
                || selectedMapping.terms.length === 0) {

                return null;
            }

            const options: VNode[] = [];
            let termMapping: ITermMapping;
            let display: string;

            selectedMapping.terms.forEach((termType: TermType) => {

                termMapping = subtreeTermMappings[termType.toString()];
                display = termMapping.display;

                const optionView: VNode =

                    h("option",
                        {
                            value: `${termType}`,
                            selected: searchTerm.term === termType
                        },
                        display
                    );

                options.push(optionView);
            });

            const view: VNode =

                h("div", { class: "term" },
                    [
                        h("div", { class: "drop-down" },
                            [
                                h("select",
                                    {
                                        onInput: [
                                            searchActions.setTerm,
                                            (event: any) => {
                                                return new SearchTermElement(
                                                    tab,
                                                    searchCase,
                                                    searchTerm,
                                                    event.target,
                                                );
                                            }
                                        ]
                                    },
                                    options
                                )
                            ]
                        )
                    ]
                );

            return view;
        };

        const buildTextView = (): VNode | null => {

            if (selectedMapping.inputType !== InputType.Text) {
                return null;
            }

            const view: VNode =

                h("div",
                    {
                        class: "text",
                        key: `${searchTerm.key}`
                    },
                    [
                        h("div",
                            {
                                class: "textarea-wrapper"
                            },
                            [
                                h("textarea",
                                    {
                                        id: `searchText_${searchTerm.key}`,
                                        value: `${searchTerm.text}`,
                                        class: "edit",
                                        textmode: "MultiLine",
                                        placeholder: `...enter the search text here...`,
                                        onInput: [
                                            searchActions.setSearchText,
                                            (event: any) => {
                                                return new SearchTermElement(
                                                    tab,
                                                    searchCase,
                                                    searchTerm,
                                                    event.target,
                                                );
                                            }
                                        ],
                                        onBlur: gHtmlActions.clearFocus
                                    },
                                    ""
                                ),
                            ]
                        )]
                );

            return view;
        };

        const buildNumberView = (): VNode | null => {

            if (selectedMapping.inputType !== InputType.Number) {
                return null;
            }

            const view: VNode =

                h("div",
                    {
                        class: "text",
                        key: `${searchTerm.key}`
                    },
                    [
                        h("div",
                            {
                                class: "textarea-wrapper"
                            },
                            [
                                h("input",
                                    {
                                        id: `searchText_${searchTerm.key}`,
                                        value: `${searchTerm.text}`,
                                        type: "text",
                                        class: "edit",
                                        placeholder: `...enter the number to search for here...`,
                                        onInput: [
                                            searchActions.setSearchNumber,
                                            (event: any) => {
                                                return new SearchTermElement(
                                                    tab,
                                                    searchCase,
                                                    searchTerm,
                                                    event.target,
                                                );
                                            }
                                        ],
                                        onBlur: gHtmlActions.clearFocus
                                    },
                                    ""
                                ),
                            ]
                        )]
                );

            return view;
        };

        const buildBooleanView = (): VNode | null => {

            if (selectedMapping.inputType !== InputType.Boolean) {
                return null;
            }

            const view: VNode =

                h("div", { class: "bool" },
                    [
                        h("div", { class: "drop-down" },
                            [
                                h("select",
                                    {
                                        onInput: [
                                            searchActions.setBool,
                                            (event: any) => {
                                                return new SearchTermElement(
                                                    tab,
                                                    searchCase,
                                                    searchTerm,
                                                    event.target,
                                                );
                                            }
                                        ]
                                    },
                                    [
                                        h("option",
                                            {
                                                value: "true",
                                                selected: searchTerm.truth === true
                                            },
                                            "true"
                                        ),
                                        h("option",
                                            {
                                                value: "false",
                                                selected: searchTerm.truth === false
                                            },
                                            "false"
                                        )
                                    ]
                                )
                            ]
                        )
                    ]
                );

            return view;
        };

        const buildDeleteView = (): VNode => {

            const deleteView: VNode =

                h("div", { class: "delete" },
                    [
                        h("div",
                            {
                                class: "btn-delete",
                                onClick: [
                                    searchActions.deleteSearchRow,
                                    (_event: any) => {
                                        return new SearchTermElement(
                                            tab,
                                            searchCase,
                                            searchTerm,
                                            null,
                                        );
                                    }
                                ],
                                onMouseOver: [
                                    gTooltipActions.showTooltip,
                                    (_event: any) => "Delete search row"
                                ],
                                onMouseOut: gTooltipActions.clearTooltip
                            },
                            ""
                        )
                    ]
                );

            return deleteView;
        };

        const searchLensUI: VNode =

            h("div",
                {
                    class: "search-row",
                    key: `${searchTerm.key}`
                },
                [
                    h("div", { class: "counter" }, `${index + 1}`),
                    buildJoinerView(),
                    buildFieldView(),
                    buildTermsView(),
                    buildTextView(),
                    buildNumberView(),
                    buildBooleanView(),
                    buildDeleteView()
                ]
            );

        return searchLensUI;
    }
};

export default searchTermViews;

