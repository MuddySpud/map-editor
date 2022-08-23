import ISearchCase from "../../Search/ISearchCase";
import INodeBase from "../../tree/INodeBase";
import IDiscussionJson from "../IDiscussionJson";
import IOptionJson from "../IOptionJson";


export default interface ILensUI {
    
    dragOptionSource: HTMLDivElement|null;
    draggedDivFocus: HTMLDivElement|null;
    draggedOverOrder: number|null;
    subtreeSearch: ISearchCase;
    startingPoint: INodeBase | null;
    scrollTop: number;
    htmlID: string | null;
    showSockets: boolean;
    forceSetTree: boolean;
    forceSetSubtree: boolean;
    forceSetSearch: boolean;
    forceSetSelect: boolean;
    forceSetLinks: boolean;
    showDiscussionPlugins: boolean;
    showBlankInputs: boolean;
    showOptionButtons: boolean;
    holdOptionButtons: boolean;
    raw: boolean;
    discussionJson: IDiscussionJson | null;
    optionJson: IOptionJson | null;
    ghostDiscussionJson: IDiscussionJson | null;
    ghostOptionJson: IOptionJson | null;
}
