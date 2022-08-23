import IBookmarkNavigationUI from "../ui/UIs/IBookmarkNavigationUI";
import INodeBase from "./INodeBase";


export default interface IBookmarkNavigation {

    key: string;

    node: INodeBase | null;
    errors: Array<string>;
    ui: IBookmarkNavigationUI;
}
