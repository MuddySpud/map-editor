import IViewSettings from "../../interfaces/state/user/IViewSettings";
import IUserView from "../../interfaces/state/user/IUserView";
import UserView from "./UserView";


export default class ViewSettings implements IViewSettings {

    public live: IUserView = new UserView(
        `live`
    );

    public views: Array<IUserView> = [];
}
