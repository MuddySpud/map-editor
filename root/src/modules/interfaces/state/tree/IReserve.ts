import IBookmarkNavigation from "./IBookmarkNavigation";
import IWayPoint from "./IWayPoint";


export default interface IReserve {

    wayPoint: IWayPoint | null;
    bookmarkNavigation: IBookmarkNavigation | null;
}
