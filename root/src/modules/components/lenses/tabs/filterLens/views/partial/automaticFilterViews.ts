import { Children, VNode, h } from "hyperapp-local";

import ISearchCase from "../../../../../../interfaces/state/Search/ISearchCase";
import ISettings from "../../../../../../interfaces/state/user/ISettings";
import filterTitleViews from "./filterTitleViews";
import filterActions from "../../actions/filterActions";
import buttonViews from "../../../../lens/views/buttonViews";
import CssClasses from "../../../../../../state/constants/CssClasses";
import gSearchCode from "../../../../../../global/code/gSearchCode";
import inputErrorViews from "../../../../../../components/lenses/lens/views/inputErrorViews";
import gHtmlActions from "../../../../../../global/actions/gHtmlActions";


const buildTextTitleInputView = (searchCase: ISearchCase): VNode => {

    const filterErrors: string[] = []; // no errors yet...

    const view: VNode =

        h("div", { class: "filter-text input-box" }, [

            inputErrorViews.buildTitleErrorView(
                'text',
                filterErrors),

            buildTextInputView(searchCase)
        ]);

    return view;
};

const buildTextInputView = (searchCase: ISearchCase): VNode => {

    const text: string = gSearchCode.getFirstSearchLineText(searchCase);

    const view: VNode =

        h("div", { class: "input-wrapper" }, [
            h("input",
                {
                    value: `${text}`,
                    class: "edit",
                    type: "text",
                    placeholder: `...enter the filter text...`,
                    onInput: [
                        filterActions.setAutomaticFilterText,
                        (event: any) => event.target
                    ],
                    onBlur: gHtmlActions.clearFocus
                },
                ""
            )
        ]);

    return view;
};

const automaticFilterViews = {

    buildView: (
        searchCase: ISearchCase,
        _settings: ISettings): Children[] => {

        const view: Children[] = [

            ...filterTitleViews.buildTitleView(false),

            buttonViews.buildTypeButtonView(
                "Simple filter",
                "Select advanced filter",
                CssClasses.yep,
                filterActions.toggleAdvanced
            ),

            buildTextTitleInputView(searchCase)
        ];

        return view;
    }
};
export default automaticFilterViews;

