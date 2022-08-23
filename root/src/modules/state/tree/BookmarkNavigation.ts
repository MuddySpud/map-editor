import INodeBase from "../../interfaces/state/tree/INodeBase";
import IBookmarkNavigation from "../../interfaces/state/tree/IBookmarkNavigation";
import IBookmarkNavigationUI from "../../interfaces/state/ui/UIs/IBookmarkNavigationUI";
import BookmarkNavigationUI from "../ui/UIs/BookmarkNavigationUI";


export default class BookmarkNavigation implements IBookmarkNavigation {

    public key: string = "";

    public node: INodeBase | null = null;
    public errors: Array<string> = [];
    public ui: IBookmarkNavigationUI = new BookmarkNavigationUI();
}
