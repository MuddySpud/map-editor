import ILensUI from "../../../interfaces/state/ui/UIs/ILensUI";
import ISearchCase from "../../../interfaces/state/Search/ISearchCase";
import SearchCase from "../../search/SearchCase";
import INodeBase from "../../../interfaces/state/tree/INodeBase";
import IDiscussionJson from "../../../interfaces/state/ui/IDiscussionJson";
import IOptionJson from "../../../interfaces/state/ui/IOptionJson";


export default class LensUI implements ILensUI {
    
    public dragOptionSource: HTMLDivElement|null = null;
    public draggedDivFocus: HTMLDivElement|null = null;
    public draggedOverOrder: number|null = null;
    public subtreeSearch: ISearchCase = new SearchCase();
    public startingPoint: INodeBase | null = null;
    public scrollTop: number = 0;
    public htmlID: string | null = null;
    public showSockets: boolean = false;
    public forceSetTree: boolean = false;
    public forceSetSearch: boolean = false;
    public forceSetSubtree: boolean = false;
    public forceSetSelect: boolean = false;
    public forceSetLinks: boolean = false;
    public showDiscussionPlugins: boolean = false;
    public showBlankInputs: boolean = false;
    public showOptionButtons: boolean = false;
    public holdOptionButtons: boolean = false;
    public raw: boolean = false;
    public discussionJson: IDiscussionJson | null = null;
    public optionJson: IOptionJson | null = null;
    public ghostDiscussionJson: IDiscussionJson | null = null;
    public ghostOptionJson: IOptionJson | null = null;
}
