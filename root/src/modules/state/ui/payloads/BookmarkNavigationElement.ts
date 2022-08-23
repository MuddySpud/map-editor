import IBookmarkNavigation from "../../../interfaces/state/tree/IBookmarkNavigation";
import IBookmarkNavigationElement from "../../../interfaces/state/ui/payloads/IBookmarkNavigationElement";


export default class BookmarkNavigationElement implements IBookmarkNavigationElement {

    constructor(
        bookmarkNavigation: IBookmarkNavigation,
        element: HTMLElement) {

        this.bookmarkNavigation = bookmarkNavigation;
        this.element = element;
    }

    public bookmarkNavigation: IBookmarkNavigation;
    public element: HTMLElement;
}
