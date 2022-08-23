import IBookmarkNavigation from "../../interfaces/state/tree/IBookmarkNavigation";
import IReserve from "../../interfaces/state/tree/IReserve";
import IWayPoint from "../../interfaces/state/tree/IWayPoint";


export default class Reserve implements IReserve {

    public wayPoint: IWayPoint | null = null;
    public bookmarkNavigation: IBookmarkNavigation | null = null;
}

