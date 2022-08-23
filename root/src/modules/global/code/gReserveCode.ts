import IReserve from "../../interfaces/state/tree/IReserve";
import Reserve from "../../state/tree/Reserve";
import WayPoint from "../../state/tree/WayPoint";


const gReserveCode = {

    convertToReserve: (rawReserve: any): IReserve => {

        const reserve: IReserve = new Reserve();

        if (rawReserve?.wayPoint) {

            reserve.wayPoint = new WayPoint();
            reserve.wayPoint.title = rawReserve.wayPoint.title;
            reserve.wayPoint.description = rawReserve.wayPoint.description;
        }

        return reserve;
    }
};

export default gReserveCode;

