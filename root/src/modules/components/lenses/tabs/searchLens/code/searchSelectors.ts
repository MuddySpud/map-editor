import { SearchType } from "../../../../../interfaces/enums/search/SearchType";
import ISettings from "../../../../../interfaces/state/user/ISettings";
import ISearchBrief from "../../../../../interfaces/state/Search/ISearchBrief";


const searchSelectors = {

    getFieldMappings: (
        settings: ISettings,
        searchType: SearchType): any => {

        if (searchType === SearchType.Nodes) {

            return settings.nodeSearchMappings;
        }
        else if (searchType === SearchType.Subtrees) {

            return settings.subtreeSearchMappings;
        }
        else if (searchType === SearchType.Trees) {

            return settings.treeSearchMappings;
        }
        else {

            throw new Error(`The SearchType has not been built yet.`)
        }

        return null;
    },

    hasSelectedResult: (searchBrief: ISearchBrief): boolean => {

        if (searchBrief.type === SearchType.Nodes) {

            return searchBrief.nodeResults.selectedIndex > -1;
        }
        else if (searchBrief.type === SearchType.Trees) {

            return searchBrief.treeResults.selectedIndex > -1;
        }
        else if (searchBrief.type === SearchType.Subtrees) {

            return searchBrief.subtreeResults.selectedIndex > -1;
        }

        throw new Error(`The SearchType has not been built yet.`)

    }
};

export default searchSelectors;