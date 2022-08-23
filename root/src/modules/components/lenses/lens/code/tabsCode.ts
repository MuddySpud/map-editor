import { TabType } from "../../../../interfaces/enums/TabType";
import IState from "../../../../interfaces/state/IState";
import BoolString from "../../../../state/ui/payloads/BoolString";
import IDataCase from "../../../../interfaces/state/cases/IDataCase";


const tabsCode = {

    getTabHeaderID: (tabType: TabType): string => {

        return `${tabType}TabButton`;
    },

    getTabID: (tabType: TabType): string => {

        return `${tabType}Tab`;
    },

    getClasses: (
        state: IState,
        tabType: TabType,
        dataCase: IDataCase | null,
        classNames: string = ''): BoolString => {

        if (!dataCase) {
            return new BoolString(
                "",
                false
            );
        }

        if (dataCase.fresh === true
            && state.lens.selectedTab === tabType) {

            dataCase.fresh = false;
        }

        return new BoolString(
            classNames,
            dataCase.fresh
        );
    },

    getTabFlash: (
        state: IState,
        tabType: TabType): BoolString => {

        if (tabType === TabType.History) {

            return tabsCode.getClasses(
                state,
                tabType,
                state.lens.historyTab.historyCase
            );
        }
        else if (tabType === TabType.Shape) {

            return tabsCode.getClasses(
                state,
                tabType,
                state.lens.shapeTab.shapeCase
            );
        }
        else if (tabType === TabType.Spread) {

            return tabsCode.getClasses(
                state,
                tabType,
                state.lens.spreadTab.spreadCase
            );
        }
        else if (tabType === TabType.Tags) {
            
            return tabsCode.getClasses(
                state,
                tabType,
                state.lens.tagsTab.tagsCase
            );
        }
        else if (tabType === TabType.Validation) {

            let classNames: string = '';

            if (state.lens.validationsTab.validationCase?.success === false) {
                classNames = 'fail';
            }

            return tabsCode.getClasses(
                state,
                tabType,
                state.lens.validationsTab.validationCase,
                classNames
            );
        }

        return new BoolString(
            "",
            false
        );
    }
};

export default tabsCode;