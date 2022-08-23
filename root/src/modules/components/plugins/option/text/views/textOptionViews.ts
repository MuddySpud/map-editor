import { VNode } from "hyperapp-local";

import INodeBase from "../../../../../interfaces/state/tree/INodeBase";
import optionViews from "../../../../../components/lenses/tabs/nodeLens/views/node/partial/optionViews";

import "../scss/text.scss";


const textOptionViews = {

    buildInnerOptionView: (
        option: INodeBase,
        optionText: string,
        tooltip: string): VNode | null => {

        return optionViews.buildInnerOptionView(
            option,
            optionText,
            tooltip
        );
    }
};

export default textOptionViews;


