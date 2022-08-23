import IWayPoint from "../../interfaces/state/tree/IWayPoint";


export default class WayPoint implements IWayPoint {
    
    public title: string = "";
    public description: string = "";
    public errors: Array<string> = [];
}

