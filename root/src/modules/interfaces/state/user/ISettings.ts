import IFieldMapping from "../search/IFieldMapping";
import ITermMappings from "../search/ITermMappings";
import IFieldMappings from "../search/IFieldMappings";
import { FontSize } from "../../enums/FontSize";


export default interface ISettings {
    
    key: string;
    r: string;
    record: boolean;
    highlightLensNodeInBranchUI: boolean;
    showAllNotifications: boolean;
    defaultDataBatchSize: number;
    repeatActionPollingTime: number;
    highlightTime: number;
    httpSilentReLoadDelay: number;
    tempShowDialogue: boolean;
    defaultImageSize: number;

    useVsCode: boolean;

    userPath: string;
    defaultLogoutPath: string;
    defaultLoginPath: string;
    returnUrlStart: string;

    apiUrl: string;
    bffUrl: string;
    identityUrl: string;
    linkUrl: string;
    loadSessionView: boolean;
    fontSize: FontSize;
    searchTermMappings: ITermMappings;
    searchFieldMappings: IFieldMappings;
    
    subtreeSearchMappings: Array<IFieldMapping>;
    treeSearchMappings: Array<IFieldMapping>;
    nodeSearchMappings: Array<IFieldMapping>;
}