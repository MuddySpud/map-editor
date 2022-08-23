import ISettings from "../../interfaces/state/user/ISettings";
import IFieldMapping from "../../interfaces/state/search/IFieldMapping";
import FieldMappings from "../search/FieldMappings";
import TermMappings from "../search/TermMappings";
import ITermMappings from "../../interfaces/state/search/ITermMappings";
import IFieldMappings from "../../interfaces/state/search/IFieldMappings";
import { FontSize } from "../../interfaces/enums/FontSize";


export default class Settings implements ISettings {

    public key: string = "-1";
    public r: string = "-1";
    public record: boolean = false;
    public highlightLensNodeInBranchUI: boolean = true; // hlntv
    public showAllNotifications: boolean = true;
    public defaultDataBatchSize: number = 50;
    public repeatActionPollingTime: number = 60000;
    public highlightTime: number = 3000;
    public httpSilentReLoadDelay: number = 100;
    public tempShowDialogue: boolean = false;
    public defaultImageSize: number = 1000;


    // Authentication
    public userPath: string = `user`;
    public defaultLogoutPath: string = `logout`;
    public defaultLoginPath: string = `login`;
    public returnUrlStart: string = `returnUrl`;

    // Laptop dev
    private baseUrl: string = `https://localhost:44347`;
    public linkUrl: string = `https://localhost:1237/ed`;
    public identityUrl: string = `https://localhost:44310/`;
    public useVsCode: boolean = true;

    public apiUrl: string = `${this.baseUrl}/api`;
    public bffUrl: string = `${this.baseUrl}/bff`;

    public loadSessionView: boolean = true;
    public fontSize: FontSize = FontSize.Normal;
    public searchTermMappings: ITermMappings = new TermMappings();
    public searchFieldMappings: IFieldMappings = new FieldMappings();

    public subtreeSearchMappings: Array<IFieldMapping> = [
        this.searchFieldMappings.all,
        this.searchFieldMappings.name,
        this.searchFieldMappings.description,
        this.searchFieldMappings.tags,
        this.searchFieldMappings.owner,
        this.searchFieldMappings.treeToken
    ];

    public treeSearchMappings: Array<IFieldMapping> = [
        this.searchFieldMappings.all,
        this.searchFieldMappings.name,
        this.searchFieldMappings.description,
        this.searchFieldMappings.tags,
        this.searchFieldMappings.owner,
        this.searchFieldMappings.treeToken,
        this.searchFieldMappings.isPublished,
        this.searchFieldMappings.isSubtree,
        this.searchFieldMappings.isFlat,
        this.searchFieldMappings.isLoop
    ];

    public nodeSearchMappings: Array<IFieldMapping> = [
        this.searchFieldMappings.all,
        this.searchFieldMappings.discussion,
        this.searchFieldMappings.option,
        this.searchFieldMappings.treeToken, // Need to derive this from a tree search...
        this.searchFieldMappings.isEntry,
        this.searchFieldMappings.isStash,
        this.searchFieldMappings.isSocket,
        this.searchFieldMappings.isPlug,
        this.searchFieldMappings.isRoot,
        this.searchFieldMappings.isLink,
        this.searchFieldMappings.isSolution,
        this.searchFieldMappings.order
    ];
}
